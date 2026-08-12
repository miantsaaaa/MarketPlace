package com.freelaka.marketplacebackend.dto;

import java.time.OffsetDateTime;

public record ProductImageDto(
        Long id,
        Long productId,
        String imageUrl,
        String altText,
        Integer sortOrder,
        boolean primary,
        OffsetDateTime createdAt
) {}