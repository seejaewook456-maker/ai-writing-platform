import type { Novel, NovelCreateRequest } from '../types/novel';
import { fetchWithAuth } from './fetchWithAuth';

export const getMyNovels = async (): Promise<Novel[]> => {
  const json = await fetchWithAuth<Novel[]>('/api/novels');
  return json.data!;
};

export const getNovel = async (novelId: number): Promise<Novel> => {
  const json = await fetchWithAuth<Novel>(`/api/novels/${novelId}`);
  return json.data!;
};

export const createNovel = async (body: NovelCreateRequest): Promise<Novel> => {
  const json = await fetchWithAuth<Novel>('/api/novels', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return json.data!;
};

export const deleteNovel = async (novelId: number): Promise<void> => {
  await fetchWithAuth(`/api/novels/${novelId}`, { method: 'DELETE' });
};
