import { UserApi, UserDTO } from '@jbwittner/bankwiz_openapi-client';
import {
  ApiError,
  ApiRequestOptions,
  ErrorCode,
  confBack,
  useApiRequestWithoutArgument,
} from './BaseHook';
import { toast } from 'react-toastify';

const userApi = new UserApi(confBack);

function interpretGetUserApiError(error: ApiError) {
  if (error.code === ErrorCode.ERR_BAD_REQUEST) {
    toast.error('The request is incorrect or malformed.');
  } else {
    toast.error(
      'An error has occurred. Please try again later. If the problem persists, please contact support.',
    );
  }
}

const useGetUser = (options: ApiRequestOptions<UserDTO> = {}) => {
  const createUserRequest = () => userApi.getUser();
  return useApiRequestWithoutArgument<UserDTO>(
    createUserRequest,
    interpretGetUserApiError,
    options,
  );
};

export { useGetUser };
