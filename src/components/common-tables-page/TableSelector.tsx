import React, { useRef, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { RootState } from '../../interfaces/root-state';
import { connect } from 'react-redux';
import { commonTablesActions } from '../../redux/actions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { CommonTable } from '../../interfaces/shared/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  }),
);

interface StateProps {
  tables: CommonTable[];
  currentTable: number;
}

const mapStateToProps = (state: RootState): StateProps => ({
  tables: state.commonTables.commonTables,
  currentTable: state.commonTables.currentTable,
});

interface Props extends StateProps {
  setCurrentTable(tableIndex: number): void;
}

function CompanySelector(props: Props) {
  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    if (inputLabel.current) {
    setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, []);

  const handleTableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setCurrentTable(event.target.value as number);
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          <FormattedMessage id="commonTableSelector.label" defaultMessage="Table"/>
        </InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={props.currentTable}
          onChange={handleTableChange}
          labelWidth={labelWidth}
        >
          {props.tables.map((table, index) =>
          <MenuItem key={index} value={index}>{table}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default connect(mapStateToProps, commonTablesActions)(CompanySelector)