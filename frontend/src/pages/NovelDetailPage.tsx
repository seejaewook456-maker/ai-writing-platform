import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNovel } from '../api/novelApi';
import type { Novel } from '../types/novel';

export default function NovelDetailPage() {
  const { novelId } = useParams<{ novelId: string }>();
  const navigate = useNavigate();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!novelId) return;
    getNovel(Number(novelId))
      .then(setNovel)
      .catch((err) => setError(err instanceof Error ? err.message : '조회 실패'));
  }, [novelId]);

  if (error) return <p className="error-message">{error}</p>;
  if (!novel) return <p>불러오는 중...</p>;

  const id = Number(novelId);

  return (
    <div>
      <span className="back-link" onClick={() => navigate('/novels')}>← 작품 목록</span>

      <div className="novel-info-card">
        <h2>{novel.title}</h2>
        <span className="genre-badge">{novel.genre}</span>
        {novel.description && <p className="description">{novel.description}</p>}
      </div>

      <div className="section-cards">
        <div className="section-card" onClick={() => navigate(`/novels/${id}/episodes`)}>
          <h3>회차 관리</h3>
          <p>회차 목록 조회 및 작성</p>
        </div>
        <div className="section-card" onClick={() => navigate(`/novels/${id}/characters`)}>
          <h3>등장인물 관리</h3>
          <p>인물 추가 및 수정</p>
        </div>
        <div className="section-card" onClick={() => navigate(`/novels/${id}/world-settings`)}>
          <h3>세계관 관리</h3>
          <p>설정 추가 및 수정</p>
        </div>
      </div>
    </div>
  );
}
