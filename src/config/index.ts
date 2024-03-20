import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) throw new Error('no .env file found');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

export default {
  port: process.env.PORT,
  logs: {
    morgan: process.env.MORGAN
  },
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
  cognitoUserpoolId: process.env.COGNITO_USERPOOL_ID,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
  cognitoSignInAuthFlow: "ADMIN_NO_SRP_AUTH"
};
