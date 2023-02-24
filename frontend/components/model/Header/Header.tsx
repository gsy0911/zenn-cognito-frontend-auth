import React from 'react';
import Link from 'next/link';
import {AppBar, Toolbar, Button, Box, IconButton, Typography, Tooltip, Avatar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from '@/lib/cognito-auth';

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const {title} = props;
  const auth = useAuth()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link href={"/"} passHref>
            <Button size={"small"} color={"secondary"}>zenn-example</Button>
          </Link>
          <Typography variant={"button"}>
            {title ? ` > ${title}` : null}
          </Typography>

          <Box sx={{flexGrow: 1}}/>
          <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
            <Link href={"/signin"}>
              <Tooltip title="サインイン">
                <IconButton size="large">
                  <AccountCircleIcon/>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
}
