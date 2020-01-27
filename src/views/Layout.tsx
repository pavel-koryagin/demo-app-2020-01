import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

interface Props {
  children?: ReactNode,
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box style={{ flex: 1 }} />
          <Button color="inherit">Users</Button>
          <Button color="inherit">Meals</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {children}
      </Container>
    </>
  );
};

export default Layout;
