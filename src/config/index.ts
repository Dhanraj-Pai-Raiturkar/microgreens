import dotenv from 'dotenv';

const env = dotenv.config();

// if (env.error) throw new Error('no .env file found');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const getConnectionString = () => {
  try {
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD ?? '');
    const connectionSrtring = process.env.MONGODB_CONNECTION_STRING?.split('@');
    return `${
      connectionSrtring?.[0] + password + '@' + connectionSrtring?.[1]
    }`;
  } catch (error) {
    console.error('config getConnectionString error', error);
    throw error;
  }
};

export default {
  port: process.env.PORT,
  logs: {
    morgan: process.env.MORGAN
  },
  cognitoUserpoolId: process.env.COGNITO_USERPOOL_ID,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
  cognitoRegion: process.env.COGNITO_REGION,
  mongoDbConnectionString: getConnectionString(),
  customerGroup: 'customer',
  adminGroup: 'admin'
};
