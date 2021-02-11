import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { useIntl, FormattedMessage } from 'react-intl';
import { headings } from './intl/headings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from '../../interfaces/root-state';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { AnimalNutrient, Nutrient } from '../../interfaces/shared/model-interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    typography: {
      marginTop: theme.spacing(3),
    },
  }),
);

interface StateProps {
  tableItems: Array<AnimalNutrient | Nutrient>;
}

const mapStateToProps = (state: RootState): StateProps => ({
  tableItems: state.commonTables.currentTableItems,
});

function TableItemsList(props: StateProps) {
  const classes = useStyles();
  const intl = useIntl();

  if (props.tableItems.length === 0) {
    return (
      <div className={classes.root}>
        <Typography color="textSecondary" variant="h6" className={classes.typography}>
          <FormattedMessage id="commonTableItems.tableIsEmpty" defaultMessage="Table is empty" />
        </Typography>
      </div>
    );
  } else {
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{intl.formatMessage(headings.rawName)}</TableCell>
              <TableCell align="right">{intl.formatMessage(headings.price)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableItems.map(item => (
              <TableRow>
                <TableCell>{item.nutrientName}</TableCell>
                <TableCell align="right">{item.nutrientId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(TableItemsList);
