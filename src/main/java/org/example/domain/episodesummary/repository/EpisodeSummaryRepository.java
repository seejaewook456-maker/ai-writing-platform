package org.example.domain.episodesummary.repository;

import org.example.domain.episode.entity.Episode;
import org.example.domain.episodesummary.entity.EpisodeSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EpisodeSummaryRepository extends JpaRepository<EpisodeSummary, Long> {

    Optional<EpisodeSummary> findByEpisode(Episode episode);

    // 작품 삭제 시 해당 작품의 모든 요약을 한 번에 삭제
    void deleteAllByEpisode_Novel(org.example.domain.novel.entity.Novel novel);
}
