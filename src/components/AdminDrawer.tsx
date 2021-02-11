import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import { mainActions } from '../redux/actions';
import { RootState } from '../interfaces/root-state';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

interface StateProps {
  drawerOpen: boolean;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    drawerOpen: state.main.drawerOpen,
  };
};

interface Props {
  drawerOpen: boolean;
  toggleDrawer(): void;
}

function AdminDrawer(props: Props) {
  const classes = useStyles();

  const pages = [
    { name: <FormattedMessage id="drawer.pages.companies" defaultMessage="Companies" />, address: 'companies' },
    { name: <FormattedMessage id="drawer.pages.raw" defaultMessage="Raw" />, address: 'raw' },
    { name: <FormattedMessage id="drawer.pages.commonTables" defaultMessage="Common tables" />, address: 'common-tables' },
  ];

  return (
    <Drawer open={props.drawerOpen} onClose={props.toggleDrawer}>
      <List className={classes.list}>
        {pages.map(page => (
          <ListItem
            button
            component={Link}
            to={`/${page.address.toLowerCase()}`}
            key={page.address}
            onClick={props.toggleDrawer}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default connect(
  mapStateToProps,
  { ...mainActions },
)(AdminDrawer);
