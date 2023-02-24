import React, {useState} from 'react';
import {useAuth} from '@/lib/cognito-auth';
import {Box, Button, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useAuthPage} from './AuthBasePage';

export const PasswordForgetForm: React.FC<{setSendEmail: (state: boolean) => void}> = (props) => {
  const auth = useAuth();
  const authPage = useAuthPage()
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      email: "",
    }
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const executeForgetPassword = async () => {
    const email = getValues("email")
    const result = await auth.forgetPassword(email);
    if (result.success) {
      props.setSendEmail(true)
    } else {
      setButtonDisabled(false)
      authPage.setIsError(true)
      authPage.setErrorMessage(result.message)
    }
  };

  const onSubmit = async () => {
    setButtonDisabled(true)
    authPage.setIsError(false)
    await executeForgetPassword();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({field}) => <TextField
            {...field}
            label="email"
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
            メール送信
          </Button>
        </Box>
      </form>
    </>
  )
}
