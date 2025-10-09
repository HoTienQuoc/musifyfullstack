package com.example.musifyapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.musifyapi.document.User;
import com.example.musifyapi.dto.RegisterRequest;
import com.example.musifyapi.dto.UserResponse;
import com.example.musifyapi.service.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return ResponseEntity.ok("User logged successfully");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try{
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
