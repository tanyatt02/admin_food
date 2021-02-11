import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 800,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 56,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        paddingTop: 48,
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    container: {
      display: 'flex',
    },
    beforeLink: {
      marginRight: theme.spacing(1),
    },
  }),
);

function Page404() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        <FormattedMessage id="page404.title" defaultMessage="Page not found" />
      </Typography>
      <div className={classes.container}>
        <Typography className={classes.beforeLink}>
          <FormattedMessage id="page404.messageText" defaultMessage="Try to go" />
        </Typography>
        <Link to="/">
          <Typography>
            <FormattedMessage id="page404.homeLink" defaultMessage="home" />
          </Typography>
        </Link>
      </div>
      <Typography>
        <FormattedMessage
          id="page404.checkLink"
          defaultMessage="Or double check the link. Or contact the administrator :-)"
        />
      </Typography>
    </Container>
  );
}

export default Page404;
