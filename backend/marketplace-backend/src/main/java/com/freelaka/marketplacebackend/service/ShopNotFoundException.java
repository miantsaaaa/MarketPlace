package com.freelaka.marketplacebackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ShopNotFoundException extends RuntimeException {
    public ShopNotFoundException(String slug) {
        super("Boutique introuvable : " + slug);
    }
}
