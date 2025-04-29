package com.trackr.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.validation.constraints.NotNull;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@MongoEntity(collection="chat_conversation")
@RegisterForReflection
public class ChatConversation extends PanacheMongoEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @BsonId
    public ObjectId id;

    @NotNull
    public String user1Id;

    @NotNull
    public String user2Id;

    @NotNull
    public Instant lastMessageTimestamp;

    @NotNull
    public String organisationId;

    public static ChatConversation findOrCreateConversation(String user1Id, String user2Id, String orgId) {
        // Try to find existing conversation
        ChatConversation conversation = find("(user1Id = ?1 and user2Id = ?2) or (user1Id = ?2 and user2Id = ?1)",
                user1Id, user2Id).firstResult();

        // Create new conversation if not exists
        if (conversation == null) {
            conversation = new ChatConversation();
            conversation.user1Id = user1Id;
            conversation.user2Id = user2Id;
            conversation.lastMessageTimestamp = Instant.now();
            conversation.organisationId = orgId;
            conversation.persist();
        }

        return conversation;
    }

    public static void updateLastMessageTime(String user1Id, String user2Id) {
        ChatConversation conversation = find("(user1Id = ?1 and user2Id = ?2) or (user1Id = ?2 and user2Id = ?1)",
                user1Id, user2Id).firstResult();

        if (conversation != null) {
            conversation.lastMessageTimestamp = Instant.now();
            conversation.update();
        }
    }

    public static List<ChatConversation> findAllForUser(String userId, String orgId) {
        return list("(user1Id = ?1 or user2Id = ?1) and organisationId = ?2 order by lastMessageTimestamp desc",
                userId, orgId);
    }
}
