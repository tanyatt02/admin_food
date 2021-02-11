import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { CreateRaw } from '../../../interfaces/dialogs';
import { RootState } from '../../../interfaces/root-state';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { dialogActions, rawActions } from '../../../redux/actions';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 400
    },
  }),
);

interface StateProps {
  addRawDialog: CreateRaw;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addRawDialog: state.dialogs.addRaw,
  };
};

interface Props {
  addRawDialog: CreateRaw;
  setDialogState(dialog: string, state: CreateRaw): void;
  addRaw(name: string, price: number, companyId: string): Promise<void>;
  updateUser(name: string, password: string, userId: string): Promise<void>;
}

function CreateRawDialog(props: Props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

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

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSave = () => {
    const _id = props.addRawDialog.company ? props.addRawDialog.company._id : '';
    const companyId = _id || '';
    if (props.addRawDialog.rawName) {
      props.updateRaw(name, price, props.addRawDialog.company._id || '');
    } else {
      props.addRaw(name, price, companyId);
    }
    handleClose();
  };

  const handleEnter = () => {
    if (props.addRawDialog.rawName) {
      setName(props.addRawDialog.raw.name);
    }
  };

  const handleClose = () => {
    props.setDialogState('addRaw', { open: false });
  };

  return (
    <Dialog
      onKeyDown={handleKeyPress}
      open={props.addRawDialog.open}
      onEnter={handleEnter}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        {props.addRawDialog.rawName ? (
          <FormattedMessage id="createRawDialog.title.editRaw" defaultMessage="Edit raw" />
        ) : (
          <FormattedMessage id="createUserDialog.title" defaultMessage="Create raw" />
        )}
      </DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <TextField
            id="outlined-name"
            label={<FormattedMessage id="createRawDialog.textFieldLabel.rawName" defaultMessage="Raw name" />}
            className={classes.textField}
            value={name}
            onChange={handleNameChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password"
            label={<FormattedMessage id="createRawDialog.textFieldLabel.price" defaultMessage="Price" />}
            className={classes.textField}
            value={price}
            type="price"
            onChange={handlePriceChange}
            margin="normal"
            variant="outlined"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <FormattedMessage id="createRawDialog.buttons.close" defaultMessage="Close" />
        </Button>
        <Button color="primary" disabled={name === ''} onClick={handleSave}>
          {props.addRawDialog.rawName ? (
            <FormattedMessage id="createRawDialog.buttons.edit" defaultMessage="Edit" />
          ) : (
            <FormattedMessage id="createRawDialog.buttons.create" defaultMessage="Create" />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  { ...dialogActions, ...rawActions },
)(CreateRawDialog);
