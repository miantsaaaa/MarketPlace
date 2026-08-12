package com.freelaka.marketplacebackend.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record ProductDetailDto(
        Long id,
        String name,
        String slug,
        String description,
        BigDecimal unitPrice,
        String currency,
        boolean active,

        Long categoryId,
        String categoryName,
        String categorySlug,

        Long shopId,
        String shopName,
        String shopSlug,

        List<ProductImageDto> images,
        ProductImageDto primaryImage,
        ProductStockDto stock,

        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}