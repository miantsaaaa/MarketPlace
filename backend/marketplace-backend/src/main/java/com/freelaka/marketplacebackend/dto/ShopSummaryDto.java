package com.freelaka.marketplacebackend.dto;

public record ShopSummaryDto(
        Long id,
        String name,
        String slug,
        String logoUrl
) {}
