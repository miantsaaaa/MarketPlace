package com.freelaka.marketplacebackend.repository;

import com.freelaka.marketplacebackend.model.Category;
import com.freelaka.marketplacebackend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    Page<Category> findByActiveTrue(Pageable pageable);

    Optional<Category> findBySlugAndActiveTrue(String slug);

    @Query("""
        SELECT p
        FROM Product p
        WHERE p.categoryId = :categoryId
          AND p.active = true
    """)
    Page<Product> findActiveProductsByCategoryId(
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );
}