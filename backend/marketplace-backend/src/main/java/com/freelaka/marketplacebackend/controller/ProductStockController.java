package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.ProductStockDto;
import com.freelaka.marketplacebackend.service.ProductStockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{productId}/stock")
public class ProductStockController {

    private final ProductStockService productStockService;

    public ProductStockController(
            ProductStockService productStockService
    ) {
        this.productStockService = productStockService;
    }

    /**
     * Retourne le stock d'un produit.
     */
    @GetMapping
    public ResponseEntity<ProductStockDto> getStock(
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(
                productStockService.getStockByProductId(productId)
        );
    }
}