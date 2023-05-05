import { useState } from 'react';
import {
  AuthApi,
  Configuration,
  UserDTO,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';

const confBack: Configuration = new Configuration({
  baseOptions: {
    withCredentials: true,
  },
});

const authapi = new AuthApi(confBack);

function useCreateUser() {
  const [data, setData] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const createUser = async (userSignupRequest: UserSignupRequest) => {
    setIsLoading(true);
    try {
      const response = await authapi.createUser(userSignupRequest);
      setData(response.data);
    } catch (err: any) {
      setError(err);
    }

    setIsLoading(false);
  };

  return { createUser, data, isLoading, error };
}

function useLoginUser() {
  const [data, setData] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const loginUser = async (userLoginRequest: UserLoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authapi.loginUser(userLoginRequest);
      setData(response.data);
    } catch (err: any) {
      setError(err);
    }

    setIsLoading(false);
  };

  return { loginUser, data, isLoading, error };
}

export { useCreateUser, useLoginUser };
