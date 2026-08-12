package com.freelaka.marketplacebackend.repository;

import com.freelaka.marketplacebackend.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository
        extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findByProductIdOrderBySortOrderAsc(
            Long productId
    );

    Optional<ProductImage> findByProductIdAndPrimaryTrue(
            Long productId
    );
}