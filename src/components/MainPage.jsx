import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import compose from 'recompose/compose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import Auth from '../api/auth';
import CompaniesPage from './companies-page/CompaniesPage';
import { FormattedMessage } from 'react-intl';
import AdminDrawer from './AdminDrawer';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import { mainActions } from '../redux/actions';
import RawPage from './raw-page/RawPage';
import CommonTablesPage from './common-tables-page/CommonTablesPage';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  userName: {
    marginRight: theme.spacing(2),
  },
});

const mapStateToProps = state => ({
  user: state.main.user,
});

class MainPage extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  handleMenuButtonClick = () => {
    this.props.toggleDrawer();
  };

  handleLogout = () => {
    Auth.deauthenticate();
    this.props.history.replace('/logout');
  };

  render() {
    const { classes } = this.props;
    let title = '';
    switch (this.props.location.pathname) {
      case '/companies':
        title = <FormattedMessage id="appBar.title.companies" defaultMessage="Companies" />;
        break;
      case '/raw':
        title = <FormattedMessage id="appBar.title.raw" defaultMessage="Raw" />;
        break;
      case '/common-tables':
        title = <FormattedMessage id="appBar.title.commonTables" defaultMessage="Common tables" />;
        break;
      default:
        title = <FormattedMessage id="appBar.title.default" defaultMessage="Administrator's interface" />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.grow}>
              {title}
            </Typography>
            <Typography className={classes.userName}>{this.props.user?.name}</Typography>
            <Tooltip title={<FormattedMessage id="appBar.tooltip.logout" defaultMessage="Logout" />}>
              <IconButton onClick={this.handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <AdminDrawer />
        <Switch>
          <Redirect exact from="/" to="/companies" />
          <Route path="/companies" component={CompaniesPage} />
          <Route path="/raw" component={RawPage} />
          <Route path='/common-tables' component={CommonTablesPage} />
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mainActions,
  ),
)(MainPage);
