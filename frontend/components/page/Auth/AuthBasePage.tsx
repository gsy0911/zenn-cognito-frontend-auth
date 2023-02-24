import React, {createContext, useContext, useState} from 'react';
import {Alert, Avatar, Grid, Paper, Snackbar, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface UseAuthPage {
  setIsError: (state: boolean) => void
  setErrorMessage: (state: string) => void
}

const authPageContext = createContext({} as UseAuthPage);

export const useAuthPage = () => {
  return useContext(authPageContext);
};

export const AuthBasePage: React.FC<{ title: string, children: React.ReactNode }> = ({title, children}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const value = {
    setIsError,
    setErrorMessage
  }

  return (
    <>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
            width: "280px",
            m: "20px auto"
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Avatar sx={{bgcolor: teal[400]}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography variant={"h6"} sx={{m: "30px"}}>
              {title}
            </Typography>
          </Grid>
          <authPageContext.Provider value={value}>
            {children}
          </authPageContext.Provider>

        </Paper>
      </Grid>
      {/*メッセージ*/}
      <Snackbar open={isError} autoHideDuration={null}>
        <Alert onClose={() => setIsError(false)} severity="error" sx={{width: '100%'}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
