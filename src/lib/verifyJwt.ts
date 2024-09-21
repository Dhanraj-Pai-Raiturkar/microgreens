import { CognitoJwtVerifier } from 'aws-jwt-verify';
import config from '../config';

const verify = async (token: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: config.cognitoUserpoolId!,
        clientId: config.cognitoClientId,
        tokenUse: 'id'
      });
      const response = await verifier.verify(token, {
        clientId: config?.cognitoClientId!
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export { verify };
