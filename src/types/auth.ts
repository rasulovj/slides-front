export type LoginFormValues = {
  name?: string;
  email: string;
  password: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
}
