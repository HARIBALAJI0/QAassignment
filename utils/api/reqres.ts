import process from 'process';

export const REQRES_BASE_URL = 'https://reqres.in';

export function getReqResHeaders() {
  const apiKey = process.env.REQRES_API_KEY ?? 'free_user_3FfrhuCdoIOuAZa2CEnGyxgRUHK';

  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };
}
