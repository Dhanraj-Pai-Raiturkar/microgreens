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
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {
  CognitoJwtVerifierProperties,
  CognitoJwtVerifierSingleUserPool
} from 'aws-jwt-verify/cognito-verifier';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

export class CognitoService {
  cognitoUserpool: CognitoUserPool;
  cognitoJwtVerifier: CognitoJwtVerifierSingleUserPool<CognitoJwtVerifierProperties>;
  cognitoUser?: CognitoUser;
  cognitoClient: CognitoIdentityServiceProvider;
  constructor() {
    this.cognitoUserpool = new CognitoUserPool({
      UserPoolId: config.cognitoUserpoolId!,
      ClientId: config.cognitoClientId!
    });
    this.cognitoUser;
    this.cognitoJwtVerifier = CognitoJwtVerifier.create({
      userPoolId: config.cognitoUserpoolId!
      // clientId: config.cognitoClientId,
      // tokenUse: 'access'
    });
    this.cognitoClient = new CognitoIdentityServiceProvider({
      region: config.cognitoRegion
    });
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
        console.log('CognitoService getCognitoUser error', error);
        reject({ status: false, error: 'user not found' });
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
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCognitoUser(email);
        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });
        this.cognitoUser!.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            const idToken: any = result.getIdToken();
            console.log('idToken', idToken);
            // const accessToken = result.getAccessToken();
            // const accessToken = result.getIdToken();
            // console.log(accessToken.payload.sub);
            const response: SigninResponse = {
              status: true,
              message: 'success',
              sub: idToken.payload.sub,
              name: idToken.payload.name,
              gender: idToken.payload.gender,
              groups: idToken?.payload?.['cognito:groups'],
              idToken: idToken.getJwtToken()
            };
            resolve(response);
          },
          onFailure: (error) => {
            reject({
              status: false,
              error
            });
            console.log('CognitoService SignIn error', error);
          }
        });
      } catch (error) {
        console.log('CognitoService SignIn error', error);
        reject({ status: false, error });
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
        console.log('CognitoService forgotPassword error', error);
        reject({ status: false, error });
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
        console.log('CognitoService confirmPassword error', error);
        reject({ status: false, error });
      }
    });
  };

  changePassword = async ({
    email,
    oldPassword,
    newPassword
  }: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getCognitoUser(email);
        await this.signIn({
          email,
          password: oldPassword
        });
        this.cognitoUser!.changePassword(oldPassword, newPassword, (error) => {
          if (error) reject({ status: false, error: error.message });
          resolve({ status: true, message: 'success' });
        });
      } catch (error) {
        console.log('CongnitoService changePassword error', error);
        reject({ status: false, error });
      }
    });
  };

  async assignGroup(username: string) {
    try {
      const params = {
        GroupName: config.customerGroup,
        UserPoolId: config.cognitoUserpoolId!,
        Username: username
      };
      this.cognitoClient.adminAddUserToGroup(params, (err, data) => {
        return new Promise((resolve, reject) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    } catch (error) {
      console.error('CongnitoService assignGroup error', error);
      throw error;
    }
  }
}
