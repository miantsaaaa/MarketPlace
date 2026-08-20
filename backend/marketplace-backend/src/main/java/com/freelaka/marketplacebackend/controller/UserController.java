package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.auth.UserResponse;
import com.freelaka.marketplacebackend.dto.user.UpdateUserRequest;
import com.freelaka.marketplacebackend.model.User;
import com.freelaka.marketplacebackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(UserResponse.from(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                userService.updateProfile(user, request)
        );
    }

    @PostMapping("/me/roles/seller")
    public ResponseEntity<UserResponse> activateSeller(
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                userService.activateSeller(user)
        );
    }

    @PostMapping("/me/roles/delivery")
    public ResponseEntity<UserResponse> activateDelivery(
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                userService.activateDelivery(user)
        );
    }
}