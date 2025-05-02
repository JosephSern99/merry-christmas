package com.trackr.repository;

import com.trackr.domain.ChatAttachment;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;

@ApplicationScoped
    public class ChatAttachmentRepository implements PanacheMongoRepository<ChatAttachment> {
    public ChatAttachment findById(String attachmentId) {
        return find("_id", new ObjectId(attachmentId)).firstResult();
    }
}
