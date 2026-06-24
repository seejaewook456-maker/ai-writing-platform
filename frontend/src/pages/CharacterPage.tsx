import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '../api/characterApi';
import type { Character, CharacterCreateRequest } from '../types/character';

export default function CharacterPage() {
  const { novelId } = useParams<{ novelId: string }>();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState('');

  // 추가 폼 상태
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newPersonality, setNewPersonality] = useState('');
  const [newSpeechStyle, setNewSpeechStyle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [adding, setAdding] = useState(false);

  // 수정 중인 인물 ID
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editPersonality, setEditPersonality] = useState('');
  const [editSpeechStyle, setEditSpeechStyle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!novelId) return;
    getCharacters(Number(novelId))
      .then(setCharacters)
      .catch((err) => setError(err instanceof Error ? err.message : '목록 조회 실패'));
  }, [novelId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const body: CharacterCreateRequest = {
        name: newName,
        ...(newRole && { role: newRole }),
        ...(newAge && { age: newAge }),
        ...(newPersonality && { personality: newPersonality }),
        ...(newSpeechStyle && { speechStyle: newSpeechStyle }),
        ...(newDescription && { description: newDescription }),
      };
      const created = await createCharacter(Number(novelId), body);
      setCharacters((prev) => [...prev, created]);
      setNewName(''); setNewRole(''); setNewAge('');
      setNewPersonality(''); setNewSpeechStyle(''); setNewDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '인물 추가 실패');
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (c: Character) => {
    setEditingId(c.id);
    setEditName(c.name);
    setEditRole(c.role ?? '');
    setEditAge(c.age ?? '');
    setEditPersonality(c.personality ?? '');
    setEditSpeechStyle(c.speechStyle ?? '');
    setEditDescription(c.description ?? '');
  };

  const cancelEdit = () => setEditingId(null);

  const handleUpdate = async (characterId: number) => {
    setSaving(true);
    try {
      const updated = await updateCharacter(characterId, {
        name: editName,
        ...(editRole && { role: editRole }),
        ...(editAge && { age: editAge }),
        ...(editPersonality && { personality: editPersonality }),
        ...(editSpeechStyle && { speechStyle: editSpeechStyle }),
        ...(editDescription && { description: editDescription }),
      });
      setCharacters((prev) => prev.map((c) => (c.id === characterId ? updated : c)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (characterId: number) => {
    if (!window.confirm('이 인물을 삭제하시겠습니까?')) return;
    try {
      await deleteCharacter(characterId);
      setCharacters((prev) => prev.filter((c) => c.id !== characterId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  return (
    <div className="manage-page">
      <span className="back-link" onClick={() => navigate(`/novels/${novelId}`)}>
        ← 작품으로
      </span>
      <div className="page-header">
        <h2>등장인물 관리</h2>
      </div>

      {/* 인물 추가 폼 */}
      <div className="add-form-box">
        <h3>새 인물 추가</h3>
        <form onSubmit={handleAdd}>
          <div className="form-row">
            <div className="form-group">
              <label>이름 *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="인물 이름"
                required
              />
            </div>
            <div className="form-group">
              <label>역할</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="주인공, 악당, 조력자 등"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>나이</label>
              <input
                type="text"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                placeholder="예) 25세"
              />
            </div>
            <div className="form-group">
              <label>말투</label>
              <input
                type="text"
                value={newSpeechStyle}
                onChange={(e) => setNewSpeechStyle(e.target.value)}
                placeholder="예) 격식체, 반말"
              />
            </div>
          </div>
          <div className="form-group">
            <label>성격</label>
            <input
              type="text"
              value={newPersonality}
              onChange={(e) => setNewPersonality(e.target.value)}
              placeholder="예) 용감하고 직설적인"
            />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="인물에 대한 추가 설명"
              rows={3}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-save" disabled={adding}>
            {adding ? '추가 중...' : '인물 추가'}
          </button>
        </form>
      </div>

      {/* 인물 목록 */}
      {characters.length === 0 ? (
        <div className="empty-state">
          <p>등록된 인물이 없습니다.</p>
        </div>
      ) : (
        characters.map((c) => (
          <div key={c.id} className="item-card">
            <div className="item-card-header">
              <h3>{c.name}</h3>
              <div className="item-card-actions">
                {editingId !== c.id && (
                  <>
                    <button className="btn-secondary" onClick={() => startEdit(c)}>
                      수정
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(c.id)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingId !== c.id ? (
              <>
                {c.role && <p className="item-field"><span>역할</span> {c.role}</p>}
                {c.age && <p className="item-field"><span>나이</span> {c.age}</p>}
                {c.personality && <p className="item-field"><span>성격</span> {c.personality}</p>}
                {c.speechStyle && <p className="item-field"><span>말투</span> {c.speechStyle}</p>}
                {c.description && <p className="item-field"><span>설명</span> {c.description}</p>}
              </>
            ) : (
              <div className="inline-edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>이름 *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>역할</label>
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>나이</label>
                    <input
                      type="text"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>말투</label>
                    <input
                      type="text"
                      value={editSpeechStyle}
                      onChange={(e) => setEditSpeechStyle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>성격</label>
                  <input
                    type="text"
                    value={editPersonality}
                    onChange={(e) => setEditPersonality(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>설명</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-save"
                    disabled={saving}
                    onClick={() => handleUpdate(c.id)}
                  >
                    {saving ? '저장 중...' : '저장'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={cancelEdit}>
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
