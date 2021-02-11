import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { CreateCompany } from '../../../interfaces/dialogs';
import { RootState } from '../../../interfaces/root-state';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { dialogActions, companiesActions } from '../../../redux/actions';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 400,
    },
  }),
);

interface StateProps {
  addCompanyDialog: CreateCompany;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addCompanyDialog: state.dialogs.addCompany,
  };
};

interface Props {
  addCompanyDialog: CreateCompany;
  setDialogState(dialog: string, state: CreateCompany): void;
  addCompany(name: string): Promise<void>;
  updateCompany(name: string, id: string): Promise<void>;
}

function CreateCompanyDialog(props: Props) {
  const classes = useStyles();
  const [name, setName] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    } else if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEnter = () => {
    if (props.addCompanyDialog.company) {
      setName(props.addCompanyDialog.company.name);
    } else {
      setName('');
    }
  };

  const handleSave = () => {
    if (props.addCompanyDialog.company) {
      const company = props.addCompanyDialog.company;
      props.updateCompany(name, company._id || '');
    } else {
      props.addCompany(name);
    }
    handleClose();
  };

  const handleClose = () => {
    props.setDialogState('addCompany', { open: false });
  };

  const edit = !!props.addCompanyDialog.company;

  return (
    <Dialog
      onKeyDown={handleKeyPress}
      open={props.addCompanyDialog.open}
      onEnter={handleEnter}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        {edit ? (
          <FormattedMessage id="createCompanyDialog.title.edit" defaultMessage="Edit company" />
        ) : (
          <FormattedMessage id="createCompanyDialog.title" defaultMessage="Create company" />
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-name"
          label={<FormattedMessage id="createCompanyDialog.textFieldLabel.companyName" defaultMessage="Company name" />}
          className={classes.textField}
          value={name}
          onChange={handleNameChange}
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <FormattedMessage id="createCompanyDialog.buttons.close" defaultMessage="Close" />
        </Button>
        <Button color="primary" disabled={name === ''} onClick={handleSave}>
          {edit ? (
            <FormattedMessage id="createCompanyDialog.buttons.edit" defaultMessage="Edit" />
          ) : (
            <FormattedMessage id="createCompanyDialog.buttons.create" defaultMessage="Create" />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  mapStateToProps,
  { ...dialogActions, ...companiesActions },
)(CreateCompanyDialog);
