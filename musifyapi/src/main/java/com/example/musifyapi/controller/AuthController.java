package com.example.musifyapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.musifyapi.document.User;
import com.example.musifyapi.dto.AuthRequest;
import com.example.musifyapi.dto.AuthResponse;
import com.example.musifyapi.dto.RegisterRequest;
import com.example.musifyapi.dto.UserResponse;
import com.example.musifyapi.service.AppUserDetailsService;
import com.example.musifyapi.service.UserService;
import com.example.musifyapi.utils.JwtUtil;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            //Authenticate the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            //Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            User existingUser = userService.findByEmail(request.getEmail());
            //Generate jwt token
            String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());
            return ResponseEntity.ok(
                new AuthResponse(token,request.getEmail(),existingUser.getRole().name())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Email/Password is incorrect");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
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
