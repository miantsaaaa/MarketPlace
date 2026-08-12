package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.dto.ShopDetailDto;
import com.freelaka.marketplacebackend.dto.ShopSummaryDto;
import com.freelaka.marketplacebackend.model.Shop;
import com.freelaka.marketplacebackend.repository.ProductRepository;
import com.freelaka.marketplacebackend.repository.ShopRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    private static final String ACTIVE = "ACTIVE";

    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;

    public ShopService(
            ShopRepository shopRepository,
            ProductRepository productRepository
    ) {
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
    }

    public Page<ShopSummaryDto> getActiveShops(Pageable pageable) {
        return shopRepository.findByStatus(ACTIVE, pageable)
                .map(shop -> new ShopSummaryDto(
                        shop.getId(),
                        shop.getName(),
                        shop.getSlug(),
                        shop.getLogoUrl()
                ));
    }

    public ShopDetailDto getShopBySlug(String slug) {
        Shop shop = shopRepository.findBySlugAndStatus(slug, ACTIVE)
                .orElseThrow(() -> new ShopNotFoundException(slug));

        return new ShopDetailDto(
                shop.getId(),
                shop.getName(),
                shop.getSlug(),
                shop.getDescription(),
                shop.getLogoUrl(),
                shop.getStatus(),
                shop.getCreatedAt()
        );
    }

    public Page<ProductSummaryDto> getShopProducts(
            String slug,
            Pageable pageable
    ) {

        Shop shop = shopRepository
                .findBySlugAndStatus(slug.trim(), ACTIVE)
                .orElseThrow(() -> new ShopNotFoundException(slug));

        return productRepository
                .findByShopIdAndActiveTrue(shop.getId(), pageable)
                .map(product -> new ProductSummaryDto(
                        product.getId(),
                        product.getName(),
                        product.getSlug(),
                        product.getUnitPrice(),
                        product.getCurrency(),
                        product.getShopId(),
                        product.getCategoryId()
                ));
    }
}