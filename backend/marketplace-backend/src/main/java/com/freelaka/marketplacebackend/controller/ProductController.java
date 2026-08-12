package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.ProductDetailDto;
import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Liste des produits actifs avec filtres et pagination.
     *
     * Exemples :
     * GET /api/products
     * GET /api/products?search=telephone
     * GET /api/products?category=electronique
     * GET /api/products?shop=ma-boutique
     * GET /api/products?minPrice=50000
     * GET /api/products?maxPrice=500000
     * GET /api/products?category=electronique&shop=ma-boutique
     */
    @GetMapping
    public ResponseEntity<Page<ProductSummaryDto>> listProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String shop,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            Pageable pageable
    ) {

        return ResponseEntity.ok(
                productService.getProducts(
                        search,
                        category,
                        shop,
                        minPrice,
                        maxPrice,
                        pageable
                )
        );
    }

    /**
     * Détail d'un produit actif.
     */
    @GetMapping("/{slug}")
    public ResponseEntity<ProductDetailDto> getProduct(
            @PathVariable String slug
    ) {

        return ResponseEntity.ok(
                productService.getProductBySlug(slug)
        );
    }
}