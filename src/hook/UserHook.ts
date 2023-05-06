import { UserApi, UserDTO } from '@jbwittner/bankwiz_openapi-client';
import {
  ApiError,
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

const useGetUser = () => {
  const createUserRequest = () => userApi.getUser();
  return useApiRequestWithoutArgument<UserDTO>(
    createUserRequest,
    interpretGetUserApiError,
  );
};

export { useGetUser };
