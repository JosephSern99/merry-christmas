package com.trackr.domain;

import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.validation.constraints.NotNull;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
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

    public List<ObjectId> attachments = new ArrayList<>();

    // For querying
    public static List<ChatMessage> findChatBetweenUsers(String user1Id, String user2Id, int limit, int page) {
        return find("(senderId = ?1 and recipientId = ?2) or (senderId = ?2 and recipientId = ?1) sort by timestamp",
                user1Id, user2Id)
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
