package com.trackr.service;

import com.trackr.domain.Employee;
import com.trackr.repository.EmployeeRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;

import java.util.Optional;
@ApplicationScoped
public class EmployeeService {
    private final Logger log = org.slf4j.LoggerFactory.getLogger(EmployeeService.class);

    @Inject
    EmployeeRepository employeeRepository;

    public Optional<Employee> findByUserId(String user1Id) {
        log.debug("Request to find employee by userId: {}", user1Id);
        return employeeRepository.findOneByUserId(user1Id);
    }
}
