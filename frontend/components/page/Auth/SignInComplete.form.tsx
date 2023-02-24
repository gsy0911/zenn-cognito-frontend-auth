import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Button, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useAuth} from '@/lib/cognito-auth';
import {useAuthPage} from './AuthBasePage';

export const SignInCompleteForm: React.FC = () => {
  const auth = useAuth();
  const authPage = useAuthPage()
  const router = useRouter();
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: ""
    }
  });
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const executeSignInComplete = async () => {
    const username = auth.username;
    const oldPassword = getValues("oldPassword")
    const newPassword = getValues("newPassword")

    const result = await auth.signInComplete(username, oldPassword, newPassword);
    if (result.success) {
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
    await executeSignInComplete();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({field}) => <TextField
            {...field}
            type="password"
            label="oldPassword"
            variant="standard"
            fullWidth
            required
          />}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({field}) => <TextField
            {...field}
            type="password"
            label="newPassword"
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
            パスワード再設定
          </Button>
        </Box>
      </form>
    </>
  )
}
