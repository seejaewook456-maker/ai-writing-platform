import type { WorldSettingCategory } from './worldsetting';

export interface WorldSettingNewInsights {
  content: string[];
}

export interface ExistingWorldSettingInfo {
  id: number;
  novelId: number;
  category: WorldSettingCategory;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorldSettingCandidate {
  category: WorldSettingCategory;
  title: string;
  content: string;
  evidence: string | null;
  isExistingSetting: boolean;
  matchedWorldSettingId: number | null;
  existingWorldSetting: ExistingWorldSettingInfo | null;
  newInsights: WorldSettingNewInsights | null;
}

export interface WorldSettingExtractionResult {
  episodeTitle: string;
  totalCount: number;
  candidates: WorldSettingCandidate[];
}
