package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.CategoryDetailDto;
import com.freelaka.marketplacebackend.dto.CategorySummaryDto;
import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.model.Category;
import com.freelaka.marketplacebackend.model.Product;
import com.freelaka.marketplacebackend.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Retourne uniquement les catégories actives.
     */
    public Page<CategorySummaryDto> getActiveCategories(
            Pageable pageable
    ) {
        return categoryRepository
                .findByActiveTrue(pageable)
                .map(this::toSummaryDto);
    }

    /**
     * Retourne une catégorie active à partir de son slug.
     */
    public CategoryDetailDto getCategoryBySlug(String slug) {

        Category category = categoryRepository
                .findBySlugAndActiveTrue(slug)
                .orElseThrow(
                        () -> new CategoryNotFoundException(slug)
                );

        return toDetailDto(category);
    }

    /**
     * Retourne uniquement les produits actifs d'une catégorie.
     */
    public Page<ProductSummaryDto> getActiveProductsByCategorySlug(
            String slug,
            Pageable pageable
    ) {

        Category category = categoryRepository
                .findBySlugAndActiveTrue(slug)
                .orElseThrow(
                        () -> new CategoryNotFoundException(slug)
                );

        return categoryRepository
                .findActiveProductsByCategoryId(
                        category.getId(),
                        pageable
                )
                .map(this::toProductSummaryDto);
    }

    private CategorySummaryDto toSummaryDto(
            Category category
    ) {
        return new CategorySummaryDto(
                category.getId(),
                category.getName(),
                category.getSlug()
        );
    }

    private CategoryDetailDto toDetailDto(
            Category category
    ) {
        return new CategoryDetailDto(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.isActive()
        );
    }

    private ProductSummaryDto toProductSummaryDto(
            Product product
    ) {
        return new ProductSummaryDto(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getUnitPrice(),
                product.getCurrency(),
                product.getShopId(),
                product.getCategoryId()
        );
    }
}