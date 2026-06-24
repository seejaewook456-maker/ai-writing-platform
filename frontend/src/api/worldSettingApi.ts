import type { WorldSetting, WorldSettingCreateRequest, WorldSettingUpdateRequest } from '../types/worldsetting';
import { fetchWithAuth } from './fetchWithAuth';

export const getWorldSettings = async (novelId: number): Promise<WorldSetting[]> => {
  const json = await fetchWithAuth<WorldSetting[]>(`/api/novels/${novelId}/world-settings`);
  return json.data!;
};

export const createWorldSetting = async (novelId: number, body: WorldSettingCreateRequest): Promise<WorldSetting> => {
  const json = await fetchWithAuth<WorldSetting>(`/api/novels/${novelId}/world-settings`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return json.data!;
};

export const updateWorldSetting = async (worldSettingId: number, body: WorldSettingUpdateRequest): Promise<WorldSetting> => {
  const json = await fetchWithAuth<WorldSetting>(`/api/world-settings/${worldSettingId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return json.data!;
};

export const deleteWorldSetting = async (worldSettingId: number): Promise<void> => {
  await fetchWithAuth(`/api/world-settings/${worldSettingId}`, { method: 'DELETE' });
};
