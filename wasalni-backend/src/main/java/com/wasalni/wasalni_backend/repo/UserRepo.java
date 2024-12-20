package com.wasalni.wasalni_backend.repo;

import com.wasalni.wasalni_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    User findByEmail(String email);
}