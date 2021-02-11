import Button from '@material-ui/core/Button';
import { ButtonProps } from '@material-ui/core/Button/Button';
import React, { ReactChild } from 'react';
import { Company } from '../../../interfaces/main';

interface Props extends ButtonProps {
  data: Company;
  children: ReactChild;
  handleClick(event: React.MouseEvent, data: Company): void;
}

function MyButton(props: Props) {
  const { children, handleClick, data, ...other } = props;
  const handleLocalClick = (event: React.MouseEvent) => {
    props.handleClick(event, props.data);
  };

  return (
    <Button {...other} onClick={handleLocalClick}>
      {children}
    </Button>
  );
}

export default MyButton;
