package com.trackr.service.mapper;

import com.trackr.domain.ChatAttachment;
import com.trackr.service.dto.chat.ChatAttachmentDTO;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ChatAttachmentMapper {
    public ChatAttachmentDTO toDto(ChatAttachment entity) {
        if (entity == null) {
            return null;
        }

        ChatAttachmentDTO dto = new ChatAttachmentDTO();
        dto.setId(entity.id.toString());
        dto.setFileName(entity.fileName);
        dto.setFileExtension(entity.fileExtension);
        dto.setContentType(entity.contentType);
        // Don't include base64 data in responses by default to reduce payload size

        return dto;
    }

    public ChatAttachmentDTO toDtoWithData(ChatAttachment entity) {
        ChatAttachmentDTO dto = toDto(entity);
        if (dto != null && entity != null) {
            dto.setBase64(entity.base64);
        }
        return dto;
    }

    public ChatAttachment toEntity(ChatAttachmentDTO dto) {
        if (dto == null) {
            return null;
        }

        ChatAttachment entity = new ChatAttachment();
        if (dto.getId() != null) {
            entity.id = new org.bson.types.ObjectId(dto.getId());
        }
        entity.fileName = dto.getFileName();
        entity.fileExtension = dto.getFileExtension();
        entity.contentType = dto.getContentType();
        entity.base64 = dto.getBase64();

        return entity;
    }
}
