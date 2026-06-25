import { useState, useEffect, type ChangeEvent } from 'react';
import Button from './Button';

const CONFIRM_PHRASE = '삭제하겠습니다';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading = false,
  error = '',
}: ConfirmDeleteModalProps) {
  const [confirmText, setConfirmText] = useState('');

  // 모달이 닫힐 때 입력값 초기화
  useEffect(() => {
    if (!isOpen) setConfirmText('');
  }, [isOpen]);

  if (!isOpen) return null;

  const canDelete = confirmText === CONFIRM_PHRASE && !isLoading;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>

        <div className="modal-confirm-section">
          <p className="modal-confirm-label">
            삭제를 계속하려면 아래 문구를 정확히 입력하세요.
          </p>
          <p className="modal-confirm-phrase">{CONFIRM_PHRASE}</p>
          <input
            className="modal-confirm-input"
            type="text"
            value={confirmText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmText(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            autoFocus
            disabled={isLoading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            취소
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={!canDelete}>
            {isLoading ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </div>
    </div>
  );
}
