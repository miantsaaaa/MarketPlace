package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.admin.UpdateRolesRequest;
import com.freelaka.marketplacebackend.dto.admin.UpdateStatusRequest;
import com.freelaka.marketplacebackend.dto.auth.UserResponse;
import com.freelaka.marketplacebackend.model.User;
import com.freelaka.marketplacebackend.service.AdminUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> listUsers() {
        return ResponseEntity.ok(adminUserService.listUsers());
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<UserResponse> updateRoles(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRolesRequest request,
            @AuthenticationPrincipal User actingAdmin
    ) {
        return ResponseEntity.ok(adminUserService.updateRoles(id, request.getRoles(), actingAdmin));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<UserResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request,
            @AuthenticationPrincipal User actingAdmin
    ) {
        return ResponseEntity.ok(adminUserService.updateStatus(id, request.getStatus(), actingAdmin));
    }
}
