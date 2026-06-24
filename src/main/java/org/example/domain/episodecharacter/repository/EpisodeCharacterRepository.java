package org.example.domain.episodecharacter.repository;

import org.example.domain.character.entity.Character;
import org.example.domain.episode.entity.Episode;
import org.example.domain.episodecharacter.entity.EpisodeCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeCharacterRepository extends JpaRepository<EpisodeCharacter, Long> {

    List<EpisodeCharacter> findAllByEpisode(Episode episode);

    boolean existsByEpisodeAndCharacter_Id(Episode episode, Long characterId);

    void deleteAllByEpisode(Episode episode);

    // 작품 삭제 시 해당 작품의 모든 회차-인물 연결을 한 번에 삭제
    void deleteAllByEpisode_Novel(org.example.domain.novel.entity.Novel novel);

    void deleteAllByCharacter(Character character);
}
