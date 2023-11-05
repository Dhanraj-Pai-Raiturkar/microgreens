import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) throw new Error('no .env file found');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

export default {
  port: process.env.PORT,
  logs: {
    morgan: process.env.MORGAN
  }
};
