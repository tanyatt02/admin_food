import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import React, { ReactChild } from 'react';

interface Props extends ExpansionPanelProps {
  data: string;
  children: ReactChild[];
  handleChange(event: React.ChangeEvent<{}>, isExpanded: boolean, data: string): void;
}

function MyExpansionPanel(props: Props) {
  const { children, handleChange, data, ...other } = props;

  const _handleChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    props.handleChange(event, isExpanded, data);
  };

  return (
    <ExpansionPanel {...other} onChange={_handleChange}>
      {children}
    </ExpansionPanel>
  );
}

export default MyExpansionPanel;
