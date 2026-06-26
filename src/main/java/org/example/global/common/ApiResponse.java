package org.example.global.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
public class ApiResponse {

    private final boolean success;
    private final String code;
    private final String message;

    // null이면 JSON 응답에서 제외
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final Object data;

    private ApiResponse(boolean success, String code, String message, Object data) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    // 기존 호환 메서드 — 컨트롤러에서 그대로 사용 (success: true, code: "OK" 자동 설정)
    public static ApiResponse of(String message) {
        return new ApiResponse(true, "OK", message, null);
    }

    public static ApiResponse of(String message, Object data) {
        return new ApiResponse(true, "OK", message, data);
    }

    // 실패 응답 — GlobalExceptionHandler에서 사용
    public static ApiResponse fail(String code, String message) {
        return new ApiResponse(false, code, message, null);
    }

    public static ApiResponse fail(String code, String message, Object data) {
        return new ApiResponse(false, code, message, data);
    }
}
