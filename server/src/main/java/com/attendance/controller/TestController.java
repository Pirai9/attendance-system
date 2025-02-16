package com.attendance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Welcome to School Attendance System API";
    }

    @GetMapping("/test")
    public String test() {
        return "Server is running successfully!";
    }
} 