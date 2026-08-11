package com.freelaka.marketplacebackend.repository;

import com.freelaka.marketplacebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
