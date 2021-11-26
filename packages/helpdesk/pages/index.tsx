import { useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import { logInValidationQuery } from '../utils/queries';
import { indexStyles } from '../utils/styles';

export default function Home() {
  const [employeeNumberInput, setEmployeeNumberInput] = useState('');
  const [employeePasswordInput, setEmployeePasswordInput] = useState('');
  const [wasClicked, setWasClicked] = useState(false);
  const router = useRouter();

  useQuery(logInValidationQuery, {
    variables: {
      employeeNumber: employeeNumberInput,
      employeePassword: employeePasswordInput,
    },
    onCompleted: (data) => {
      setWasClicked(false);
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      console.log('data after login: ', data);
      const destination =
        typeof router.query.returnTo === 'string' && router.query.returnTo
          ? router.query.returnTo
          : `/tickets`;

      router.push(destination);
    },
    onError: (error) => {
      setEmployeeNumberInput('');
      setEmployeePasswordInput('');
      setWasClicked(false);

      console.log('error: ', error.message);
    },
    skip: !wasClicked,
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <Head>
        <title>BlueJay Customer Support</title>
        <meta
          name="description"
          content="BlueJay - customer support software"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={indexStyles} className="cover-full-screen">
        <div>
          <img src="full_logo_transparent.png" alt="BlueJay logo" />
          <div>
            <h1>Customer Support</h1>
            <label htmlFor="employee_id">Employee ID</label>
            <input
              id="employee_id"
              name="employee_id"
              onChange={(e) => setEmployeeNumberInput(e.currentTarget.value)}
              value={employeeNumberInput}
              data-cy="employee-id-input"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={(e) => setEmployeePasswordInput(e.currentTarget.value)}
              value={employeePasswordInput}
              type="password"
              data-cy="employee-password-input"
            />
            <button
              onClick={() => setWasClicked(true)}
              data-cy="employee-login-button"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
