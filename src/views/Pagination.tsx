import React from 'react';
import FlatPagination from 'material-ui-flat-pagination';
import { PaginationStatusDto } from '../dto/PaginationDto';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      textAlign: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(10), // We have to fit Fab below
    },
  }),
);

type Props = PaginationStatusDto & {
  onClick: (page: number) => void,
}

const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  totalSize,
  onClick,
}: Props) => {
  const classes = useStyles();

  return (
    <FlatPagination
      className={classes.pagination}
      centerRipple
      innerButtonCount={1}
      outerButtonCount={1}
      limit={pageSize}
      offset={page * pageSize}
      total={totalSize}
      onClick={(e, offset) => { onClick(Math.floor(offset / pageSize)) }}
    />
  );
};

export default Pagination;
