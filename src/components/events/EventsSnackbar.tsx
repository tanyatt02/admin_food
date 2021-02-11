import Snackbar from '@material-ui/core/Snackbar';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { mainActions } from '../../redux/actions';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import SuccessIcon from '@material-ui/icons/CheckOutlined';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import { EventMessage, MessageType } from '../../interfaces/main';
import { RootState } from '../../interfaces/root-state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
    success: {
      color: green[400],
    },
    warning: {
      color: orange[400],
    },
    messageContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

interface StateProps {
  messages: EventMessage[];
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    messages: state.main.messages,
  };
};

interface Props {
  messages: EventMessage[];
  popSnack(): void;
}

function EventsSnackbar(props: Props) {
  const classes = useStyles();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [occupied, setOccupied] = useState(false);

  useEffect(() => {
    if (props.messages.length > 0 && !open && !occupied) {
      const messageEntry = props.messages[0];
      const message = messageEntry.message;
      let messageText = '';
      let messageIcon;
      if (messageEntry.type === MessageType.error) {
        messageText = typeof message === 'object' ? message.message : message;
        messageIcon = <WarningIcon className={classNames(classes.icon, classes.warning)} />;
      } else if (messageEntry.type === MessageType.success) {
        messageText = message;
        messageIcon = <SuccessIcon className={classNames(classes.icon, classes.success)} />;
      } else if (messageEntry.type === MessageType.warning) {
        messageText = message;
        messageIcon = <WarningIcon className={classNames(classes.icon, classes.warning)} />;
      }
      setMessage(
        <span className={classes.messageContainer}>
          {messageIcon}
          {messageText}
        </span>,
      );
      setOpen(true);
      setOccupied(true);
    }
  }, [props.messages, occupied, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    props.popSnack();
    setOccupied(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      message={message}
      onClose={handleClose}
      onExited={handleExited}
    />
  );
}

export default connect(
  mapStateToProps,
  { ...mainActions },
)(EventsSnackbar);
