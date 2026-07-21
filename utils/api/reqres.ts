import { config } from '../config';

export const REQRES_BASE_URL = config.reqresBaseUrl;

export function getReqResHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': config.reqresApiKey,
  };
}
