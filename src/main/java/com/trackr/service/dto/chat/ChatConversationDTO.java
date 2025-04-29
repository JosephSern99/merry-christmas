package com.trackr.service.dto.chat;

import java.time.Instant;

public class ChatConversationDTO {
    private String id;
    private String otherUserId; // The ID of the other user in the conversation
    private String otherUserName; // Name of the other user
    private String lastMessage; // Content of the last message
    private Instant lastMessageTime;
    private Boolean hasUnreadMessages;
    private Long unreadCount;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOtherUserId() { return otherUserId; }
    public void setOtherUserId(String otherUserId) { this.otherUserId = otherUserId; }

    public String getOtherUserName() { return otherUserName; }
    public void setOtherUserName(String otherUserName) { this.otherUserName = otherUserName; }

    public String getLastMessage() { return lastMessage; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }

    public Instant getLastMessageTime() { return lastMessageTime; }
    public void setLastMessageTime(Instant lastMessageTime) { this.lastMessageTime = lastMessageTime; }

    public Boolean getHasUnreadMessages() { return hasUnreadMessages; }
    public void setHasUnreadMessages(Boolean hasUnreadMessages) { this.hasUnreadMessages = hasUnreadMessages; }

    public Long getUnreadCount() { return unreadCount; }
    public void setUnreadCount(Long unreadCount) { this.unreadCount = unreadCount; }
}
