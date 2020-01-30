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
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Meal, splitMealContents } from '../model/Meal.model';
import { useDialog } from '../widgets/DialogWidget';
import MealsListFilter  from './MealsListFilter';
import { MealsFilterDto } from '../dto/MealsFilterDto';
import { PaginationStatusDto } from '../dto/PaginationDto';
import Pagination from './Pagination';
import { CaloriesPerDay } from '../dto/MealsListDto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subHeader: {
      background: theme.palette.background.default,
    },
    date: {
      textAlign: 'right',
      width: 36,
      flex: 'none',
      paddingRight: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    good: {
      color: theme.palette.success.main,
    },
    bad: {
      color: theme.palette.error.main,
    },
  }),
);

interface Props {
  meals: Meal[],
  filter: MealsFilterDto,
  pagination: PaginationStatusDto,
  caloriesPerDay: CaloriesPerDay,
  dailyTarget: number,
  onSetPage: (page: number) => void,
  onFilter: (params: MealsFilterDto) => void,
  onCreate: () => void,
  onDelete: (id: number) => void,
}

const MealsList: React.FC<Props> = ({
  meals,
  filter,
  pagination,
  caloriesPerDay,
  dailyTarget,
  onSetPage,
  onFilter,
  onCreate,
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
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MealsListFilter {...filter} onChange={onFilter} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <List>
        {meals.length === 0 && <ListSubheader>No meals so far</ListSubheader>}
        {_map(byDate, (dateMeals, date) => (
          <React.Fragment key={date}>
            <ListSubheader>{moment(date).format('dddd, MMMM Do, YYYY')}</ListSubheader>
            {dateMeals.map(({ id, time, contents, calories }) => {
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
                    primary={calories}
                    primaryTypographyProps={{
                      className: dailyTarget >= (caloriesPerDay[date] || 0) ? classes.good : classes.bad,
                    }}
                    secondary={moment(time, 'HH:mm').format('h:mm a')}
                    classes={{ root: classes.date }}
                  />
                  <ListItemText
                    primary={title}
                    secondary={description + ' ' + dailyTarget + ' ' + caloriesPerDay[date] + ' ' + (dailyTarget <= (caloriesPerDay[date] || 0))}
                    secondaryTypographyProps={{
                      style: { whiteSpace: 'pre-line' }
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
      <Pagination {...pagination} onClick={onSetPage} />
      <Fab aria-label="Add" className={classes.fab} color="primary" onClick={e => onCreate()}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default MealsList;
