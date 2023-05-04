import Head from 'next/head';
import Image from 'next/image';
import {
  AuthApi,
  Configuration,
  UserApi,
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';

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
        <title>Create Next App</title>
      </Head>
      <main>
        <div>
          <button onClick={registration}>Registration</button>
          <button onClick={login}>Login</button>
          <button onClick={getUser}>Get User</button>
        </div>
      </main>
    </>
  );
}
