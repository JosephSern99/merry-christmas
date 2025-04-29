package com.trackr.service.dto.chat;

import java.time.Instant;

public class ChatAttachmentDTO {
    private String id;
    private String fileName;
    private String fileExtension;
    private String contentType;
    private String base64; // For transmitting file data in requests
    private String url; // For transmitting file data in responses
    private String senderId; // ID of the user who sent the attachment
    private String recipientId; // ID of the user who received the attachment
    private String organisationId; // ID of the organisation associated with the attachment
    private Instant timestamp;
    public ChatAttachmentDTO() {
    }


    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileExtension() { return fileExtension; }
    public void setFileExtension(String fileExtension) { this.fileExtension = fileExtension; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getBase64() { return base64; }
    public void setBase64(String base64) { this.base64 = base64; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    public String getRecipientId() { return recipientId; }
    public void setRecipientId(String recipientId) { this.recipientId = recipientId; }

    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ChatAttachmentDTO{" +
                "id='" + id + '\'' +
                ", fileName='" + fileName + '\'' +
                ", fileExtension='" + fileExtension + '\'' +
                ", contentType='" + contentType + '\'' +
                ", base64='" + (base64 != null ? "[BASE64_DATA]" : "null") + '\'' +
                ", senderId='" + senderId + '\'' +
                ", recipientId='" + recipientId + '\'' +
                ", organisationId='" + organisationId + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
