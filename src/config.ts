import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, "../.env") });

export const config = {
	algorithms: ['HS256' as const],
	secret: 'secret',
};