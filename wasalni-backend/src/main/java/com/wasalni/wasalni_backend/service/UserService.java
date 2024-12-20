package com.wasalni.wasalni_backend.service;

import com.wasalni.wasalni_backend.model.User;
import com.wasalni.wasalni_backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public boolean checkUserCredentials(String email, String password) {
        return userRepo.existsByEmailAndPassword(email, password);
    }

    public User registerUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        return userRepo.save(user);
    }
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}