import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  saucedemoBaseUrl: process.env.SAUCEDEMO_BASE_URL ?? 'https://www.saucedemo.com',
  standardUserUsername: process.env.STANDARD_USER ?? 'standard_user',
  standardUserPassword: process.env.STANDARD_PASSWORD ?? 'secret_sauce',
  lockedOutUserUsername: process.env.LOCKED_OUT_USER ?? 'locked_out_user',
  lockedOutUserPassword: process.env.LOCKED_OUT_PASSWORD ?? 'secret_sauce',
  reqresBaseUrl: process.env.REQRES_BASE_URL ?? 'https://reqres.in',
  reqresApiKey: process.env.REQRES_API_KEY ?? 'free_user_3FfrhuCdoIOuAZa2CEnGyxgRUHK',
};
