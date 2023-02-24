import type {NextPage} from 'next'
import React, {useState} from 'react';
import {SignInForm, AuthBasePage, SignInCompleteForm} from '@/page';

const Home: NextPage = () => {
  const [signInCompleteRequired, setSignInCompleteRequired] = useState(false)
  return (
    <>
      <AuthBasePage title={"サインイン"}>
        {
          signInCompleteRequired
            ? <SignInCompleteForm/>
            : <SignInForm setSignInCompleteRequired={setSignInCompleteRequired}/>
        }

      </AuthBasePage>
    </>
  )
}

export default Home
