import React, {useState} from 'react';
import {useAuth} from '@/lib/cognito-auth';
import {useRouter} from 'next/router';
import {Box, Button, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useAuthPage} from './AuthBasePage';

export const PasswordChangeForm: React.FC = () => {
  const auth = useAuth();
  const authPage = useAuthPage()
  const router = useRouter();
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: ""
    }
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)


  const executeChangePassword = async () => {
    const user = await auth.currentAuthenticatedUser()
    const oldPassword = getValues("oldPassword")
    const newPassword = getValues("newPassword")
    const newPasswordConfirm = getValues("newPasswordConfirm")

    const result = await auth.changePassword(user, oldPassword, newPassword, newPasswordConfirm);
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
    await executeChangePassword();
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
