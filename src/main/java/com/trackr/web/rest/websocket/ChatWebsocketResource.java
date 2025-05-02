package com.trackr.web.rest.websocket;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.trackr.domain.ChatMessage;
import com.trackr.service.ChatService;
import com.trackr.service.MessageEditRequest;
import com.trackr.service.dto.ReadReceiptRequest;
import com.trackr.service.dto.TypingIndicatorRequest;
import com.trackr.service.dto.WebSocketMessage;
import com.trackr.service.dto.chat.ChatAttachmentDTO;
import com.trackr.service.dto.chat.ChatMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trackr.service.mapper.ChatMessageMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.*;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


import static org.slf4j.LoggerFactory.getLogger;


@ServerEndpoint(value = "/websocket/chat/{userId}", configurator = WebSocketConfig.class)
@ApplicationScoped
public class ChatWebsocketResource {

    private static final Logger LOG = getLogger(ChatWebsocketResource.class);

    @Inject
    ChatService chatService;

    @Inject
    ObjectMapper objectMapper;

    @Inject
    ChatMessageMapper chatMessageMapper;

    private Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        LOG.info("WebSocket opened for user: " + userId + ", Session ID: " + session.getId());
        sessions.put(userId, session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("userId") String userId) {
        LOG.info("WebSocket closed for user: " + userId + ", Session ID: " + session.getId());
        sessions.remove(userId);
    }

    @OnError
    public void onError(Session session, @PathParam("userId") String userId, Throwable throwable) {
        LOG.error("WebSocket error for user: " + userId + ", Session ID: " + session.getId(), throwable);
        sessions.remove(userId);
    }

