import AWS from 'aws-sdk';
import type { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { SignupResponse, SignupRequest } from './interfaces';

export class CognitoService {
  cognitoService: CognitoIdentityServiceProvider;
  constructor() {
    this.cognitoService = new AWS.CognitoIdentityServiceProvider({
      region: 'us-east-1'
    });
  }

  signUp = async ({
    name,
    gender,
    email,
    password
  }: SignupRequest): Promise<SignupResponse> => {
    return new Promise((resolve, reject) => {
      try {
        let data;
        const params: CognitoIdentityServiceProvider.SignUpRequest = {
          ClientId: process.env.COGNITO_CLIENT_ID!,
          Password: password,
          Username: email,
          UserAttributes: [
            {
              Name: 'gender',
              Value: gender
            },
            {
              Name: 'name',
              Value: name
            }
          ]
        };
        this.cognitoService
          .signUp(
            params,
            (
              error: AWSError,
              response: CognitoIdentityServiceProvider.SignUpResponse
            ) => {
              if (error) {
                console.log('signup error', error);
                data = {
                  status: false,
                  message: 'user sign-up failed'
                };
                reject(error);
              }
              console.dir(response);
              data = {
                status: true,
                message: 'user sign-up successful',
                userSub: response?.UserSub,
                userConfirmed: response?.UserConfirmed
              };
              resolve(data);
            }
          )
          .promise();
      } catch (error) {
        console.log('CognitoService signUp catch error', error);
      }
    });
  };

  signIn = async (): Promise<void> => {};
}
