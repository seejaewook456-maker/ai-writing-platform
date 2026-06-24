export type WorldSettingCategory =
  | 'COUNTRY'
  | 'RACE'
  | 'MAGIC'
  | 'ORGANIZATION'
  | 'PLACE'
  | 'EVENT'
  | 'ITEM'
  | 'RULE'
  | 'ETC';

export const CATEGORY_LABELS: Record<WorldSettingCategory, string> = {
  COUNTRY: '국가',
  RACE: '종족',
  MAGIC: '마법',
  ORGANIZATION: '조직',
  PLACE: '장소',
  EVENT: '사건',
  ITEM: '아이템',
  RULE: '규칙',
  ETC: '기타',
};

export interface WorldSetting {
  id: number;
  novelId: number;
  category: WorldSettingCategory;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorldSettingCreateRequest {
  category: WorldSettingCategory;
  title: string;
  content: string;
}

export interface WorldSettingUpdateRequest {
  category: WorldSettingCategory;
  title: string;
  content: string;
}
