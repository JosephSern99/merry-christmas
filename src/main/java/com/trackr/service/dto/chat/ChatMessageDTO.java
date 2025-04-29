package com.trackr.service.dto.chat;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ChatMessageDTO {
    private String id;
    private String senderId;
    private String recipientId;
    private String content;
    private Instant timestamp;
    private Instant editedAt;
    private Boolean isEdited;
    private Boolean read;
    private List<ChatAttachmentDTO> attachments = new ArrayList<>();

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    public String getRecipientId() { return recipientId; }
    public void setRecipientId(String recipientId) { this.recipientId = recipientId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public Instant getEditedAt() { return editedAt; }
    public void setEditedAt(Instant editedAt) { this.editedAt = editedAt; }

    public Boolean getIsEdited() { return isEdited; }
    public void setIsEdited(Boolean isEdited) { this.isEdited = isEdited; }

    public Boolean getRead() { return read; }
    public void setRead(Boolean read) { this.read = read; }

    public List<ChatAttachmentDTO> getAttachments() { return attachments; }
    public void setAttachments(List<ChatAttachmentDTO> attachments) { this.attachments = attachments; }
}
