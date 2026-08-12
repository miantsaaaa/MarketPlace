package com.freelaka.marketplacebackend.dto;

import java.math.BigDecimal;

public record ProductSummaryDto(
        Long id,
        String name,
        String slug,
        BigDecimal unitPrice,
        String currency,
        Long shopId,
        Long categoryId
) {}