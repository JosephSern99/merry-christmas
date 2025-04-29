package com.trackr.repository;

import com.trackr.domain.Employee;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class EmployeeRepository implements PanacheMongoRepository<Employee> {
    public Optional<Employee> findOneByUserId(String userId) {
        return find("user = ?1", userId).firstResultOptional();
    }
}
