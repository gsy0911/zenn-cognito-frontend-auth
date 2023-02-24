import React, {useState} from 'react';
import {useAuth} from '@/lib/cognito-auth';
import {useRouter} from 'next/router';
import {Box, Button, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useAuthPage} from './AuthBasePage';

export const PasswordResetForm: React.FC = () => {
  const auth = useAuth();
  const authPage = useAuthPage()
  const router = useRouter();
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      code: "",
      newPassword: "",
      newPasswordConfirm: ""
    }
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)


  const executeResetPassword = async () => {
    const username = auth.username;
    const code = getValues("code")
    const newPassword = getValues("newPassword")
    const newPasswordConfirm = getValues("newPasswordConfirm")
    const result = await auth.resetPassword(username, code, newPassword, newPasswordConfirm);
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
    await executeResetPassword();
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="code"
          control={control}
          render={({field}) => <TextField
            {...field}
            label="code"
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
        <Controller
          name="newPasswordConfirm"
          control={control}
          render={({field}) => <TextField
            {...field}
            type="password"
            label="newPasswordConfirm"
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
