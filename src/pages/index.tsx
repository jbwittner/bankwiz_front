import Head from 'next/head';
import {
  UserLoginRequest,
  UserSignupRequest,
} from '@jbwittner/bankwiz_openapi-client';
import { Button } from '@mui/material';
import { useCreateUser, useLoginUser } from '../hook/AuthHook';
import { useGetUser } from '../hook/UserHook';

export default function Home() {
  const userSignupRequest: UserSignupRequest = {
    firstName: 'Jean-Baptiste',
    lastName: 'WITTNER',
    email: 'jeanbaptiste.wittner@outlook.com',
    password: 'GreatPassWord2023',
  };

  const userLoginRequest: UserLoginRequest = {
    email: 'jeanbaptiste.wittner@outlook.com',
    password: 'GreatPassWord2023',
  };

  const { sendRequest: createUser } = useCreateUser();
  const { sendRequest: loginUser } = useLoginUser();
  const { sendRequest: getUser } = useGetUser();

  return (
    <>
      <Head>
        <title>Bankwizz</title>
      </Head>
      <main>
        <div>
          <Button onClick={() => createUser(userSignupRequest)}>
            Registration
          </Button>
          <Button onClick={() => loginUser(userLoginRequest)}>Login</Button>
          <Button onClick={() => getUser()}>Get User</Button>
        </div>
      </main>
    </>
  );
}
