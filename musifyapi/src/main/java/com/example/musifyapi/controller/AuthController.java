package com.example.musifyapi.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return ResponseEntity.ok("User logged successfully");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return ResponseEntity.ok("User registered successfully");
    }

}
