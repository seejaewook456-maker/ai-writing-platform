export interface Episode {
  id: number;
  novelId: number;
  title: string;
  episodeNumber: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface EpisodeCreateRequest {
  title: string;
  episodeNumber: number;
  content: string;
}

// PATCH도 전체 교체 — 세 필드 모두 필수
export interface EpisodeUpdateRequest {
  title: string;
  episodeNumber: number;
  content: string;
}
