export interface Character {
  id: number;
  novelId: number;
  name: string;
  role: string | null;
  age: number | null;
  personality: string | null;
  speechStyle: string | null;
  description: string | null;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterCreateRequest {
  name: string;
  role?: string;
  age?: number;
  personality?: string;
  speechStyle?: string;
  description?: string;
}

export interface CharacterUpdateRequest {
  name: string;
  role?: string;
  age?: number;
  personality?: string;
  speechStyle?: string;
  description?: string;
}
