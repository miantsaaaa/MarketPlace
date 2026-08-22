package com.freelaka.marketplacebackend.exception;

import com.freelaka.marketplacebackend.service.AdminUserNotFoundException;
import com.freelaka.marketplacebackend.service.RoleRuleViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentials(
            BadCredentialsException ex
    ) {
        return buildErrorResponse(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized",
                ex.getMessage()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(
            IllegalArgumentException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                "Conflict",
                ex.getMessage()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex
    ) {
        Map<String, Object> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        Map<String, Object> body = new HashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Bad Request");
        body.put("message", "Données invalides");
        body.put("errors", errors);

        return ResponseEntity
                .badRequest()
                .body(body);
    }

    @ExceptionHandler(RoleRuleViolationException.class)
    public ResponseEntity<Map<String, Object>> handleRoleRuleViolation(
            RoleRuleViolationException ex
    ) {
        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Bad Request",
                ex.getMessage()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDenied(
            AccessDeniedException ex
    ) {
        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                "Forbidden",
                ex.getMessage()
        );
    }

    @ExceptionHandler(AdminUserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAdminUserNotFound(
            AdminUserNotFoundException ex
    ) {
        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                "Not Found",
                ex.getMessage()
        );
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(
            HttpStatus status,
            String error,
            String message
    ) {
        Map<String, Object> body = new HashMap<>();

        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);

        return ResponseEntity
                .status(status)
                .body(body);
    }
}
