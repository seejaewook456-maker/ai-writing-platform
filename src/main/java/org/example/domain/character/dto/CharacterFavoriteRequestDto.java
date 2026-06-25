package org.example.domain.character.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CharacterFavoriteRequestDto {

    @NotNull
    private final Boolean isFavorite;

    @JsonCreator
    public CharacterFavoriteRequestDto(@JsonProperty("isFavorite") Boolean isFavorite) {
        this.isFavorite = isFavorite;
    }
}
