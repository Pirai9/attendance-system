package com.attendance.service;

import com.attendance.model.User;
import com.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String name, String email, String password, String role) {
        log.info("Attempting to register user with email: {}", email);
        
        if (userRepository.existsByEmail(email)) {
            log.warn("Email already exists: {}", email);
            throw new RuntimeException("Email already registered");
        }

        try {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(User.Role.valueOf(role.toUpperCase()));

            User savedUser = userRepository.save(user);
            log.info("Successfully registered user with email: {}", email);
            return savedUser;
        } catch (Exception e) {
            log.error("Error registering user: {}", e.getMessage());
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        return user;
    }
} 