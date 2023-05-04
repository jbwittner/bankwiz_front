import Head from 'next/head';
import {
  AuthApi,
  Configuration,
  UserApi,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';
import { Button } from '@mui/material';

export default function Home() {
  const confBack: Configuration = new Configuration({
    baseOptions: {
      withCredentials: true,
    },
  });

  const userapi = new UserApi(confBack);
  const authapi = new AuthApi(confBack);

  const registration = () => {
    const request: UserSignupRequest = {
      firstName: 'Jean-Baptiste',
      lastName: 'WITTNER',
      email: 'jeanbaptiste.wittner@outlook.com',
      password: 'GreatPassWord2023',
    };
    authapi
      .createUser(request)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const login = () => {
    const request: UserLoginRequest = {
      email: 'jeanbaptiste.wittner@outlook.com',
      password: 'GreatPassWord2023',
    };
    authapi
      .loginUser(request)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

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
          <Button onClick={registration}>Registration</Button>
          <Button onClick={login}>Login</Button>
          <Button onClick={getUser}>Get User</Button>
        </div>
      </main>
    </>
  );
}
