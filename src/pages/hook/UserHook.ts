import { UserApi, UserDTO } from '@jbwittner/bankwiz_openapi-client';
import { confBack, useApiRequestWithoutArgument } from './BaseHook';

const userApi = new UserApi(confBack);

const useGetUser = () => {
  const createUserRequest = () => userApi.getUser();
  return useApiRequestWithoutArgument<UserDTO>(createUserRequest);
};

export { useGetUser };
