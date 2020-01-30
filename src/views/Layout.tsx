import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { User } from '../model/User.model';
import { UserRole } from '../model/UserRole';

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
  user: User | null,
  currentUrl: string,
  onLogout: () => void,
}

const Layout: React.FC<Props> = ({
  children,
  user,
  currentUrl,
  onLogout,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <AppBar position="static">
        <Toolbar>
          <Box style={{ flex: 1 }}>
            {user && <Typography>{user.firstName}</Typography>}
          </Box>

          {user
            ? (<>
              {(user.role === UserRole.Regular)
                && <NavItem title="My Profile" url="/profile/" currentUrl={currentUrl} />
              }
              {(user.role === UserRole.Manager || user.role === UserRole.Admin)
                && <NavItem title="Users" url="/users/" currentUrl={currentUrl} />
              }
              {(user.role === UserRole.Regular || user.role === UserRole.Admin)
                && <NavItem title="Meals" url="/" currentUrl={currentUrl} />
              }
              <Button color="inherit" onClick={e => onLogout()}>Logout</Button>
            </>)
            : (<>
              <NavItem title="Login" url="/login/" currentUrl={currentUrl} />
              <NavItem title="Sign Up" url="/register/" currentUrl={currentUrl} />
            </>)
          }
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" classes={{ root: classes.content }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
