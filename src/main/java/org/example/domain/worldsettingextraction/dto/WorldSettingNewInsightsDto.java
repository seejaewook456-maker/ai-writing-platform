package org.example.domain.worldsettingextraction.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

// 기존 세계관 설정에 대해 AI가 새롭게 발견한 정보 목록
@Getter
@NoArgsConstructor
public class WorldSettingNewInsightsDto {

    // 기존 content에 없는 새로운 설정 정보 항목들
    private List<String> content;
}
