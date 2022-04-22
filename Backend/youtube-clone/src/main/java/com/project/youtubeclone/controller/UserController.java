package com.project.youtubeclone.controller;

import com.project.youtubeclone.service.UserRegistrationService;
import com.project.youtubeclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRegistrationService userRegistrationService;
    private final UserService userService;

    @GetMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public String register(Authentication authentication) { // Authentication class is used to read the JSON web
        // token coming from the http client or angular app.
        Jwt jwt = (Jwt) authentication.getPrincipal();
        userRegistrationService.registerUser(jwt.getTokenValue());
        return "User registration successful.";
    }

    @PostMapping("/subscribe/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean subscribeUser(@PathVariable String userId) {
        userService.subscribeUser(userId);
        return true;
    }

    @PostMapping("/unsubscribe/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean unsubscribeUser(@PathVariable String userId) {
        userService.unsubscribeUser(userId);
        return true;
    }

    @GetMapping("/{userId}/history")
    @ResponseStatus(HttpStatus.OK)
    public Set<String> userHistory(@PathVariable String userId) {
        return userService.userHistory(userId);
    }
}
