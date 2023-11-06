import AWS from 'aws-sdk';
import type { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import {
  SignupResponse,
  SignupRequest,
  ConfirmSignupRequest,
  ApiResponse,
  SigninRequest,
  SigninResponse
} from './interfaces';
import config from '../../config';

export class CognitoService {
  cognitoService: CognitoIdentityServiceProvider;
  cognitoUserpool: CognitoUserPool;
  constructor() {
    this.cognitoService = new AWS.CognitoIdentityServiceProvider({
      region: 'us-east-1'
    });
    this.cognitoUserpool = new CognitoUserPool({
      UserPoolId: config.cognitoUserpoolId!,
      ClientId: config.cognitoClientId!
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
          ClientId: config.cognitoClientId!,
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

  confirmSignUp = async ({
    email,
    confirmationCode
  }: ConfirmSignupRequest): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const params: CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
          ClientId: config.cognitoClientId!,
          Username: email,
          ConfirmationCode: confirmationCode
        };
        this.cognitoService.confirmSignUp(params, (error: AWSError) => {
          if (error) {
            console.log('confirmSignUp error', error);
            reject(error);
          }
          resolve({
            status: true,
            message: 'Success'
          });
        });
      } catch (error) {
        console.log('CognitoService confirmSignUp error', error);
      }
    });
  };

  signIn = async ({
    email,
    password
  }: SigninRequest): Promise<SigninResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: this.cognitoUserpool
        });
        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            const idToken = result.getIdToken();
            const accessToken = result.getAccessToken();
            console.log(accessToken.payload.sub);
            const response: SigninResponse = {
              status: true,
              message: 'success',
              sub: idToken.payload.sub,
              name: idToken.payload.name,
              gender: idToken.payload.gender,
              accessToken: accessToken.getJwtToken()
            };
            resolve(response);
          },
          onFailure: (error) => {
            reject({
              status: false,
              message: error
            });
            console.log('CognitoService SignIn error', error);
          }
        });
      } catch (error) {
        console.log('CognitoService SignIn error', error);
      }
    });
  };
}
