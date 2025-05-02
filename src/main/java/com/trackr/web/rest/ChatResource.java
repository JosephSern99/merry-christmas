package com.trackr.web.rest;

import com.trackr.service.ChatService;
import com.trackr.service.dto.UserDTO;
import com.trackr.service.dto.chat.ChatAttachmentDTO;
import com.trackr.service.dto.chat.ChatConversationDTO;
import com.trackr.service.dto.chat.ChatMessageDTO;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.util.List;

@Path("/api/chat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class ChatResource {

    private static final Logger LOG = Logger.getLogger(ChatResource.class);
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(ChatResource.class);

    @Inject
    ChatService chatService;

    @POST
    @Path("/conversations")
    public Response createConversation(@QueryParam("userId") String userId, @QueryParam("otherUserId") String otherUserId) {
        // Validate users are in the same organization
        if (chatService.areUsersInSameOrganization(userId, otherUserId)) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Users are not in the same organization\"}")
                    .build();
        }

        try {
            ChatConversationDTO conversation = chatService.createConversation(userId, otherUserId);
            return Response.status(Response.Status.CREATED).entity(conversation).build();
        } catch (Exception e) {
            LOG.error("Error creating conversation", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to create conversation\"}")
                    .build();
        }
    }

    @GET
    @Path("/users/organization")
    public Response getUsersInSameOrganization(@QueryParam("userId") String userId) {
        try {
            List<UserDTO> users = chatService.getUsersInSameOrganization(userId);
            return Response.ok(users).build();
        } catch (Exception e) {
            LOG.error("Error getting users in same organization", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to get users\"}")
                    .build();
        }
    }

    @GET
    @Path("/conversations")
    public Response getConversations(@QueryParam("userId") String userId) {
        List<ChatConversationDTO> conversations = chatService.getConversations(userId);
        return Response.ok(conversations).build();
    }

    @GET
    @Path("/history/{otherUserId}")
    @PermitAll
    public Response getChatHistory(
            @PathParam("otherUserId") String otherUserId,
            @QueryParam("userId") String userId,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size) {

        // Validate users are in the same organization
        if (chatService.areUsersInSameOrganization(userId, otherUserId)) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Users are not in the same organization\"}")
                    .build();
        }

        List<ChatMessageDTO> messages = chatService.getChatHistory(userId, otherUserId, page, size);

        // Mark messages as read
        chatService.markMessagesAsRead(userId, otherUserId);

        return Response.ok(messages).build();
    }

    @POST
    @Path("/messages")
    public Response createMessage(ChatMessageDTO messageDTO) {
        // Validate sender and recipient are in the same organization
        if (chatService.areUsersInSameOrganization(messageDTO.getSenderId(), messageDTO.getRecipientId())) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Users are not in the same organization\"}")
                    .build();
        }

        try {
            // Set timestamp if not present
            if (messageDTO.getTimestamp() == null) {
                messageDTO.setTimestamp(Instant.now());
            }

            ChatMessageDTO result = chatService.saveMessage(messageDTO);
            return Response.status(Response.Status.CREATED).entity(result).build();
        } catch (Exception e) {
            LOG.error("Error creating message", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to create message\"}")
                    .build();
        }
    }

    @PUT
    @Path("/messages/{id}")
    public Response updateMessage(
            @PathParam("id") String id,
            @QueryParam("userId") String userId,
            ChatMessageDTO messageDTO) {

        try {
            ChatMessageDTO result = chatService.editMessage(id, userId, messageDTO.getContent());
            return Response.ok(result).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        } catch (Exception e) {
            LOG.error("Error updating message", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to update message\"}")
                    .build();
        }
    }

    @PUT
    @Path("/read/{senderId}")
    public Response markAsRead(
            @PathParam("senderId") String senderId,
            @QueryParam("userId") String userId) {

        chatService.markMessagesAsRead(userId, senderId);
        return Response.ok().build();
    }

    @POST
    @Path("/attachments")
    public Response uploadAttachment(ChatAttachmentDTO attachmentDTO) {
        try {
            // Validate attachment data
            if (attachmentDTO.getBase64() == null || attachmentDTO.getBase64().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\":\"Missing attachment data\"}")
                        .build();
            }

            if (attachmentDTO.getFileName() == null || attachmentDTO.getFileName().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\":\"Missing file name\"}")
                        .build();
            }

            if (attachmentDTO.getContentType() == null || attachmentDTO.getContentType().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\":\"Missing content type\"}")
                        .build();
            }

            String attachmentId = chatService.saveAttachment(attachmentDTO);
            return Response.status(Response.Status.CREATED)
                    .entity("{\"id\":\"" + attachmentId + "\"}")
                    .build();
        } catch (Exception e) {
            LOG.error("Error uploading attachment", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to upload attachment: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @GET
    @Path("/attachments/{id}")
    public Response getAttachment(@PathParam("id") String id) {
        try {
            ChatAttachmentDTO attachmentDTO = chatService.getAttachment(id, false);

            if (attachmentDTO == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\":\"Attachment not found\"}")
                        .build();
            }

            return Response.ok(attachmentDTO).build();
        } catch (Exception e) {
            LOG.error("Error retrieving attachment", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to retrieve attachment\"}")
                    .build();
        }
    }

    @GET
    @Path("/attachments/{attachmentId}/data")
    public Response getAttachmentWithData(@PathParam("attachmentId") String attachmentId) {
        try {
            ChatAttachmentDTO attachment = chatService.getAttachment(attachmentId, true);

            log.info("Attachment: {}", attachment);
//
//            if (attachment == null) {
//                return Response.status(Response.Status.NOT_FOUND)
//                        .entity("{\"error\":\"Attachment not found\"}")
//                        .build();
//            }
//
//            // Make sure we're returning the attachment data
//            if (attachment.getBase64() == null || attachment.getBase64().isEmpty()) {
//                return Response.status(Response.Status.NOT_FOUND)
//                        .entity("{\"error\":\"Attachment data not available\"}")
//                        .build();
//            }

            return Response.ok(attachment).build();
        } catch (Exception e) {
            LOG.error("Error retrieving attachment data", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to retrieve attachment data\"}")
                    .build();
        }
    }

    @GET
    @Path("attachments/{id}/metadata")
    public Response getAttachmentMetadata(@PathParam("id") String id) {
        try {
            ChatAttachmentDTO attachment = chatService.getAttachment(id, false);
            if (attachment == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\":\"Attachment not found\"}")
                        .build();
            }
            return Response.ok(attachment).build();
        } catch (Exception e) {
            LOG.error("Error retrieving attachment metadata", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Failed to retrieve attachment metadata\"}")
                    .build();
        }
    }
}
