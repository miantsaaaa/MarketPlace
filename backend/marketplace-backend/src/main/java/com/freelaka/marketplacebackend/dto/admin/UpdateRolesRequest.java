package com.freelaka.marketplacebackend.dto.admin;

import jakarta.validation.constraints.NotEmpty;
import java.util.Set;

public class UpdateRolesRequest {

    @NotEmpty(message = "La liste des rôles ne peut pas être vide.")
    private Set<String> roles;

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
