package com.trackr.domain;

import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "attachment")
@RegisterForReflection
public class Attachment extends PanacheMongoEntityBase {
    @BsonId
    public ObjectId id;
    public String fileName;
    public String fileExtension;
    public String contentType;
    public String base64;

    public static Attachment findById(ObjectId attachmentId) {
        return find("id", attachmentId).firstResult();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attachment)) {
            return false;
        }
        return id != null && id.equals(((Attachment) o).id);
    }


    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return (
                "Attachment{" +
                        "id=" +
                        id +
                        ", fileName='" +
                        fileName +
                        "'" +
                        ", fileExtension='" +
                        fileExtension +
                        "'" +
                        ", contentType='" +
                        contentType +
                        "'" +
                        ", base64='" +
                        base64 +
                        "'" +
                        "}"
        );
    }

}
