package com.freelaka.marketplacebackend.dto.admin;

import jakarta.validation.constraints.NotBlank;

public class UpdateStatusRequest {

    @NotBlank(message = "Le statut est obligatoire.")
    private String status;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
