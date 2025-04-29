package com.trackr.repository;

import com.trackr.domain.User;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import io.quarkus.mongodb.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;


@SuppressWarnings("unused")
@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<User> {

    private static final Logger log = LoggerFactory.getLogger(UserRepository.class);

    public PanacheQuery<User> findAllByIdIn(List<String> userIds, Page page) {
        List<ObjectId> objectIds = userIds.stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        return find("_id in ?1", objectIds).page(page);
    }
}
