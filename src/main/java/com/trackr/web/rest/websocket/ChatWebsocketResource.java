package com.trackr.web.rest.websocket;

import com.trackr.service.ChatService;
import com.trackr.service.MessageEditRequest;
import com.trackr.service.dto.ReadReceiptRequest;
import com.trackr.service.dto.TypingIndicatorRequest;
import com.trackr.service.dto.WebSocketMessage;
import com.trackr.service.dto.chat.ChatMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.*;

import java.io.IOException;
import java.time.Instant;
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
//        LOG.info("Received message from user: " + userId + ", payload: " + payload);

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
        }
    }

    private void handleChatMessage(String messageData, String userId) throws IOException {
        ChatMessageDTO messageDTO = objectMapper.readValue(messageData, ChatMessageDTO.class);
        messageDTO.setSenderId(userId); // Ensure sender ID matches the WebSocket user

        // Verify users are in the same organization
        if (chatService.areUsersInSameOrganization(userId, messageDTO.getRecipientId())) {
            return;
        }

        // Set timestamp if not present
        if (messageDTO.getTimestamp() == null) {
            messageDTO.setTimestamp(Instant.now());
        }

        // Save the message
        ChatMessageDTO savedMessage = chatService.saveMessage(messageDTO);

        // Send to recipient if online
        Session recipientSession = sessions.get(messageDTO.getRecipientId());
        if (recipientSession != null && recipientSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("CHAT_MESSAGE",
                objectMapper.writeValueAsString(savedMessage));
            recipientSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
        }

        // Echo back to sender
        Session senderSession = sessions.get(userId);
        if (senderSession != null && senderSession.isOpen()) {
            WebSocketMessage response = new WebSocketMessage("CHAT_MESSAGE",
                objectMapper.writeValueAsString(savedMessage));
            senderSession.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
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
}