package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.auth.AuthResponse;
import com.freelaka.marketplacebackend.dto.auth.LoginRequest;
import com.freelaka.marketplacebackend.dto.auth.RegisterRequest;
import com.freelaka.marketplacebackend.dto.auth.UserResponse;
import com.freelaka.marketplacebackend.model.Role;
import com.freelaka.marketplacebackend.model.User;
import com.freelaka.marketplacebackend.repository.RoleRepository;
import com.freelaka.marketplacebackend.repository.UserRepository;
import com.freelaka.marketplacebackend.security.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Cette adresse email est déjà utilisée.");
        }

        Role buyerRole = roleRepository.findByCode("BUYER")
                .orElseThrow(() ->
                        new IllegalStateException("Le rôle BUYER est introuvable."));

        OffsetDateTime now = OffsetDateTime.now();

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(email);
        user.setPhone(
                request.getPhone() == null || request.getPhone().isBlank()
                        ? null
                        : request.getPhone().trim()
        );

        // Le mot de passe en clair n'est jamais enregistré.
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        // Un nouvel utilisateur est actif.
        user.setStatus("ACTIVE");
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        // Attribution automatique du rôle BUYER.
        user.getRoles().add(buyerRole);

        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }

    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadCredentialsException("Email ou mot de passe incorrect."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Email ou mot de passe incorrect.");
        }

        if (!user.isEnabled()) {
            throw new BadCredentialsException("Ce compte n'est pas actif.");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                UserResponse.from(user)
        );
    }
}