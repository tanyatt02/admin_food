import React, { useRef, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { RootState } from '../../interfaces/root-state';
import { Company } from '../../interfaces/main';
import { connect } from 'react-redux';
import { commonActions } from '../../redux/actions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  }),
);

interface StateProps {
  companies: Company[];
  currentCompany: string;
}

const mapStateToProps = (state: RootState): StateProps => ({
  companies: state.companiesPage.companies,
  currentCompany: state.common.currentCompany,
});

interface Props {
  companies: Company[];
  currentCompany: string;
  setCurrentCompany(id: string): void;
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

  const handleCompanyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setCurrentCompany(event.target.value as string);
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          <FormattedMessage id="companySelector.label" defaultMessage="Company"/>
        </InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={props.currentCompany}
          onChange={handleCompanyChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="notSelected">
            <em><FormattedMessage id="companySelector.notSelected" defaultMessage="Not selected"/></em>
          </MenuItem>
          {props.companies.map((company) =>
          <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default connect(mapStateToProps, commonActions)(CompanySelector)