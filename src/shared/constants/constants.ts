// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

export const EXPIRE_IN_JWT = '24h';
export const saltRounds = 10;
export const CACHE_TIME_TO_LIVE = 24 * 60 * 60 * 1000;
export const MAX_CACHE_ITEMS = 2000;
export const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;
export const USER_ROLE_ID = process.env.USER_ROLE_ID;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const USER_TEST_PASSWORD = process.env.USER_TEST_PASSWORD;
export const DEVERLOPER_PASSWORD = process.env.DEVERLOPER_PASSWORD;
export const REGISTER_USER_QUEUE_PROCESSOR = 'register_user_queue_processor';
export const REGISTER_USER_QUEUE_PROCESS = 'register_user_queue_process_name';
