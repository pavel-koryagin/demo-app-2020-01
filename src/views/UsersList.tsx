import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '../model/User.model';
import { getUserRoleTitle, UserRole } from '../model/UserRole';

interface Props {
  users: User[],
  onDelete: (id: number) => void,
}

const UsersList: React.FC<Props> = ({
  users,
  onDelete,
}: Props) => {
  return (
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
            <IconButton edge="end" aria-label="delete" onClick={e => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
