package com.freelaka.marketplacebackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProductStockNotFoundException extends RuntimeException {

    public ProductStockNotFoundException(Long productId) {
        super("Stock introuvable pour le produit : " + productId);
    }
}