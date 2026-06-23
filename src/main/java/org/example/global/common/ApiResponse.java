package org.example.global.common;

import lombok.Getter;

@Getter
public class ApiResponse {

    private final String message;

    private ApiResponse(String message) {
        this.message = message;
    }

    public static ApiResponse of(String message) {
        return new ApiResponse(message);
    }
}
