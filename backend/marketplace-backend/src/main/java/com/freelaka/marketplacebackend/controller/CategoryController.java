package com.freelaka.marketplacebackend.controller;

import com.freelaka.marketplacebackend.dto.CategoryDetailDto;
import com.freelaka.marketplacebackend.dto.CategorySummaryDto;
import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * GET /api/categories
     *
     * Liste paginée des catégories actives.
     */
    @GetMapping
    public ResponseEntity<Page<CategorySummaryDto>> listCategories(
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                categoryService.getActiveCategories(pageable)
        );
    }

    /**
     * GET /api/categories/{slug}
     *
     * Détail d'une catégorie active.
     */
    @GetMapping("/{slug}")
    public ResponseEntity<CategoryDetailDto> getCategory(
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(
                categoryService.getCategoryBySlug(slug)
        );
    }

    /**
     * GET /api/categories/{slug}/products
     *
     * Produits actifs d'une catégorie.
     */
    @GetMapping("/{slug}/products")
    public ResponseEntity<Page<ProductSummaryDto>> getCategoryProducts(
            @PathVariable String slug,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                categoryService.getActiveProductsByCategorySlug(
                        slug,
                        pageable
                )
        );
    }
}