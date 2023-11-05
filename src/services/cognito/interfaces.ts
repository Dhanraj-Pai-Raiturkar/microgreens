export interface SignupResponse {
  status: boolean;
  message: string;
  userSub?: string;
  userConfirmed?: boolean;
}

export interface SignupRequest {
  name: string;
  gender: 'Male' | 'Female';
  email: string;
  password: string;
}
