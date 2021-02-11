import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Company, User } from '../../interfaces/main';
import MyTableRow from '../common/my-wrappers/MyTableRow';
import { connect } from 'react-redux';
import { dialogActions } from '../../redux/actions';
import { CreateUser } from '../../interfaces/dialogs';
import MyIconButton from '../common/my-wrappers/MyIconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      margin: -12,
    },
  }),
);

interface Props {
  company: Company;
  users: User[];
  setDialogState(dialog: string, state: CreateUser): void;
}

function UsersTable(props: Props) {
  const classes = useStyles();

  const handleUserClick = (event: React.MouseEvent, data: User) => {
    props.setDialogState('addUser', { open: true, company: props.company, user: data });
  };

  const handleDeleteUserClick = (event: React.MouseEvent, data: User) => {
    event.stopPropagation();
    props.setDialogState('deleteUser', { open: true, user: data });
  };

  return (
    <Table>
      <TableBody>
        {props.users.map(user => (
          <MyTableRow key={user._id} hover handleClick={handleUserClick} data={user}>
            <TableCell>{user.name}</TableCell>
            <TableCell align="right">
              <MyIconButton handleClick={handleDeleteUserClick} data={user} className={classes.iconButton}>
                <DeleteIcon />
              </MyIconButton>
            </TableCell>
          </MyTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default connect(null, dialogActions)(UsersTable);
