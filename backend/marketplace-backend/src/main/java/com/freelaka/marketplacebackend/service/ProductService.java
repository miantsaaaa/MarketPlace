package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.ProductDetailDto;
import com.freelaka.marketplacebackend.dto.ProductImageDto;
import com.freelaka.marketplacebackend.dto.ProductStockDto;
import com.freelaka.marketplacebackend.dto.ProductSummaryDto;
import com.freelaka.marketplacebackend.model.Category;
import com.freelaka.marketplacebackend.model.Product;
import com.freelaka.marketplacebackend.model.ProductImage;
import com.freelaka.marketplacebackend.model.ProductStock;
import com.freelaka.marketplacebackend.model.Shop;
import com.freelaka.marketplacebackend.repository.CategoryRepository;
import com.freelaka.marketplacebackend.repository.ProductImageRepository;
import com.freelaka.marketplacebackend.repository.ProductRepository;
import com.freelaka.marketplacebackend.repository.ProductStockRepository;
import com.freelaka.marketplacebackend.repository.ShopRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private static final String ACTIVE = "ACTIVE";

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ShopRepository shopRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductStockRepository productStockRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            ShopRepository shopRepository,
            ProductImageRepository productImageRepository,
            ProductStockRepository productStockRepository
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.shopRepository = shopRepository;
        this.productImageRepository = productImageRepository;
        this.productStockRepository = productStockRepository;
    }

    /**
     * Retourne les produits actifs avec pagination et filtres.
     *
     * Filtres supportés :
     * - search
     * - category
     * - shop
     * - minPrice
     * - maxPrice
     *
     * Les filtres peuvent être combinés.
     */
    public Page<ProductSummaryDto> getProducts(
            String search,
            String category,
            String shop,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable
    ) {

        validatePrices(minPrice, maxPrice);

        Long categoryId = resolveCategoryId(category);
        Long shopId = resolveShopId(shop);

        Specification<Product> specification =
                buildSpecification(
                        search,
                        categoryId,
                        shopId,
                        minPrice,
                        maxPrice
                );

        return productRepository
                .findAll(specification, pageable)
                .map(this::toSummaryDto);
    }

    /**
     * Retourne le détail complet d'un produit actif.
     */
    public ProductDetailDto getProductBySlug(String slug) {

        if (slug == null || slug.isBlank()) {
            throw new ProductNotFoundException(slug);
        }

        List<Product> products =
                productRepository.findAll(
                        (root, query, criteriaBuilder) ->
                                criteriaBuilder.and(
                                        criteriaBuilder.equal(
                                                root.get("slug"),
                                                slug.trim()
                                        ),
                                        criteriaBuilder.isTrue(
                                                root.get("active")
                                        )
                                )
                );

        if (products.isEmpty()) {
            throw new ProductNotFoundException(slug);
        }

        /*
         * La base autorise actuellement le même slug
         * dans plusieurs boutiques.
         *
         * L'endpoint /api/products/{slug} ne reçoit cependant
         * qu'un slug.
         *
         * On refuse donc silencieusement une situation ambiguë.
         */
        if (products.size() > 1) {
            throw new IllegalStateException(
                    "Le slug produit est ambigu : " + slug
            );
        }

        Product product = products.get(0);

        Category category =
                categoryRepository.findById(product.getCategoryId())
                        .orElseThrow(
                                () -> new IllegalStateException(
                                        "Catégorie introuvable pour le produit : "
                                                + product.getId()
                                )
                        );

        Shop shop =
                shopRepository.findById(product.getShopId())
                        .orElseThrow(
                                () -> new IllegalStateException(
                                        "Boutique introuvable pour le produit : "
                                                + product.getId()
                                )
                        );

        List<ProductImageDto> images =
                productImageRepository
                        .findByProductIdOrderBySortOrderAsc(product.getId())
                        .stream()
                        .map(this::toImageDto)
                        .toList();

        ProductImageDto primaryImage =
                productImageRepository
                        .findByProductIdAndPrimaryTrue(product.getId())
                        .map(this::toImageDto)
                        .orElse(null);

        ProductStockDto stock =
                productStockRepository
                        .findByProductId(product.getId())
                        .map(this::toStockDto)
                        .orElse(null);

        return new ProductDetailDto(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getDescription(),
                product.getUnitPrice(),
                product.getCurrency(),
                product.isActive(),

                category.getId(),
                category.getName(),
                category.getSlug(),

                shop.getId(),
                shop.getName(),
                shop.getSlug(),

                images,
                primaryImage,
                stock,

                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    /**
     * Construit la specification dynamique des produits.
     */
    private Specification<Product> buildSpecification(
            String search,
            Long categoryId,
            Long shopId,
            BigDecimal minPrice,
            BigDecimal maxPrice
    ) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            /*
             * Toujours uniquement les produits actifs.
             */
            predicates.add(
                    criteriaBuilder.isTrue(
                            root.get("active")
                    )
            );

            /*
             * Recherche sur le nom ou la description.
             */
            if (search != null && !search.isBlank()) {

                String searchValue =
                        "%" + search.trim().toLowerCase() + "%";

                Predicate namePredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("name")
                                ),
                                searchValue
                        );

                Predicate descriptionPredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("description")
                                ),
                                searchValue
                        );

                predicates.add(
                        criteriaBuilder.or(
                                namePredicate,
                                descriptionPredicate
                        )
                );
            }

            /*
             * Filtre catégorie.
             */
            if (categoryId != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("categoryId"),
                                categoryId
                        )
                );
            }

            /*
             * Filtre boutique.
             */
            if (shopId != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("shopId"),
                                shopId
                        )
                );
            }

            /*
             * Prix minimum.
             */
            if (minPrice != null) {

                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("unitPrice"),
                                minPrice
                        )
                );
            }

            /*
             * Prix maximum.
             */
            if (maxPrice != null) {

                predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("unitPrice"),
                                maxPrice
                        )
                );
            }

            return criteriaBuilder.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }

    /**
     * Transforme un slug de catégorie en ID.
     */
    private Long resolveCategoryId(String categorySlug) {

        if (categorySlug == null || categorySlug.isBlank()) {
            return null;
        }

        return categoryRepository
                .findBySlugAndActiveTrue(categorySlug.trim())
                .map(Category::getId)
                .orElseThrow(
                        () -> new CategoryNotFoundException(
                                categorySlug.trim()
                        )
                );
    }

    /**
     * Transforme un slug de boutique en ID.
     */
    private Long resolveShopId(String shopSlug) {

        if (shopSlug == null || shopSlug.isBlank()) {
            return null;
        }

        return shopRepository
                .findBySlugAndStatus(
                        shopSlug.trim(),
                        ACTIVE
                )
                .map(Shop::getId)
                .orElseThrow(
                        () -> new ShopNotFoundException(
                                shopSlug.trim()
                        )
                );
    }

    /**
     * Vérifie la cohérence des prix.
     */
    private void validatePrices(
            BigDecimal minPrice,
            BigDecimal maxPrice
    ) {

        if (minPrice != null && minPrice.signum() < 0) {
            throw new IllegalArgumentException(
                    "Le prix minimum ne peut pas être négatif."
            );
        }

        if (maxPrice != null && maxPrice.signum() < 0) {
            throw new IllegalArgumentException(
                    "Le prix maximum ne peut pas être négatif."
            );
        }

        if (minPrice != null
                && maxPrice != null
                && minPrice.compareTo(maxPrice) > 0) {

            throw new IllegalArgumentException(
                    "Le prix minimum ne peut pas être supérieur au prix maximum."
            );
        }
    }

    /**
     * Conversion Product -> ProductSummaryDto.
     */
    private ProductSummaryDto toSummaryDto(Product product) {

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

    /**
     * Conversion ProductImage -> ProductImageDto.
     */
    private ProductImageDto toImageDto(ProductImage image) {

        return new ProductImageDto(
                image.getId(),
                image.getProductId(),
                image.getImageUrl(),
                image.getAltText(),
                image.getSortOrder(),
                image.isPrimary(),
                image.getCreatedAt()
        );
    }

    /**
     * Conversion ProductStock -> ProductStockDto.
     */
    private ProductStockDto toStockDto(ProductStock stock) {

        return new ProductStockDto(
                stock.getId(),
                stock.getProductId(),
                stock.getQuantityAvailable(),
                stock.getQuantityReserved(),
                stock.getReorderThreshold(),
                stock.getUpdatedAt()
        );
    }
}