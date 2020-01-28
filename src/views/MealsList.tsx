import React from 'react';
import { Link } from 'react-router-dom';
import _map from 'lodash/map';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Meal, splitMealContents } from '../model/Meal.model';
import { useDialog } from '../widgets/DialogWidget';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    date: {
      textAlign: 'right',
      width: 36,
      flex: 'none',
      paddingTop: '4px', // Match to Primary baseline
      paddingRight: theme.spacing(2),
    },
  }),
);

interface Props {
  meals: Meal[],
  onDelete: (id: number) => void,
}

const MealsList: React.FC<Props> = ({
  meals,
  onDelete,
}: Props) => {
  const classes = useStyles();
  const { confirm } = useDialog();

  const byDate: { [key: string]: Meal[] } = {};
  meals.forEach(meal => {
    byDate[meal.date] || (byDate[meal.date] = []);
    byDate[meal.date].push(meal);
  });

  return (
    <List>
      {_map(byDate, (dateMeals, date) => (
        <React.Fragment key={date}>
          <ListSubheader>{moment(date).format('dddd, MMMM Do, YYYY')}</ListSubheader>
          {dateMeals.map(({ id, time, contents }) => {
            const { title, description } = splitMealContents(contents);
            return (
              <ListItem
                key={id}
                button
                component={Link}
                to={`/meals/${id}/`}
                alignItems="flex-start"
              >
                <ListItemText
                  secondary={moment(time, 'HH:mm').format('h:mm a')}
                  classes={{ root: classes.date }}
                />
                <ListItemText
                  primary={title}
                  secondary={description}
                  secondaryTypographyProps={{
                    style: { whiteSpace: 'pre-line' } // TODO: Extract to a global class
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={e => confirm({
                    text: `Delete ${title || 'the meal'}?`,
                    onOk: () => onDelete(id),
                  })}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </React.Fragment>
      ))}
    </List>
  );
};

export default MealsList;
