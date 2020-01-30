import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: theme.palette.primary.dark,
    },
    page: {
      minHeight: '100vh',
      background: '#eee',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      paddingTop: theme.spacing(1),
      background: theme.palette.background.default,
      flex: 1,
    },
  }),
);

interface ItemProps {
  title: string,
  url: string,
  currentUrl: string,
}

const NavItem: React.FC<ItemProps> = ({
  title,
  url,
  currentUrl,
}: ItemProps) => {
  const classes = useStyles();

  return (
    <Button
      color="inherit"
      component={Link}
      to={url}
      classes={{ root: currentUrl === url ? classes.active : undefined }}
    >
      {title}
    </Button>
  );
}

interface Props {
  children?: ReactNode,
  currentUrl: string,
  onLogout: () => void,
}

const Layout: React.FC<Props> = ({
  children,
  currentUrl,
  onLogout,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <AppBar position="static">
        <Toolbar>
          <Box style={{ flex: 1 }} />

          <NavItem title="Login" url="/login/" currentUrl={currentUrl} />
          <NavItem title="Sign Up" url="/register/" currentUrl={currentUrl} />
          <Button color="inherit" component={Link} to="/restore-password/">Restore Password</Button>
          <Button color="inherit" component={Link} to="/restore-password/new/">New Password</Button>

          <NavItem title="Users" url="/users/" currentUrl={currentUrl} />
          <NavItem title="Meals" url="/" currentUrl={currentUrl} />
          <Button color="inherit" onClick={e => onLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" classes={{ root: classes.content }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
