import IconButton from '@material-ui/core/IconButton';
import { IconButtonProps } from '@material-ui/core/IconButton/IconButton';
import React, { forwardRef } from 'react';
import { User, Company } from '../../../interfaces/main';

interface Props extends IconButtonProps {
  data?: User | Company;
  dataId?: string;
  handleClick(
    event: React.MouseEvent,
    data?: User | Company,
    dataId?: string,
  ): void;
}

type Ref = HTMLButtonElement;

const MyIconButton = forwardRef<Ref, Props>((props, ref) => {
  const { handleClick, children, data, dataId, ...other } = props;
  const _handleClick = (event: React.MouseEvent) => {
    props.handleClick(event, props.data, props.dataId);
  };
  return (
    <IconButton ref={ref} {...other} onClick={_handleClick}>
      {children}
    </IconButton>
  );
});

export default MyIconButton;
