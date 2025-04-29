package com.trackr.service.dto;

public class TypingIndicatorRequest {
    private String recipientId;
    private Boolean isTyping;

    public String getRecipientId() { return recipientId; }
    public void setRecipientId(String recipientId) { this.recipientId = recipientId; }

    public Boolean getIsTyping() { return isTyping; }
    public void setIsTyping(Boolean isTyping) { this.isTyping = isTyping; }
}