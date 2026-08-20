package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.auth.UserResponse;
import com.freelaka.marketplacebackend.dto.user.UpdateUserRequest;
import com.freelaka.marketplacebackend.model.Role;
import com.freelaka.marketplacebackend.model.User;
import com.freelaka.marketplacebackend.repository.RoleRepository;
import com.freelaka.marketplacebackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Locale;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public UserResponse updateProfile(
            User user,
            UpdateUserRequest request
    ) {
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());

        user.setPhone(
                request.getPhone() == null || request.getPhone().isBlank()
                        ? null
                        : request.getPhone().trim()
        );

        user.setUpdatedAt(OffsetDateTime.now());

        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }

    @Transactional
    public UserResponse activateSeller(User user) {
        return activateRole(user, "SELLER");
    }

    @Transactional
    public UserResponse activateDelivery(User user) {
        return activateRole(user, "DELIVERY");
    }

    private UserResponse activateRole(User user, String roleCode) {

        boolean alreadyActive = user.getRoles()
                .stream()
                .anyMatch(role -> roleCode.equals(role.getCode()));

        if (alreadyActive) {
            throw new IllegalStateException(
                    "Le rôle " + roleCode + " est déjà actif."
            );
        }

        Role role = roleRepository.findByCode(roleCode)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Le rôle demandé est indisponible."
                        ));

        user.getRoles().add(role);
        user.setUpdatedAt(OffsetDateTime.now());

        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }
}