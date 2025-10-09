package com.example.musifyapi.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.musifyapi.document.User;
import com.example.musifyapi.dto.RegisterRequest;
import com.example.musifyapi.dto.UserResponse;
import com.example.musifyapi.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;


    public UserResponse registerUser(RegisterRequest request){
        //check if email already exists
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        //create new user
        User newUser = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(User.Role.USER)
            .build();

        userRepository.save(newUser);
        return UserResponse.builder()
            .id(newUser.getId())
            .email(newUser.getEmail())
            .role(UserResponse.Role.USER)
            .build();
    }
}
