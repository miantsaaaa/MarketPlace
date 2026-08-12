package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.ProductImageDto;
import com.freelaka.marketplacebackend.service.ProductImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/images")
public class ProductImageController {

    private final ProductImageService productImageService;

    public ProductImageController(
            ProductImageService productImageService
    ) {
        this.productImageService = productImageService;
    }

    /**
     * Retourne toutes les images d'un produit.
     */
    @GetMapping
    public ResponseEntity<List<ProductImageDto>> getImages(
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(
                productImageService.getImagesByProductId(productId)
        );
    }

    /**
     * Retourne l'image principale d'un produit.
     */
    @GetMapping("/primary")
    public ResponseEntity<ProductImageDto> getPrimaryImage(
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(
                productImageService.getPrimaryImage(productId)
        );
    }
}