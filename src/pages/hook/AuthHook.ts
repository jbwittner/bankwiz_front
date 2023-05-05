import {
  AuthApi,
  UserDTO,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';
import { confBack, useApiRequestWithArguments } from './BaseHook';

const authapi = new AuthApi(confBack);

const useCreateUser = () => {
  const createUserRequest = (userSignupRequest: UserSignupRequest) =>
    authapi.createUser(userSignupRequest);
  return useApiRequestWithArguments<UserSignupRequest, UserDTO>(
    createUserRequest,
  );
};

const useLoginUser = () => {
  const loginUserRequest = (userLoginRequest: UserLoginRequest) =>
    authapi.loginUser(userLoginRequest);
  return useApiRequestWithArguments<UserLoginRequest, UserDTO>(
    loginUserRequest,
  );
};

export { useCreateUser, useLoginUser };
