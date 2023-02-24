import type {NextPage} from 'next'
import React, {useState} from 'react';
import {PasswordForgetForm, PasswordResetForm, AuthBasePage} from '@/page';

const Home: NextPage = () => {
  const [sendEmail, setSendEmail] = useState(false)
  return (
    <>
      <AuthBasePage title={sendEmail ? "リセット" : "パスワード忘れ"}>
        {
          sendEmail
            ? <PasswordResetForm/>
            : <PasswordForgetForm setSendEmail={setSendEmail}/>
        }
      </AuthBasePage>
    </>
  )
}

export default Home
