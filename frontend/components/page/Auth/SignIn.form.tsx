import React, {useState} from 'react';
import {useAuth} from '@/lib/cognito-auth';
import {useRouter} from 'next/router';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {useAuthPage} from './AuthBasePage';

export const SignInForm: React.FC<{setSignInCompleteRequired: (state: boolean) => void}> = ({setSignInCompleteRequired}) => {
  const auth = useAuth();
  const authPage = useAuthPage()
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const executeSignIn = async () => {
    const username = getValues("username")
    const password = getValues("password")
    const result = await auth.signIn(username, password);
    if (result.hasChallenge) {
      if (result.challengeName === "NEW_PASSWORD_REQUIRED") {
        setSignInCompleteRequired(true)
      }
    } else if (result.success) {
      await router.push({
        pathname: '/'
      });
    } else {
      setButtonDisabled(false)
      authPage.setIsError(true)
      authPage.setErrorMessage(result.message)
    }
  };

  const onSubmit = async () => {
    setButtonDisabled(true)
    authPage.setIsError(false)
    await executeSignIn();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({field}) => <TextField
            {...field}
            label="Username"
            variant="standard"
            fullWidth
            required
          />}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => <TextField
            {...field}
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
          />}
        />
        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={buttonDisabled}
          >
            サインイン
          </Button>
        </Box>
      </form>
      <Box mt={3}>
        <Typography variant="caption">
          <Link href="/password-forget">パスワードを忘れましたか？</Link>
        </Typography>
      </Box>
    </>
  )
}
