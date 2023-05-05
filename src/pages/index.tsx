import Head from 'next/head';
import {
  Configuration,
  UserApi,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';
import { Button } from '@mui/material';
import { useCreateUser, useLoginUser } from './hook/AuthHook';

export default function Home() {
  const request22: UserSignupRequest = {
    firstName: 'Jean-Baptiste',
    lastName: 'WITTNER',
    email: 'jeanbaptiste.wittner@outlook.com',
    password: 'GreatPassWord2023',
  };

  const request: UserLoginRequest = {
    email: 'jeanbaptiste.wittner@outlook.com',
    password: 'GreatPassWord2023',
  };

  const { createUser } = useCreateUser();
  const { loginUser } = useLoginUser();

  const confBack: Configuration = new Configuration({
    baseOptions: {
      withCredentials: true,
    },
  });

  const userapi = new UserApi(confBack);

  const getUser = () => {
    userapi
      .getUser()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <title>Bankwizz</title>
      </Head>
      <main>
        <div>
          <Button onClick={() => createUser(request22)}>Registration</Button>
          <Button onClick={() => loginUser(request)}>Login</Button>
          <Button onClick={getUser}>Get User</Button>
        </div>
      </main>
    </>
  );
}
