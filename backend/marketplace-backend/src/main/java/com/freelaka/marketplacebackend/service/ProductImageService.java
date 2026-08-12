package com.freelaka.marketplacebackend.service;

import com.freelaka.marketplacebackend.dto.ProductImageDto;
import com.freelaka.marketplacebackend.model.ProductImage;
import com.freelaka.marketplacebackend.repository.ProductImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageService {

    private final ProductImageRepository productImageRepository;

    public ProductImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    /**
     * Retourne toutes les images d'un produit,
     * triées par ordre d'affichage.
     */
    public List<ProductImageDto> getImagesByProductId(Long productId) {

        return productImageRepository
                .findByProductIdOrderBySortOrderAsc(productId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    /**
     * Retourne l'image principale d'un produit.
     *
     * Une seule image principale peut exister
     * grâce à la contrainte SQL.
     */
    public ProductImageDto getPrimaryImage(Long productId) {

        ProductImage image = productImageRepository
                .findByProductIdAndPrimaryTrue(productId)
                .orElseThrow(
                        () -> new ProductImageNotFoundException(productId)
                );

        return toDto(image);
    }

    /**
     * Conversion de l'entité ProductImage vers ProductImageDto.
     */
    private ProductImageDto toDto(ProductImage image) {

        return new ProductImageDto(
                image.getId(),
                image.getProductId(),
                image.getImageUrl(),   // correction : getImageUrl()
                image.getAltText(),
                image.getSortOrder(),
                image.isPrimary(),
                image.getCreatedAt()
        );
    }
}