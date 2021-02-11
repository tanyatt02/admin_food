import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fetcher from '../api/fetcher';
import { FormattedMessage } from 'react-intl';
import { labels } from './common/intl/textfield-labels';
import { connect } from 'react-redux';
import { mainActions } from '../redux/actions';

const styles = theme => ({
  paper: {
    margin: '0 auto',
    marginTop: '20vh',
    width: 400,
    padding: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      marginTop: '10vh',
      width: `calc(100% - ${theme.spacing(2)}px)`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    [theme.breakpoints.only('xs')]: {
      width: `calc(100% - ${theme.spacing(1) * 6}px)`,
    },
  },
  buttonsContainer: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
});

class LoginPage extends React.Component {
  state = {
    name: '',
    password: '',
    passwordConf: '',
    signUp: false,
    errorMessage: null,
    snackbarProps: {},
  };

  handleChange = fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  };

  handleLogin = async () => {
    try {
      let response = await this.props.login(this.state.name, this.state.password);
      this.setState({ errorMessage: null });
      if (response.success) {
        this.props.history.replace('/');
      } else {
        this.setState({ errorMessage: response.message });
      }
    } catch (err) {
      const response = err.response ? err.response : {};
      const body = response.body ? response.body : {};
      const message = body.message ? body.message : 'unknown error';
      this.setState({ errorMessage: message });
    }
  };

  handleEnterPressed = event => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      if (this.state.signUp) {
        this.handleSignUp();
      } else {
        this.handleLogin();
      }
    }
  };

  handleSignUp = async () => {
    const data = {
      password: this.state.password,
      passwordConf: this.state.passwordConf,
      name: this.state.name,
    };
    try {
      await Fetcher.post('/auth/signup', data);
      this.setState({ signUp: false, errorMessage: null, errorType: undefined });
    } catch (err) {
      this.setState({
        errorType: err.error.type,
        snackbarProps: {
          open: true,
          message: err.response && err.response.body && err.response.body.message,
          icon: 'error',
        },
      });
    }
  };

  handleCloseSnackbar = () => {
    let snackbarProps = { ...this.state.snackbarProps, open: false };
    this.setState({ snackbarProps: snackbarProps });
  };

  handleToggleSignUp = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  render() {
    const { classes } = this.props;
    let usernameOccupied = this.state.errorType === 'name';
    let passwordLengthError = this.state.password && this.state.password.length < 4;
    let passwordsMatchError =
      !passwordLengthError &&
      this.state.signUp &&
      this.state.password &&
      this.state.passwordConf &&
      this.state.password !== this.state.passwordConf;
    let formError =
      passwordLengthError || passwordsMatchError || (this.state.signUp && this.state.passwordConf.length === 0);
    let passwordHelperText = passwordLengthError ? 'Should be at least 4 characters' : <span />;
    let usernameHelperText = usernameOccupied ? 'Name already taken' : <span />;
    let passwordConfHelperText = passwordsMatchError ? 'Passwords do not match' : <span />;

    return (
      <Paper className={classes.paper} onKeyPress={this.handleEnterPressed}>
        <div className={classes.heading}>
          <Typography variant="h4" gutterBottom>
            {this.state.signUp ? (
              <FormattedMessage id="loginPage.heading.signup" defaultMessage="Signup" />
            ) : (
              <FormattedMessage id="loginPage.heading.login" defaultMessage="Login" />
            )}
          </Typography>
        </div>
        <form id="solver-admin-login" className={classes.form}>
          <TextField
            id="solver-admin-name"
            variant="outlined"
            label={labels.userName}
            className={classes.textField}
            autoComplete="username"
            value={this.state.user}
            onChange={this.handleChange('name')}
            margin="normal"
            error={usernameOccupied || !!this.state.errorMessage}
            helperText={this.state.errorMessage || usernameHelperText}
          />
          <TextField
            id="solver-admin-password"
            variant="outlined"
            label={labels.password}
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            helperText={this.state.errorMessage || passwordHelperText}
            error={!!this.state.errorMessage}
          />
          {this.state.signUp && (
            <TextField
              id="solver-admin-password-conf"
              variant="outlined"
              label={labels.confirmPassword}
              className={classes.textField}
              type="password"
              value={this.state.passwordConf}
              onChange={this.handleChange('passwordConf')}
              helperText={passwordConfHelperText}
              margin="normal"
            />
          )}
          <div className={classes.buttonsContainer}>
            <Button className={classes.button} onClick={this.handleToggleSignUp}>
              {this.state.signUp ? (
                <FormattedMessage id="loginPage.button.login" defaultMessage="Login" />
              ) : (
                <FormattedMessage id="loginPage.button.signup" defaultMessage="Signup" />
              )}
            </Button>
            {!this.state.signUp && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleLogin}
                disabled={formError}
              >
                <FormattedMessage id="loginPage.button.login2" defaultMessage="Login" />
              </Button>
            )}
            {this.state.signUp && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleSignUp}
                disabled={!!formError}
              >
                <FormattedMessage id="loginPage.button.signup2" defaultMessage="Signup" />
              </Button>
            )}
          </div>
        </form>
      </Paper>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    mainActions,
  ),
)(LoginPage);
