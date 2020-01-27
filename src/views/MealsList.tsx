import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Meal } from '../model/Meal.model';

interface Props {
  meals: Meal[],
}

const MealsList: React.FC<Props> = ({ meals }: Props) => {
  return (
    <List>
      {meals.map(({ id, time, contents }) => (
        <ListItem key={id}>
          <ListItemText
            primary={time + contents}
            // secondary="Text"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default MealsList;
