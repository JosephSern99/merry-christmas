package com.trackr.service.mapper;

import com.trackr.domain.ChatAttachment;
import com.trackr.domain.ChatMessage;
import com.trackr.repository.ChatAttachmentRepository;
import com.trackr.service.dto.chat.ChatAttachmentDTO;
import com.trackr.service.dto.chat.ChatMessageDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ChatMessageMapper {

    private static final Logger log = LoggerFactory.getLogger(ChatMessageMapper.class);
    @Inject
    ChatAttachmentMapper attachmentMapper;

    @Inject
    ChatAttachmentRepository attachmentRepository;

    public ChatMessageDTO toDto(ChatMessage entity) {
        if (entity == null) {
            return null;
        }

        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setId(entity.id.toString());
        dto.setSenderId(entity.senderId);
        dto.setRecipientId(entity.recipientId);
        dto.setContent(entity.content);
        dto.setTimestamp(entity.timestamp);
        dto.setEditedAt(entity.editedAt);
        dto.setIsEdited(entity.isEdited);
        dto.setRead(entity.read);

        List<ChatAttachmentDTO> attachmentDTOs = new ArrayList<>();

        // Populate attachments - need to fetch from database
        if (entity.attachments != null && !entity.attachments.isEmpty()) {
            for (ChatAttachmentDTO attachmentId : entity.attachments) {
                ChatAttachment attachment = attachmentRepository.findById(attachmentId.getId());
                if (attachment != null) {
                    attachmentDTOs.add(attachmentMapper.toDto(attachment));
                }
            }
        }
        dto.setAttachments(attachmentDTOs);

        return dto;
    }



    public ChatMessage toEntity(ChatMessageDTO dto) {
        if (dto == null) {
            return null;
        }

        ChatMessage entity = new ChatMessage();

        if (dto.getId() != null && !dto.getId().isEmpty()) {
            entity.id = new ObjectId(dto.getId());
        }

        entity.senderId = dto.getSenderId();
        entity.recipientId = dto.getRecipientId();
        entity.content = dto.getContent();
        entity.timestamp = dto.getTimestamp();
        entity.editedAt = dto.getEditedAt();
        entity.isEdited = dto.getIsEdited();
        entity.read = dto.getRead();

        // Handle attachments
        if (dto.getAttachments() != null && !dto.getAttachments().isEmpty()) {
            for (ChatAttachmentDTO attachmentDTO : dto.getAttachments()) {
                if (attachmentDTO.getId() != null) {
                    entity.attachments.add(attachmentDTO);
                }
            }
        }

        return entity;
    }

    public List<ChatMessageDTO> toDtoList(List<ChatMessage> entityList) {
        return entityList.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}