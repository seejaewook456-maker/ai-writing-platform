import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEpisode, updateEpisode, deleteEpisode } from '../api/episodeApi';
import type { Episode } from '../types/episode';

export default function EpisodeDetailPage() {
  const { episodeId } = useParams<{ episodeId: string }>();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 수정 폼 상태
  const [editTitle, setEditTitle] = useState('');
  const [editEpisodeNumber, setEditEpisodeNumber] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!episodeId) return;
    getEpisode(Number(episodeId))
      .then((data) => {
        setEpisode(data);
        setEditTitle(data.title);
        setEditEpisodeNumber(String(data.episodeNumber));
        setEditContent(data.content);
      })
      .catch((err) => setError(err instanceof Error ? err.message : '조회 실패'));
  }, [episodeId]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!episode) return;
    setSaving(true);
    try {
      const updated = await updateEpisode(episode.id, {
        title: editTitle,
        episodeNumber: Number(editEpisodeNumber),
        content: editContent,
      });
      setEpisode(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!episode) return;
    if (!window.confirm('이 회차를 삭제하시겠습니까?')) return;
    try {
      await deleteEpisode(episode.id);
      navigate(`/novels/${episode.novelId}/episodes`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!episode) return <p>불러오는 중...</p>;

  return (
    <div>
      <span className="back-link" onClick={() => navigate(`/novels/${episode.novelId}/episodes`)}>
        ← 회차 목록
      </span>

      {isEditing ? (
        <form onSubmit={handleUpdate} style={{ maxWidth: 640 }}>
          <h2 style={{ marginBottom: 20 }}>회차 수정</h2>
          <div className="form-row">
            <div className="form-group">
              <label>회차 번호</label>
              <input
                type="number"
                min={1}
                value={editEpisodeNumber}
                onChange={(e) => setEditEpisodeNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>본문</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={16}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? '저장 중...' : '저장'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(episode.title);
                setEditEpisodeNumber(String(episode.episodeNumber));
                setEditContent(episode.content);
              }}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="episode-detail">
          <div className="ep-header">
            <div>
              <h2>{episode.title}</h2>
              <p className="ep-num-badge">{episode.episodeNumber}화</p>
            </div>
            <div className="ep-actions">
              <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
          <div className="episode-content">{episode.content}</div>
        </div>
      )}
    </div>
  );
}
