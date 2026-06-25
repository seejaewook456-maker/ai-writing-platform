package org.example.domain.worldsetting.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class WorldSettingFavoriteRequestDto {

    @NotNull
    private final Boolean isFavorite;

    @JsonCreator
    public WorldSettingFavoriteRequestDto(@JsonProperty("isFavorite") Boolean isFavorite) {
        this.isFavorite = isFavorite;
    }
}
