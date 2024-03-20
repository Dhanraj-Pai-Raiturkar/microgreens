import {
  ApiResponse,
  CognitoUserResponse,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse
} from './interfaces';
import AWS from 'aws-sdk';
import config from '../config';

class CognitoServiceV2 {
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;
  constructor() {
    AWS.config.update({
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
      region: config.region
    });
    this.cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
  }
  signUp = async ({
    email,
    password,
    name,
    gender
  }: SignupRequest): Promise<SignupResponse> => {
    return new Promise((resolve, reject) => {
      try {
        console.log('V2 called!');
        const params: AWS.CognitoIdentityServiceProvider.Types.SignUpRequest = {
          ClientId: config.cognitoClientId!,
          Username: email,
          Password: password,
          UserAttributes: [
            {
              Name: 'name',
              Value: name
            },
            {
              Name: 'gender',
              Value: gender
            }
          ]
        };
        this.cognitoIdentityServiceProvider.signUp(
          params,
          (error, response) => {
            if (error) {
              console.error('CognitoServiceV2 signUp error', error);
              reject({ status: false, error });
            } else
              resolve({
                status: true,
                message: 'success',
                userSub: response?.UserSub,
                userConfirmed: response?.UserConfirmed
              });
          }
        );
      } catch (error) {
        console.error('CognitoServiceV2 signUp error', error);
        reject({ status: false, error });
      }
    });
  };
  confirmSignUp = async ({
    email,
    confirmationCode
  }: {
    email: string;
    confirmationCode: string;
  }): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      console.log('confirmSignUpV2 called!');
      try {
        const params = {
          ClientId: config.cognitoClientId!,
          ConfirmationCode: confirmationCode,
          Username: email
        };
        this.cognitoIdentityServiceProvider.confirmSignUp(params, (error) => {
          if (error) {
            console.error('CognitoServiceV2 confirmSignUp error', error);
            reject({ status: false, error });
          } else resolve({ status: true, message: 'success' });
        });
      } catch (error) {
        console.error('CognitoServiceV2 confirmSignUp error', error);
        reject({ status: false, error });
      }
    });
  };
  signIn = async ({
    email,
    password
  }: SigninRequest): Promise<SigninResponse> => {
    return new Promise((resolve, reject) => {
      console.log('signIn V2 called!');
      try {
        const params = {
          AuthFlow: config.cognitoSignInAuthFlow!,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password
          },
          ClientId: config.cognitoClientId!,
          UserPoolId: config.cognitoUserpoolId!
        };
        this.cognitoIdentityServiceProvider.adminInitiateAuth(
          params,
          (error, response) => {
            if (error) {
              console.error('CognitoServiceV2 signIn error', error);
              reject({ status: false, error });
            } else
              resolve({
                status: true,
                message: 'success',
                accessToken: response.AuthenticationResult!.AccessToken!,
                idToken: response.AuthenticationResult!.IdToken!,
                refreshToken: response.AuthenticationResult!.RefreshToken!
              });
          }
        );
      } catch (error) {
        console.error('CognitoServiceV2 signIn error', error);
        reject({ status: false, error });
      }
    });
  };
  getCognitoUser = async (email: string): Promise<CognitoUserResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const params = {
          UserPoolId: config.cognitoUserpoolId!,
          Username: email
        };
        this.cognitoIdentityServiceProvider.adminGetUser(
          params,
          (error, response) => {
            if (error) {
              console.error('CognitoServiceV2 signIn error', error);
              reject({ status: false, error });
            } else
              resolve({
                name: response.UserAttributes!.filter(
                  (attr) => attr.Name === 'name'
                )[0]!.Value!,
                gender: response.UserAttributes!.filter(
                  (attr) => attr.Name === 'gender'
                )[0]!.Value!,
                sub: response.Username!
              });
          }
        );
      } catch (error) {
        console.error('CognitoServiceV2 getCognitoUser error', error);
        reject({ status: false, error });
      }
    });
  };
  resendConfirmationCode = async (email: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      console.log('cognitoV2Service resendConfirmationCode called!');
      try {
        const params = {
          ClientId: config.cognitoClientId!,
          Username: email
        };
        this.cognitoIdentityServiceProvider.resendConfirmationCode(
          params,
          (error, response) => {
            if (error) {
              console.error(
                'CognitoServiceV2 resendConfirmationCode error',
                error
              );
              reject({ status: false, error });
            } else resolve({ status: true, message: 'success' });
          }
        );
      } catch (error) {
        console.error('CognitoServiceV2 resendConfirmationCode error', error);
        reject({ status: false, error });
      }
    });
  };
}

export default CognitoServiceV2;
