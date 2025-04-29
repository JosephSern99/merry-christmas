package com.trackr.domain;

import io.quarkus.runtime.annotations.RegisterForReflection;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import jakarta.validation.constraints.NotNull;
import org.bson.codecs.pojo.annotations.BsonId;

import java.io.Serializable;
import java.time.Instant;

import org.bson.types.ObjectId;

/**
 * A Employee.
 */
@MongoEntity(collection="employee")
@RegisterForReflection
public class Employee extends PanacheMongoEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @BsonId
    public ObjectId id;

    @NotNull
    public String fullName;

    public Instant sinceDate;

    public String positionName;

    public String departmentName;

    public String reportsToName;

    @NotNull
    public Boolean isAssignable;

    @NotNull
    public Boolean isAssigned;

    public String department;

    public String position;

    @NotNull
    public String user;

    public String reportsTo;

    @NotNull
    public String organisation;

    public Number annualLeaveAmount;

    public String employeeId;

    public String serialNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", employeeId='"+ employeeId + '\''+
                ",serialNumber='"+ serialNumber+'\''+
                ", fullName='" + fullName + '\'' +
                ", sinceDate=" + sinceDate +
                ", positionName='" + positionName + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", reportsToName='" + reportsToName + '\'' +
                ", isAssignable=" + isAssignable +
                ", isAssigned=" + isAssigned +
                ", department='" + department + '\'' +
                ", position='" + position + '\'' +
                ", user='" + user + '\'' +
                ", reportsTo='" + reportsTo + '\'' +
                ", organisation='" + organisation + '\'' +
                ", annualLeaveAmount='" + annualLeaveAmount + '\'' +
                '}';
    }
}
