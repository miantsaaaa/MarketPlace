package com.freelaka.marketplacebackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configuration CORS pour le frontend Marketplace.
     *
     * En développement, le frontend peut être lancé :
     *
     * - localement avec Vite :
     *   http://localhost:5173
     *
     * - via ngrok :
     *   https://overapt-alfredo-extensive.ngrok-free.dev
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "https://overapt-alfredo-extensive.ngrok-free.dev"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept",
                        "Origin",
                        "ngrok-skip-browser-warning"
                )
        );

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * API REST stateless.
                 *
                 * L'authentification repose sur le JWT,
                 * donc aucune session HTTP n'est utilisée.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Active la configuration CORS déclarée
                 * dans corsConfigurationSource().
                 */
                .cors(cors -> {})

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        /*
                         * Les requêtes CORS preflight OPTIONS
                         * doivent être autorisées.
                         */
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        /*
                         * Endpoints d'authentification publics.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/register"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/login"
                        ).permitAll()

                        /*
                         * Catalogue public.
                         */
                        .requestMatchers(
                                "/api/shops/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/products/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/categories/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/stocks/**"
                        ).permitAll()

                        /*
                         * Tous les autres endpoints nécessitent
                         * une authentification JWT.
                         */
                        .anyRequest().authenticated()
                )

                /*
                 * Filtre JWT exécuté avant le filtre
                 * UsernamePasswordAuthenticationFilter.
                 */
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}