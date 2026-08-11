package com.freelaka.marketplacebackend.dto;

import java.time.OffsetDateTime;

public record ShopDetailDto(
        Long id,
        String name,
        String slug,
        String description,
        String logoUrl,
        String status,
        OffsetDateTime createdAt
) {}
