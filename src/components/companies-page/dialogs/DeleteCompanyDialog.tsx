import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DeleteCompany } from '../../../interfaces/dialogs';
import { RootState } from '../../../interfaces/root-state';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { dialogActions, companiesActions } from '../../../redux/actions';
import { DialogContentText } from '@material-ui/core';

interface StateProps {
  deleteCompanyDialog: DeleteCompany;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    deleteCompanyDialog: state.dialogs.deleteCompany,
  };
};

interface Props {
  deleteCompanyDialog: DeleteCompany;
  setDialogState(dialog: string, state: DeleteCompany): void;
  deleteCompany(id: string): void;
}

function DeleteCompanyDialog(props: Props) {
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
    const company = props.deleteCompanyDialog.company;
    if (company) {
      const _id = company._id || '';
      props.deleteCompany(_id);
      handleClose();
    }
  };

  const handleEnter = () => {
    if (props.deleteCompanyDialog.company) {
      setName(props.deleteCompanyDialog.company.name);
    }
  };

  const handleClose = () => {
    props.setDialogState('deleteCompany', { open: false, company: undefined });
  };

  return (
    <Dialog
      onKeyDown={handleKeyPress}
      open={props.deleteCompanyDialog.open}
      onEnter={handleEnter}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        <FormattedMessage id="deleteCompanyDialog.title" defaultMessage="Delete company" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage
            id="deleteCompanyDialog.contentText"
            defaultMessage="Are you sure you want to delete {company}?"
            values={{
              company: (
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
          <FormattedMessage id="deleteCompanyDialog.buttons.close" defaultMessage="Close" />
        </Button>
        <Button color="primary" onClick={handleDelete}>
          <FormattedMessage id="deleteCompanyDialog.buttons.delete" defaultMessage="Delete" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  mapStateToProps,
  { ...dialogActions, ...companiesActions },
)(DeleteCompanyDialog);
