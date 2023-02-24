import type {NextPage} from 'next'
import React from 'react';
import {PasswordChangeForm, AuthBasePage} from '@/page';

const Home: NextPage = () => {
  return (
    <>
      <AuthBasePage title={"パスワード変更"}>
        <PasswordChangeForm/>
      </AuthBasePage>
    </>
  )
}

export default Home
