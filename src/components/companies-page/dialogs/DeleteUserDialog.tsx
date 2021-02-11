import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { CreateUser, DeleteUser } from '../../../interfaces/dialogs';
import { RootState } from '../../../interfaces/root-state';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { dialogActions, companiesActions } from '../../../redux/actions';
import { DialogContentText } from '@material-ui/core';

interface StateProps {
  deleteUserDialog: DeleteUser;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    deleteUserDialog: state.dialogs.deleteUser,
  };
};

interface Props {
  deleteUserDialog: DeleteUser;
  setDialogState(dialog: string, state: CreateUser): void;
  deleteUser(id: string): void;
}

function DeleteUserDialog(props: Props) {
  const [name, setName] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleDelete();
    } else if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleDelete = () => {
    const user = props.deleteUserDialog.user;
    if (user) {
      const _id = user._id || '';
      props.deleteUser(_id);
      handleClose();
    }
  };

  const handleEnter = () => {
    if (props.deleteUserDialog.user) {
      setName(props.deleteUserDialog.user.name);
    }
  };

  const handleClose = () => {
    props.setDialogState('deleteUser', { open: false });
  };

  return (
    <Dialog
      onKeyDown={handleKeyPress}
      open={props.deleteUserDialog.open}
      onEnter={handleEnter}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        <FormattedMessage id="deleteUserDialog.title" defaultMessage="Delete user" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage
            id="deleteUserDialog.contentText"
            defaultMessage="Are you sure you want to delete {user}?"
            values={{
              user: (
                <b>
                  <i>{name}</i>
                </b>
              ),
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <FormattedMessage id="deleteUserDialog.buttons.close" defaultMessage="Close" />
        </Button>
        <Button color="primary" onClick={handleDelete}>
          <FormattedMessage id="deleteUserDialog.buttons.delete" defaultMessage="Delete" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  mapStateToProps,
  { ...dialogActions, ...companiesActions },
)(DeleteUserDialog);
