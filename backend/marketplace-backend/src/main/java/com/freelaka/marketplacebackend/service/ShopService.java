package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.ShopDetailDto;
import com.freelaka.marketplacebackend.dto.ShopSummaryDto;
import com.freelaka.marketplacebackend.model.Shop;
import com.freelaka.marketplacebackend.repository.ShopRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Page<ShopSummaryDto> getActiveShops(Pageable pageable) {
        return shopRepository.findByStatus("ACTIVE", pageable)
                .map(shop -> new ShopSummaryDto(
                        shop.getId(),
                        shop.getName(),
                        shop.getSlug(),
                        shop.getLogoUrl()
                ));
    }

    public ShopDetailDto getShopBySlug(String slug) {
        Shop shop = shopRepository.findBySlugAndStatus(slug, "ACTIVE")
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
}
