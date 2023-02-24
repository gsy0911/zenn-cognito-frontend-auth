import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline, Container} from '@mui/material';
// MUI font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// CognitoAuth
import {ProvideAuth} from '@/lib/cognito-auth';

// https://jxnblk.github.io/hello-color/?c=39586e
// #c6a38a : #39586e
const theme = createTheme({
  palette: {
    primary: {
      main: "#c6a38a",
    },
    secondary: {
      main: "#39586e",
    },
    background: {
      default: "#39586e",
    },
    text: {primary: "#9d8d82"},
    info: {
      main: "#586e39"
    },
    error: {
      main: "#6e3958"
    },
    success: {
      main: "#396e4f"
    }
  },
});


export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ProvideAuth>
          <Container maxWidth={"md"}>
            <Component {...pageProps} />
          </Container>
        </ProvideAuth>
      </ThemeProvider>
    </>
  )
}
