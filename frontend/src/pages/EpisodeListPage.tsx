import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEpisodes } from '../api/episodeApi';
import type { Episode } from '../types/episode';

export default function EpisodeListPage() {
  const { novelId } = useParams<{ novelId: string }>();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!novelId) return;
    getEpisodes(Number(novelId))
      .then(setEpisodes)
      .catch((err) => setError(err instanceof Error ? err.message : '목록 조회 실패'))
      .finally(() => setLoading(false));
  }, [novelId]);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <span className="back-link" onClick={() => navigate(`/novels/${novelId}`)}>← 작품으로</span>

      <div className="page-header">
        <h2>회차 목록</h2>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '10px 20px' }}
          onClick={() => navigate(`/novels/${novelId}/episodes/new`)}
        >
          + 새 회차
        </button>
      </div>

      {episodes.length === 0 ? (
        <div className="empty-state">
          <p>아직 작성된 회차가 없습니다.</p>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '10px 20px' }}
            onClick={() => navigate(`/novels/${novelId}/episodes/new`)}
          >
            첫 번째 회차 작성하기
          </button>
        </div>
      ) : (
        <div className="episode-list">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="episode-item"
              onClick={() => navigate(`/episodes/${ep.id}`)}
            >
              <div className="ep-info">
                <span className="ep-num">{ep.episodeNumber}화</span>
                <span className="ep-title">{ep.title}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#aaa' }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
