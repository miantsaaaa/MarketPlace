package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.dto.ShopDetailDto;
import com.freelaka.marketplacebackend.dto.ShopSummaryDto;
import com.freelaka.marketplacebackend.service.ShopService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping
    public ResponseEntity<Page<ShopSummaryDto>> listShops(
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                shopService.getActiveShops(pageable)
        );
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ShopDetailDto> getShop(
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(
                shopService.getShopBySlug(slug)
        );
    }

    @GetMapping("/{slug}/products")
    public ResponseEntity<Page<ProductSummaryDto>> getShopProducts(
            @PathVariable String slug,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                shopService.getShopProducts(slug, pageable)
        );
    }
}