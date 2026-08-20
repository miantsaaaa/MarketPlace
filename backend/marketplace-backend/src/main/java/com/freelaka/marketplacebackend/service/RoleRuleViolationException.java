package com.freelaka.marketplacebackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RoleRuleViolationException extends RuntimeException {
    public RoleRuleViolationException(String message) {
        super(message);
    }
}
