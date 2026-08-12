package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.ProductStockDto;
import com.freelaka.marketplacebackend.model.ProductStock;
import com.freelaka.marketplacebackend.repository.ProductStockRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductStockService {

    private final ProductStockRepository productStockRepository;

    public ProductStockService(
            ProductStockRepository productStockRepository
    ) {
        this.productStockRepository = productStockRepository;
    }

    /**
     * Retourne le stock d'un produit.
     */
    public ProductStockDto getStockByProductId(Long productId) {

        ProductStock stock = productStockRepository
                .findByProductId(productId)
                .orElseThrow(
                        () -> new ProductStockNotFoundException(productId)
                );

        return toDto(stock);
    }

    private ProductStockDto toDto(ProductStock stock) {

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