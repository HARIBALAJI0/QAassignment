import { config } from '../../utils/config';

export const testUsers = {
  standard_user: {
    username: config.standardUserUsername,
    password: config.standardUserPassword,
  },
  locked_out_user: {
    username: config.lockedOutUserUsername,
    password: config.lockedOutUserPassword,
  },
};
