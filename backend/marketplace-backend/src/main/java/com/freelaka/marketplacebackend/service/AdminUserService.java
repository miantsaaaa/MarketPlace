package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.auth.UserResponse;
import com.freelaka.marketplacebackend.model.Role;
import com.freelaka.marketplacebackend.model.User;
import com.freelaka.marketplacebackend.repository.RoleRepository;
import com.freelaka.marketplacebackend.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AdminUserService {

    private static final String BUYER_CODE = "BUYER";
    private static final Set<String> VALID_STATUSES = Set.of("ACTIVE", "INACTIVE", "SUSPENDED", "BANNED");

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AdminUserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<UserResponse> listUsers() {
        return userRepository.findAll(Sort.by("id")).stream()
                .map(UserResponse::from)
                .toList();
    }

    @Transactional
    public UserResponse updateRoles(Long targetUserId, Set<String> roleCodes, User actingAdmin) {
        ensureIsAdmin(actingAdmin);

        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new AdminUserNotFoundException(targetUserId));

        if (roleCodes == null || !roleCodes.contains(BUYER_CODE)) {
            throw new RoleRuleViolationException("Le rôle BUYER ne peut jamais être retiré.");
        }

        Set<Role> newRoles = new HashSet<>();
        for (String code : roleCodes) {
            Role role = roleRepository.findByCode(code)
                    .orElseThrow(() -> new RoleRuleViolationException("Rôle inconnu : " + code));
            newRoles.add(role);
        }

        target.setRoles(newRoles);
        target.setUpdatedAt(OffsetDateTime.now());

        return UserResponse.from(userRepository.save(target));
    }

    @Transactional
    public UserResponse updateStatus(Long targetUserId, String status, User actingAdmin) {
        ensureIsAdmin(actingAdmin);

        if (status == null || !VALID_STATUSES.contains(status)) {
            throw new RoleRuleViolationException("Statut invalide : " + status);
        }

        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new AdminUserNotFoundException(targetUserId));

        boolean isDisabling = !"ACTIVE".equals(status);
        if (isDisabling && target.getId().equals(actingAdmin.getId())) {
            throw new RoleRuleViolationException("Un administrateur ne peut pas désactiver son propre compte.");
        }

        target.setStatus(status);
        target.setUpdatedAt(OffsetDateTime.now());

        return UserResponse.from(userRepository.save(target));
    }

    private void ensureIsAdmin(User actingAdmin) {
        boolean isAdmin = actingAdmin.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            throw new AccessDeniedException("Accès refusé : rôle ADMIN requis.");
        }
    }
}
