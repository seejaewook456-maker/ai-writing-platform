import type { ReactNode } from 'react';

interface CollapsibleFormCardProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function CollapsibleFormCard({ label, isOpen, onToggle, children }: CollapsibleFormCardProps) {
  if (!isOpen) {
    return (
      <button className="collapsible-trigger" onClick={onToggle} type="button">
        <span className="collapsible-trigger-icon">＋</span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="collapsible-form-card">
      <div className="collapsible-form-header">
        <span className="collapsible-form-title">{label}</span>
        <button className="collapsible-close-btn" onClick={onToggle} type="button">✕</button>
      </div>
      {children}
    </div>
  );
}
