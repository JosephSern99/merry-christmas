package com.trackr.service;

import com.mongodb.client.MongoClient;
import com.trackr.domain.*;
import com.trackr.repository.ChatAttachmentRepository;
import com.trackr.service.dto.*;
import com.trackr.service.dto.chat.ChatAttachmentDTO;
import com.trackr.service.dto.chat.ChatConversationDTO;
import com.trackr.service.dto.chat.ChatMessageDTO;
import com.trackr.service.mapper.*;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
import org.bson.types.ObjectId;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ChatService {
    @Inject
    EmployeeService employeeService;

    @Inject
    ChatMessageMapper chatMessageMapper;

    @Inject
    ChatAttachmentMapper attachmentMapper;


    // Check if users are in the same organization
    public boolean areUsersInSameOrganization(String user1Id, String user2Id) {
        Optional<Employee> employee1 = employeeService.findByUserId(user1Id);
        Optional<Employee> employee2 = employeeService.findByUserId(user2Id);

        if (employee1.isPresent() && employee2.isPresent()) {
            return !employee1.get().organisation.equals(employee2.get().organisation);
        }

        return true;
    }

    // Get organization ID for a user
    public Optional<String> getUserOrganizationId(String userId) {
        Optional<Employee> employee = employeeService.findByUserId(userId);
        return employee.map(e -> e.organisation);
    }

    // Save a new message
    public ChatMessageDTO saveMessage(ChatMessageDTO messageDTO) {
        // Set timestamp if not present
        if (messageDTO.getTimestamp() == null) {
            messageDTO.setTimestamp(Instant.now());
        }

        // Get organization ID
        Optional<String> orgId = getUserOrganizationId(messageDTO.getSenderId());
        if (orgId.isEmpty()) {
            throw new IllegalArgumentException("Sender not found in any organization");
        }

        // Create and save message entity
        ChatMessage message = chatMessageMapper.toEntity(messageDTO);
        message.organisationId = orgId.get();

        // Handle attachments if present
        if (messageDTO.getAttachments() != null && !messageDTO.getAttachments().isEmpty()) {
            message.attachments = new ArrayList<>();

            for (ChatAttachmentDTO attachmentDTO : messageDTO.getAttachments()) {
                ChatAttachment attachment = attachmentMapper.toEntity(attachmentDTO);
                attachment.persist();
                message.attachments.add(attachment.id);
            }
        }

        message.persist();

        // Update conversation last message time
        ChatConversation.updateLastMessageTime(messageDTO.getSenderId(), messageDTO.getRecipientId());

        return chatMessageMapper.toDto(message);
    }

    // Edit a message
    public ChatMessageDTO editMessage(String messageId, String userId, String newContent) {
        ChatMessage message = ChatMessage.findById(new ObjectId(messageId));

        if (message == null) {
            throw new IllegalArgumentException("Message not found");
        }

        // Verify sender is editing their own message
        if (!message.senderId.equals(userId)) {
            throw new IllegalArgumentException("Cannot edit another user's message");
        }

        message.content = newContent;
        message.editedAt = Instant.now();
        message.isEdited = true;
        message.update();

        return chatMessageMapper.toDto(message);
    }

    // Mark messages as read
    public void markMessagesAsRead(String recipientId, String senderId) {
        ChatMessage.update("read = true where recipientId = ?1 and senderId = ?2 and read = false",
                recipientId, senderId);
    }

    // Get chat history between two users
    public List<ChatMessageDTO> getChatHistory(String user1Id, String user2Id, int page, int limit) {
        List<ChatMessage> messages = ChatMessage.findChatBetweenUsers(user1Id, user2Id, limit, page);
        return chatMessageMapper.toDtoList(messages);
    }

    // Get conversations list (using MongoDB aggregation)
    public List<ChatConversationDTO> getConversations(String userId) {
        Optional<String> orgIdOpt = getUserOrganizationId(userId);
        if (orgIdOpt.isEmpty()) {
            return new ArrayList<>();
        }
        String orgId = orgIdOpt.get();

        // Get all conversations for this user
        List<ChatConversation> conversations = ChatConversation.findAllForUser(userId, orgId);
        List<ChatConversationDTO> result = new ArrayList<>();

        for (ChatConversation conv : conversations) {
            ChatConversationDTO dto = new ChatConversationDTO();
            dto.setId(conv.id.toString());

            // Determine the other user ID
            String otherUserId;
            if (conv.user1Id.equals(userId)) {
                otherUserId = conv.user2Id;
            } else {
                otherUserId = conv.user1Id;
            }
            dto.setOtherUserId(otherUserId);

            // Get other user's name
            Optional<Employee> otherEmployee = employeeService.findByUserId(otherUserId);
            otherEmployee.ifPresent(employee -> dto.setOtherUserName(employee.fullName));

            // Get the last message
            ChatMessage lastMessage = ChatMessage.find(
                            "(senderId = ?1 and recipientId = ?2) or (senderId = ?2 and recipientId = ?1) order by timestamp desc",
                            userId, otherUserId)
                    .firstResult();

            if (lastMessage != null) {
                dto.setLastMessage(lastMessage.content);
                dto.setLastMessageTime(lastMessage.timestamp);

                // Count unread messages
                long unreadCount = ChatMessage.countUnreadMessagesFromSender(userId, otherUserId);
                dto.setUnreadCount(unreadCount);
                dto.setHasUnreadMessages(unreadCount > 0);
            } else {
                dto.setLastMessage("");
                dto.setLastMessageTime(conv.lastMessageTimestamp);
                dto.setHasUnreadMessages(false);
                dto.setUnreadCount(0L);
            }

            result.add(dto);
        }

        // Sort by last message time (newest first)
        result.sort((c1, c2) -> c2.getLastMessageTime().compareTo(c1.getLastMessageTime()));

        return result;
    }

    // Get attachment by ID
    public ChatAttachmentDTO getAttachment(String attachmentId, boolean includeData) {
        try {
            // Find the attachment in your database
            // This is a placeholder - implement your actual database access logic
            ChatAttachment attachment = ChatAttachment.findById(attachmentId);
            // Create DTO with basic metadata
            ChatAttachmentDTO dto = new ChatAttachmentDTO();
            dto.setId(String.valueOf(attachment.getId()));
            dto.setFileName(attachment.getFileName());
            dto.setFileExtension(attachment.getFileExtension());
            dto.setContentType(attachment.getContentType());
            dto.setSenderId(attachment.getSenderId());
            dto.setRecipientId(attachment.getRecipientId());
            dto.setOrganisationId(attachment.getOrganisationId());
            dto.setTimestamp(attachment.getTimestamp());

            // Add the base64 content if requested
            if (includeData) {
                dto.setBase64(attachment.getBase64());
            }

            return dto;
        } catch (NotFoundException e) {
            Log.error("Attachment not found: {}", e);
            return null;
        } catch (Exception e) {
            Log.error("Error retrieving attachment: {}", e.getMessage(), e);
            throw e;
        }
    }

    // Save attachment and return its ID
    public String saveAttachment(ChatAttachmentDTO attachmentDTO) {
        if (attachmentDTO == null) {
            throw new IllegalArgumentException("Attachment data is null");
        }

        // Validate essential fields
        if (attachmentDTO.getBase64() == null || attachmentDTO.getBase64().isEmpty()) {
            throw new IllegalArgumentException("Attachment base64 data is missing");
        }

        if (attachmentDTO.getFileName() == null || attachmentDTO.getFileName().isEmpty()) {
            throw new IllegalArgumentException("Attachment file name is missing");
        }

        try {
            // Map DTO to entity
            ChatAttachment attachment = attachmentMapper.toEntity(attachmentDTO);

            // Ensure file extension is set if not provided
            if (attachment.fileExtension == null || attachment.fileExtension.isEmpty()) {
                String fileName = attachment.fileName;
                int lastDotIndex = fileName.lastIndexOf('.');

                if (lastDotIndex > 0 && lastDotIndex < fileName.length() - 1) {
                    attachment.fileExtension = fileName.substring(lastDotIndex + 1);
                }
            }

            // Ensure content type is set if not provided
            if (attachment.contentType == null || attachment.contentType.isEmpty()) {
                // Set a default content type based on extension
                attachment.contentType = determineContentType(attachment.fileExtension);
            }

            // Save to database
            attachment.persist();

            ChatMessage message = new ChatMessage();
            message.attachments = new ArrayList<>();
            message.attachments.add(attachment.id);
            message.senderId = attachmentDTO.getSenderId();
            message.organisationId = attachmentDTO.getOrganisationId();
            message.recipientId = attachmentDTO.getRecipientId();
            message.timestamp = Instant.now();
            message.persist();

            return attachment.id.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to save attachment: " + e.getMessage(), e);
        }
    }

    private String determineContentType(String fileExtension) {
        if (fileExtension == null || fileExtension.isEmpty()) {
            return "application/octet-stream";
        }

        String ext = fileExtension.toLowerCase();

        switch (ext) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "pdf":
                return "application/pdf";
            case "doc":
                return "application/msword";
            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case "xls":
                return "application/vnd.ms-excel";
            case "xlsx":
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case "txt":
                return "text/plain";
            case "mp3":
                return "audio/mpeg";
            case "mp4":
                return "video/mp4";
            default:
                return "application/octet-stream";
        }
    }

    public ChatConversationDTO createConversation(String userId, String otherUserId) {
        // Get organization ID
        Optional<String> orgId = getUserOrganizationId(userId);
        if (orgId.isEmpty()) {
            throw new IllegalArgumentException("User not found in any organization");
        }

        // Create or get the conversation
        ChatConversation conversation = ChatConversation.findOrCreateConversation(userId, otherUserId, orgId.get());

        // Convert to DTO
        ChatConversationDTO dto = new ChatConversationDTO();
        dto.setId(conversation.id.toString());

        // Determine the other user ID (should be otherUserId in this case)
        dto.setOtherUserId(otherUserId);

        // Get other user's name
        Optional<Employee> otherEmployee = employeeService.findByUserId(otherUserId);
        otherEmployee.ifPresent(employee -> dto.setOtherUserName(employee.fullName));

        // Initialize other fields
        dto.setLastMessage("");
        dto.setLastMessageTime(conversation.lastMessageTimestamp);
        dto.setHasUnreadMessages(false);
        dto.setUnreadCount(0L);

        return dto;
    }

    public List<UserDTO> getUsersInSameOrganization(String userId) {
        // Get user's organization
        Optional<String> orgId = getUserOrganizationId(userId);
        if (orgId.isEmpty()) {
            return new ArrayList<>();
        }

        // Find all employees in the same organization
        List<Employee> employees = Employee.list("organisation = ?1 and user != ?2",
                orgId.get(), userId);

        // Convert to UserDTOs with minimal information
        return employees.stream()
                .map(emp -> {
                    UserDTO dto = new UserDTO();
                    Optional<User> user = User.findByIdOptional(new ObjectId(emp.user));
                    user.ifPresent(u -> {
                        dto.id = new ObjectId(u.id.toString());
                        dto.login = u.login;
                        dto.firstName = u.firstName;
                        dto.lastName = u.lastName;
                        dto.email = u.email;
                        dto.imageUrl = u.imageUrl;
                    });
                    return dto;
                })
                .filter(dto -> dto.id != null) // Filter out any that couldn't be mapped
                .collect(Collectors.toList());
    }
}
