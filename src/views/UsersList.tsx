import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '../model/User.model';
import { getUserRoleTitle, UserRole } from '../model/UserRole';
import { useDialog } from '../widgets/DialogWidget';
import Pagination from './Pagination';
import { PaginationStatusDto } from '../dto/PaginationDto';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

interface Props {
  pagination: PaginationStatusDto,
  users: User[],
  onSetPage: (page: number) => void,
  onCreate: () => void,
  onDelete: (id: number) => void,
}

const UsersList: React.FC<Props> = ({
  pagination,
  users,
  onSetPage,
  onCreate,
  onDelete,
}: Props) => {
  const classes = useStyles();
  const { confirm } = useDialog();

  return (
    <>
      <List>
        {users.map(({ id, firstName, lastName, email, role }) => (
          <ListItem key={id} button component={Link} to={`/users/${id}/`}>
            <ListItemText
              primary={firstName + ' ' + lastName}
              secondary={
                <>
                  {role !== UserRole.Regular
                    ? (
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {getUserRoleTitle(role)}
                        </Typography>
                        {' • '}
                      </>
                    )
                    : null
                  }
                  {email}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={e => confirm({
                text: `Delete ${email || 'the user'}?`,
                onOk: () => onDelete(id),
              })}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Pagination {...pagination} onClick={onSetPage} />
      <Fab aria-label="Add" className={classes.fab} color="primary" onClick={e => onCreate()}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default UsersList;
