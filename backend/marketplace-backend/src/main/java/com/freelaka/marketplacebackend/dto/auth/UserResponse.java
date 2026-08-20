package com.freelaka.marketplacebackend.dto.auth;

import com.freelaka.marketplacebackend.model.User;

import java.util.List;

public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String status;
    private List<String> roles;

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String firstName,
            String lastName,
            String email,
            String phone,
            String status,
            List<String> roles
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.roles = roles;
    }

    public static UserResponse from(User user) {
        List<String> roles = user.getRoles()
                .stream()
                .map(role -> role.getCode())
                .sorted()
                .toList();

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getStatus(),
                roles
        );
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public List<String> getRoles() {
        return roles;
    }
}