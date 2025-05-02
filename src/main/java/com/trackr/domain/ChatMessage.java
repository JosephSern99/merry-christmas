package com.trackr.domain;

import com.trackr.service.dto.chat.ChatAttachmentDTO;
import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.validation.constraints.NotNull;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@MongoEntity(collection = "chat_message")
@RegisterForReflection
public class ChatMessage extends PanacheMongoEntityBase implements Serializable {
    private static final long serialVersionUID = 1L;

    @BsonId
    public ObjectId id;

    @NotNull
    public String senderId;

    @NotNull
    public String recipientId;

    @NotNull
    public String content;

    @NotNull
    public Instant timestamp;

    public Instant editedAt;

    public Boolean isEdited = false;

    public Boolean read = false;

    @NotNull
    public String organisationId;

    // Update this field to store the attachment records as DTOs
    // This will make it handle both scenarios - either embedded DTOs or ObjectIds
    public List<ChatAttachmentDTO> attachments ;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Instant getEditedAt() {
        return editedAt;
    }

    public void setEditedAt(Instant editedAt) {
        this.editedAt = editedAt;
    }

    public Boolean getEdited() {
        return isEdited;
    }

    public void setEdited(Boolean edited) {
        isEdited = edited;
    }

    public String getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
    }

    public List<ChatAttachmentDTO> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<ChatAttachmentDTO> attachments) {
        this.attachments = attachments;
    }

    // For querying
    public static List<ChatMessage> findChatBetweenUsers(String user1Id, String user2Id, int limit, int page) {
//        return find("(senderId = ?1 and recipientId = ?2) or (senderId = ?2 and recipientId = ?1) sort by timestamp",
//                user1Id, user2Id)
//                .page(page, limit)
//                .list();

        return findAll()
                .page(page, limit)
                .list();
    }

    public static long countUnreadMessagesFromSender(String recipientId, String senderId) {
        return count("recipientId = ?1 and senderId = ?2 and read = false",
                recipientId, senderId);
    }
//    public static List<ChatMessage> findUnreadMessagesForUser(String userId) {
//        return list("recipientId = ?1 and read = false", userId);
//    }
//
//    public static long countUnreadMessagesForUser(String userId) {
//        return count("recipientId = ?1 and read = false", userId);
//    }
}
