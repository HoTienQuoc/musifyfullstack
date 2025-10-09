package com.example.musifyapi.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.musifyapi.document.User;

@Repository
public interface UserRepository extends MongoRepository<User, Object> {
    Optional<User> findByEmail(String id);

    Boolean existsByEmail(String email);
}
