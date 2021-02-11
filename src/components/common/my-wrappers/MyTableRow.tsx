import TableRow from '@material-ui/core/TableRow';
import { TableRowProps } from '@material-ui/core/TableRow/TableRow';
import React, { forwardRef } from 'react';
import { User } from '../../../interfaces/main';

interface Props extends TableRowProps {
  data: User;
  handleClick?(event: React.MouseEvent, data?: User): void;
}

type Ref = HTMLButtonElement;

const MyTableRow = forwardRef<Ref, Props>((props, ref) => {
  const { handleClick, children, data, ...other } = props;
  const _handleClick = (event: React.MouseEvent) => {
    if (props.handleClick) {
      props.handleClick(event, props.data);
    }
  };
  return (
    <TableRow ref={ref} {...other} onClick={_handleClick}>
      {children}
    </TableRow>
  );
});

export default MyTableRow;