    @OnMessage
    public void onMessage(String payload, @PathParam("userId") String userId) {
        LOG.info("Received message from user: " + userId);
        // Don't log full payload in production to avoid sensitive data exposure

        try {
            WebSocketMessage wsMessage = objectMapper.readValue(payload, WebSocketMessage.class);

            switch (wsMessage.getType()) {
                case "CHAT_MESSAGE":
                    handleChatMessage(wsMessage.getData(), userId);
                    break;
                case "EDIT_MESSAGE":
                    handleEditMessage(wsMessage.getData(), userId);
                    break;
                case "READ_RECEIPT":
                    handleReadReceipt(wsMessage.getData(), userId);
                    break;
                case "TYPING_INDICATOR":
                    handleTypingIndicator(wsMessage.getData(), userId);
                    break;
                default:
                    LOG.warn("Unknown message type: " + wsMessage.getType());
            }
        } catch (Exception e) {
            LOG.error("Error processing WebSocket message from user: " + userId, e);
            // Send error back to user
            try {
                // Create a safe error message that won't contain control characters
                String errorMsg = e.getMessage();
                if (errorMsg != null) {
                    errorMsg = errorMsg.replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", "");
                } else {
                    errorMsg = "Unknown error";
                }

                WebSocketMessage errorMessage = new WebSocketMessage("ERROR",
                        "{\"message\":\"Error processing message: " + errorMsg + "\"}");

                Session userSession = sessions.get(userId);
                if (userSession != null && userSession.isOpen()) {
                    userSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(errorMessage));
                }
            } catch (Exception ex) {
                LOG.error("Error sending error message", ex);
            }
        }
    }

    public ChatMessageDTO createMessage(String senderId, String recipientId, String content, List<ChatAttachmentDTO> attachments) {
        ChatMessage message = new ChatMessage();
        message.setSenderId(senderId);
        message.setRecipientId(recipientId);

        // Sanitize content to remove any control characters that could break JSON parsing
        content = content != null ? content.replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", "") : "";
        message.setContent(content);

        message.setAttachments(attachments);
        message.setTimestamp(Instant.now());
        message.setRead(false);
        message.setEdited(false);

        message.persist();

        return chatMessageMapper.toDto(message);
    }


    private void handleChatMessage(String messageData, String userId) throws IOException {
        LOG.info("Handling chat message data: " + messageData);

        JsonObject json = JsonParser.parseString(messageData).getAsJsonObject();
        String recipientId = json.get("recipientId").getAsString();

        // Content could be empty if only sending attachments
        String content = json.has("content") && !json.get("content").isJsonNull()
                ? json.get("content").getAsString()
                : "";

        List<ChatAttachmentDTO> attachments = new ArrayList<>();
        if (json.has("attachments") && !json.get("attachments").isJsonNull()) {
            JsonArray attachmentsArray = json.getAsJsonArray("attachments");
            for (JsonElement element : attachmentsArray) {
                ChatAttachmentDTO attachment = objectMapper.readValue(element.toString(), ChatAttachmentDTO.class);
                attachments.add(attachment);
                LOG.info("Added attachment: " + attachment.getId() + ", " + attachment.getFileName());
            }
        }

        // Create and save the message
        ChatMessageDTO messageDTO = new ChatMessageDTO();
        messageDTO.setSenderId(userId); // Ensure sender ID matches the WebSocket user
        messageDTO.setRecipientId(recipientId);
        messageDTO.setContent(content);
        messageDTO.setAttachments(attachments);
        messageDTO.setTimestamp(Instant.now());
        messageDTO.setRead(false);
        messageDTO.setIsEdited(false);

        // Verify users are in the same organization - FIXED: inverted logic
        if (chatService.areUsersInSameOrganization(userId, messageDTO.getRecipientId())) {
            LOG.warn("Users are not in the same organization: " + userId + ", " + recipientId);
            WebSocketMessage errorMsg = new WebSocketMessage("ERROR",
                    "{\"message\":\"Cannot send message to user in different organization\"}");
            Session senderSession = sessions.get(userId);
            if (senderSession != null && senderSession.isOpen()) {
                senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(errorMsg));
            }
            return;
        }

        // Save the message
        ChatMessageDTO savedMessage = chatService.saveMessage(messageDTO);
        LOG.info("Message saved with ID: " + savedMessage.getId());

        // Send to recipient if online
        Session recipientSession = sessions.get(recipientId);
        if (recipientSession != null && recipientSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("CHAT_MESSAGE",
                    objectMapper.writeValueAsString(savedMessage));
            recipientSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
            LOG.info("Message sent to recipient: " + recipientId);
        } else {
            LOG.info("Recipient not online: " + recipientId);
        }

        // Echo back to sender
        Session senderSession = sessions.get(userId);
        if (senderSession != null && senderSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("CHAT_MESSAGE",
                    objectMapper.writeValueAsString(savedMessage));
            senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
            LOG.info("Message confirmation sent to sender: " + userId);
        }
    }

    private void handleEditMessage(String messageData, String userId) throws IOException {
        MessageEditRequest editRequest = objectMapper.readValue(messageData, MessageEditRequest.class);

        try {
            ChatMessageDTO updatedMessage = chatService.editMessage(
                    editRequest.getMessageId(),
                    userId,
                    editRequest.getNewContent()
            );

            // Send update to recipient
            Session recipientSession = sessions.get(updatedMessage.getRecipientId());
            if (recipientSession != null && recipientSession.isOpen()) {
                WebSocketMessage response = new WebSocketMessage("MESSAGE_UPDATED",
                        objectMapper.writeValueAsString(updatedMessage));
                recipientSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
            }

            // Send confirmation to sender
            Session senderSession = sessions.get(userId);
            if (senderSession != null && senderSession.isOpen()) {
                WebSocketMessage response = new WebSocketMessage("MESSAGE_UPDATED",
                        objectMapper.writeValueAsString(updatedMessage));
                senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
            }
        } catch (IllegalArgumentException e) {
            // Send error to sender
            Session senderSession = sessions.get(userId);
            if (senderSession != null && senderSession.isOpen()) {
                WebSocketMessage response = new WebSocketMessage("ERROR",
                        "{\"message\":\"" + e.getMessage() + "\"}");
                senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
            }
        }
    }

    private void handleReadReceipt(String messageData, String userId) throws IOException {
        ReadReceiptRequest readRequest = objectMapper.readValue(messageData, ReadReceiptRequest.class);

        chatService.markMessagesAsRead(userId, readRequest.getSenderId());

        // Notify sender that messages were read
        Session senderSession = sessions.get(readRequest.getSenderId());
        if (senderSession != null && senderSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("READ_RECEIPT",
                    "{\"userId\":\"" + userId + "\"}");
            senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
        }
    }

    private void handleTypingIndicator(String messageData, String userId) throws IOException {
        TypingIndicatorRequest typingRequest = objectMapper.readValue(messageData, TypingIndicatorRequest.class);

        Session recipientSession = sessions.get(typingRequest.getRecipientId());
        if (recipientSession != null && recipientSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("TYPING_INDICATOR",
                    "{\"userId\":\"" + userId + "\", \"isTyping\":" + typingRequest.getIsTyping() + "}");
            recipientSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
        }
    }

//    @PostConstruct
//    public void configureObjectMapper() {
//        // This will be called after dependency injection
//        // Configure the injected ObjectMapper to escape control characters
//        objectMapper.configure(com.fasterxml.jackson.core.JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
//        objectMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
//    }
}