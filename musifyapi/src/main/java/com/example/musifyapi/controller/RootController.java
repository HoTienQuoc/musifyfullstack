package com.example.musifyapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/health")
public class RootController {
    @GetMapping("")
    public String healthCheck(){
        return "Api Working";
    }
}
