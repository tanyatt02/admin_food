import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { useIntl, FormattedMessage } from 'react-intl';
import { headings } from './intl/headings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RawItem } from '../../interfaces/raws-page';
import { RootState } from '../../interfaces/root-state';
import { connect } from 'react-redux';
import { rawActions } from '../../redux/actions';
import { Typography } from '@material-ui/core';

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
  raws: RawItem[];
  currentCompany: string;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    raws: state.rawsPage.raws,
    currentCompany: state.common.currentCompany,
  };
};

interface Props {
  raws: RawItem[];
  currentCompany: string;
  getRawsList(companyId: string): Promise<void>;
}

function RawList(props: Props) {
  const classes = useStyles();
  const intl = useIntl();

  useEffect(() => {
    props.getRawsList(props.currentCompany);
  }, [props.currentCompany]);
  if (props.raws.length === 0) {
    return (
      <div className={classes.root}>
        <Typography color="textSecondary" variant="h6" className={classes.typography}>
          <FormattedMessage id="rawsTable.noRawsYet" defaultMessage="No raws found" />
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
            {props.raws.map(raw => (
              <TableRow>
                <TableCell>{raw.rawName}</TableCell>
                <TableCell align="right">{raw.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  rawActions,
)(RawList);
