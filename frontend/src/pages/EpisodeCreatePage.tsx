import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createEpisode } from '../api/episodeApi';

export default function EpisodeCreatePage() {
  const { novelId } = useParams<{ novelId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createEpisode(Number(novelId), {
        title,
        episodeNumber: Number(episodeNumber),
        content,
      });
      navigate(`/novels/${novelId}/episodes`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '회차 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: 640, marginTop: 40 }}>
      <span className="back-link" onClick={() => navigate(`/novels/${novelId}/episodes`)}>
        ← 회차 목록
      </span>
      <h1>새 회차 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>회차 번호</label>
            <input
              type="number"
              min={1}
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
              placeholder="예) 1"
              required
            />
          </div>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="회차 제목"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="회차 내용을 입력하세요"
            rows={16}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '저장 중...' : '회차 저장'}
        </button>
      </form>
    </div>
  );
}
