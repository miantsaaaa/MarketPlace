package com.freelaka.marketplacebackend.repository;

import com.freelaka.marketplacebackend.model.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    Page<Shop> findByStatus(String status, Pageable pageable);

    Optional<Shop> findBySlugAndStatus(String slug, String status);
}
