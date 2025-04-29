package com.trackr.service;

// Message edit request
public class MessageEditRequest {
    private String messageId;
    private String newContent;

    public String getMessageId() { return messageId; }
    public void setMessageId(String messageId) { this.messageId = messageId; }

    public String getNewContent() { return newContent; }
    public void setNewContent(String newContent) { this.newContent = newContent; }
}