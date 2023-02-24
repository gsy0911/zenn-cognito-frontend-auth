import type {NextPage} from 'next'
import React, {useState} from 'react';
import {useAuth} from '@/lib/cognito-auth';
import {Header} from '@/model/Header';
import {Typography} from '@mui/material';

const Home: NextPage = () => {
  const auth = useAuth()
  return (
    <>
      <Header/>
      {
        auth.isAuthenticated
          ? <Typography variant={"h1"}>サインイン後</Typography>
          : <Typography variant={"h1"}>サインイン前</Typography>
      }
    </>
  )
}

export default Home
