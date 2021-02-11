import { Route, Switch, Redirect } from 'react-router';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import Auth from '../api/auth';
import Page404 from './common/Page404';
import EventsSnackbar from './events/EventsSnackbar';

const Routes = () => {
  const authenticateRoute = () => {
    if (Auth.isAuthenticated()) {
      return <MainPage />;
    }
    return <Redirect to="/login" />;
  };
  return (
    <Fragment>
      <EventsSnackbar />
      <Switch>
        <Route path="/" exact render={authenticateRoute} />
        <Route path="/companies" render={authenticateRoute} />
        <Route path="/raw" render={authenticateRoute} />
        <Route path="/common-tables" render={authenticateRoute} />
        <Route path="/login" component={LoginPage} />
        <Route
          path="/logout"
          render={props => {
            Auth.deauthenticate();

            // change the current URL to /
            props.history.push('/');
            return <span>Loading...</span>;
          }}
        />
        <Route component={Page404} />
      </Switch>
    </Fragment>
  );
};

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
