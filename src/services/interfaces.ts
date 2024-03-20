export interface SignupResponse extends ApiResponse {
  userSub?: string;
  userConfirmed?: boolean;
}

export interface SignupRequest {
  name: string;
  gender: 'Male' | 'Female';
  email: string;
  password: string;
}

export interface ApiResponse {
  status: boolean;
  message: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse extends ApiResponse {
  idToken: string;
  sub?: string;
  name?: string;
  gender?: string;
  accessToken: String;
  refreshToken: String;
}

export interface CognitoUserResponse {
  sub: string;
  name: string;
  gender: string;
}

export interface ConfirmPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
}
