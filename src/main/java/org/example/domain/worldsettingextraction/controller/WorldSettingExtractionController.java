package org.example.domain.worldsettingextraction.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.domain.worldsettingextraction.dto.WorldSettingExtractionResponseDto;
import org.example.domain.worldsettingextraction.service.WorldSettingExtractionService;
import org.example.global.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "세계관 AI 추출", description = "회차 본문을 AI가 분석하여 세계관/설정 후보를 추출합니다. DB 저장 없음 — 반드시 사용자 검토 후 저장.")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
public class WorldSettingExtractionController {

    private final WorldSettingExtractionService worldSettingExtractionService;

    @Operation(
            summary = "세계관 AI 추출",
            description = "회차 본문을 분석하여 세계관/설정 후보를 반환합니다. " +
                    "기존 설정과 비교하여 신규(isExistingSetting=false) 또는 보강 후보(isExistingSetting=true)로 구분합니다. " +
                    "이 API는 DB에 저장하지 않으며, 저장은 사용자 검토 후 WorldSetting CRUD API로 진행합니다."
    )
    @PostMapping("/api/episodes/{episodeId}/world-setting-extraction")
    public ResponseEntity<ApiResponse> extractWorldSettings(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long episodeId) {
        WorldSettingExtractionResponseDto response =
                worldSettingExtractionService.extractWorldSettings(userDetails.getUsername(), episodeId);
        return ResponseEntity.ok(ApiResponse.of("세계관 추출 성공", response));
    }
}
