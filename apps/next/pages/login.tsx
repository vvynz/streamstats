import { LoginPage } from 'app/features/login/loginpage'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </>
  )
}
