import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { CreateUser } from '../../../interfaces/dialogs';
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
  addUserDialog: CreateUser;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addUserDialog: state.dialogs.addUser,
  };
};

interface Props {
  addUserDialog: CreateUser;
  setDialogState(dialog: string, state: CreateUser): void;
  addUser(name: string, password: string, companyId: string): Promise<void>;
  updateUser(name: string, password: string, userId: string): Promise<void>;
}

function CreateCompanyDialog(props: Props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSave = () => {
    const _id = props.addUserDialog.company ? props.addUserDialog.company._id : '';
    const companyId = _id || '';
    if (props.addUserDialog.user) {
      props.updateUser(name, password, props.addUserDialog.user._id || '');
    } else {
      props.addUser(name, password, companyId);
    }
    handleClose();
  };

  const handleEnter = () => {
    if (props.addUserDialog.user) {
      setName(props.addUserDialog.user.name);
    }
  };

  const handleClose = () => {
    props.setDialogState('addUser', { open: false });
  };

  return (
    <Dialog
      onKeyDown={handleKeyPress}
      open={props.addUserDialog.open}
      onEnter={handleEnter}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        {props.addUserDialog.user ? (
          <FormattedMessage id="createUserDialog.title.editUser" defaultMessage="Edit user" />
        ) : (
          <FormattedMessage id="createUserDialog.title" defaultMessage="Create user" />
        )}
      </DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <TextField
            id="outlined-name"
            label={<FormattedMessage id="createUserDialog.textFieldLabel.userName" defaultMessage="User name" />}
            className={classes.textField}
            value={name}
            onChange={handleNameChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password"
            label={<FormattedMessage id="createUserDialog.textFieldLabel.password" defaultMessage="Password" />}
            className={classes.textField}
            value={password}
            type="password"
            onChange={handlePasswordChange}
            margin="normal"
            variant="outlined"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <FormattedMessage id="createCompanyDialog.buttons.close" defaultMessage="Close" />
        </Button>
        <Button color="primary" disabled={name === ''} onClick={handleSave}>
          {props.addUserDialog.user ? (
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
