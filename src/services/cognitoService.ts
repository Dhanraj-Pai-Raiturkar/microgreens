import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import {
  SignupResponse,
  SignupRequest,
  ApiResponse,
  SigninRequest,
  SigninResponse,
  ConfirmPasswordRequest
} from './interfaces';
import config from '../config';

export class CognitoService {
  cognitoUserpool: CognitoUserPool;
  cognitoUser?: CognitoUser;
  constructor() {
    this.cognitoUserpool = new CognitoUserPool({
      UserPoolId: config.cognitoUserpoolId!,
      ClientId: config.cognitoClientId!
    });
    this.cognitoUser;
  }

  getCognitoUser = async (email: string) => {
    return new Promise((resolve, reject) => {
      try {
        this.cognitoUser = new CognitoUser({
          Username: email,
          Pool: this.cognitoUserpool
        });
        resolve(this.cognitoUser.getUsername());
      } catch (error) {
        reject('user not found');
      }
    });
  };

  signUp = async ({
    email,
    password,
    name,
    gender
  }: SignupRequest): Promise<SignupResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const nameAttribute = new CognitoUserAttribute({
          Name: 'name',
          Value: name
        });
        const genderAttribute = new CognitoUserAttribute({
          Name: 'gender',
          Value: gender
        });
        this.cognitoUserpool.signUp(
          email,
          password,
          [nameAttribute, genderAttribute],
          [],
          (error, response) => {
            if (error) reject({ status: false, error });
            resolve({
              status: true,
              message: 'success',
              userSub: response?.userSub,
              userConfirmed: response?.userConfirmed
            });
          }
        );
      } catch (error) {
        console.log('CognitoService signUp error', error);
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
      try {
        const user = new CognitoUser({
          Username: email,
          Pool: this.cognitoUserpool
        });
        user.confirmRegistration(confirmationCode, false, (error, response) => {
          if (error) reject({ status: false, error });
          resolve({ status: true, message: 'success' });
        });
      } catch (error) {
        console.log('CognitoService confirmSignup error', error);
        reject({ status: false, error });
      }
    });
  };

  signIn = async ({
    email,
    password
  }: SigninRequest): Promise<SigninResponse> => {
    return new Promise((resolve, reject) => {
      try {
        this.getCognitoUser(email);
        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });
        this.cognitoUser!.authenticateUser(authenticationDetails, {
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

  resendConfirmationCode = async (email: string): Promise<ApiResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCognitoUser(email);
        this.cognitoUser!.resendConfirmationCode((error) => {
          if (error) reject({ status: false, error });
          resolve({ status: true, message: 'success' });
        });
      } catch (error) {
        console.log('CognitoService resendConfirmationCode error', error);
        reject({ status: false, message: 'failed' });
      }
    });
  };

  forgotPassword = async (email: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCognitoUser(email);
        this.cognitoUser!.forgotPassword({
          onSuccess: (data) => {
            resolve({
              status: true,
              message: `verification code sent: ${data?.CodeDeliveryDetails?.Destination}`
            });
          },
          onFailure: (error) => reject({ status: false, error })
        });
      } catch (error) {
        reject({ status: false, error });
        console.log('CognitoService forgotPassword error', error);
      }
    });
  };

  confirmPassword = async ({
    email,
    newPassword,
    verificationCode
  }: ConfirmPasswordRequest) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCognitoUser(email);
        this.cognitoUser!.confirmPassword(verificationCode, newPassword, {
          onSuccess: (data) => {
            resolve({
              status: true,
              message: data
            });
          },
          onFailure: (error) => reject({ status: false, error })
        });
      } catch (error) {
        reject({ status: false, error });
        console.log('CognitoService confirmPassword error', error);
      }
    });
  };
}
