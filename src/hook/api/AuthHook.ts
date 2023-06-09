import {
  AuthApi,
  UserDTO,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';
import {
  ApiError,
  ApiRequestOptions,
  ErrorCode,
  confBack,
  useApiRequestWithArguments,
} from './BaseHook';
import { toast } from 'react-toastify';

const authapi = new AuthApi(confBack);

function interpretLoginApiError(error: ApiError) {
  if (error.code === ErrorCode.ERR_BAD_REQUEST) {
    if (error.request.status === 403) {
      toast.error('Bad email / password');
    } else {
      toast.error('The request is incorrect or malformed.');
    }
  } else {
    toast.error(
      'An error has occurred. Please try again later. If the problem persists, please contact support.',
    );
  }
}

function interpretCreateApiError(error: ApiError) {
  if (error.code === ErrorCode.ERR_BAD_REQUEST) {
    toast.error('The request is incorrect or malformed.');
  } else {
    toast.error(
      'An error has occurred. Please try again later. If the problem persists, please contact support.',
    );
  }
}

const useCreateUser = (options: ApiRequestOptions<UserDTO> = {}) => {
  const createUserRequest = (userSignupRequest: UserSignupRequest) =>
    authapi.createUser(userSignupRequest);
  return useApiRequestWithArguments<UserSignupRequest, UserDTO>(
    createUserRequest,
    interpretCreateApiError,
    options,
  );
};

const useLoginUser = (options: ApiRequestOptions<UserDTO> = {}) => {
  const loginUserRequest = (userLoginRequest: UserLoginRequest) =>
    authapi.loginUser(userLoginRequest);
  return useApiRequestWithArguments<UserLoginRequest, UserDTO>(
    loginUserRequest,
    interpretLoginApiError,
    options,
  );
};

export { useCreateUser, useLoginUser };
