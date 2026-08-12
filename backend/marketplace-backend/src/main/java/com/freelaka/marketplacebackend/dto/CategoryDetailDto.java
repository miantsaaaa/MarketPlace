package com.freelaka.marketplacebackend.dto;

public record CategoryDetailDto(
        Long id,
        String name,
        String slug,
        String description,
        boolean active
) {}