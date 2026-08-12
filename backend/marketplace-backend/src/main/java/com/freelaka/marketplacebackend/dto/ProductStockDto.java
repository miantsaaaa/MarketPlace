package com.freelaka.marketplacebackend.dto;

import java.time.OffsetDateTime;

public record ProductStockDto(
        Long id,
        Long productId,
        Integer quantityAvailable,
        Integer quantityReserved,
        Integer reorderThreshold,
        OffsetDateTime updatedAt
) {}