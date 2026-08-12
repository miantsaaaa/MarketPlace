package com.freelaka.marketplacebackend.repository;

import com.freelaka.marketplacebackend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProductRepository
        extends JpaRepository<Product, Long>,
                JpaSpecificationExecutor<Product> {

    Page<Product> findByActiveTrue(Pageable pageable);

    Optional<Product> findBySlugAndActiveTrue(String slug);

    Page<Product> findByCategoryIdAndActiveTrue(
            Long categoryId,
            Pageable pageable
    );

    Page<Product> findByShopIdAndActiveTrue(
            Long shopId,
            Pageable pageable
    );
}