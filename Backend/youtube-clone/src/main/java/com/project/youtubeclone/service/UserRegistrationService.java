package com.project.youtubeclone.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.youtubeclone.datatransferobject.UserInfoDTO;
import com.project.youtubeclone.model.User;
import com.project.youtubeclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    @Value("${auth0.userInfoEndpoint}")
    private String userInfoEndpoint;

    private final UserRepository userRepository;

    public String registerUser(String tokenValue) {
        // Make a call to the userInfo Endpoint

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(userInfoEndpoint))
                .setHeader("Authorization", String.format("Bearer %s", tokenValue))
                .build();

        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();

        try {
            HttpResponse<String> responseString = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            // in this way, http client will understand that the response is going to be a string
            String body = responseString.body(); // JSON String Format

            // To transform JSON sting to an object, ObjectMapper is used
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            // DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false is used, so that it won't affect the
            // DB or it should save data into DB, if any property is null
            UserInfoDTO userInfoDTO = objectMapper.readValue(body, UserInfoDTO.class); // to convert JSON string to Object

            // Fetch user details and save them to the database

            Optional<User> userBySubject = userRepository.findBySub(userInfoDTO.getSub());

            if(userBySubject.isPresent()) {
                return userBySubject.get().getId();
            } else {
                User user = new User();
                user.setFirstName(userInfoDTO.getGivenName());
                user.setLastName(userInfoDTO.getFamilyName());
                user.setFullName(userInfoDTO.getName());
                user.setEmailAddress(userInfoDTO.getEmail());
                user.setSub(userInfoDTO.getSub());

                return userRepository.save(user).getId();
            }
        } catch (Exception exception) {
            throw new RuntimeException("Exception occurred while registering user.", exception);
        }
    }
}
