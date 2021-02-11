import Fab, { FabProps } from '@material-ui/core/Fab';
import { Theme, useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import React from 'react';

function MyFab(props: FabProps) {
  const theme: Theme = useTheme();
  const [showFab, setShowFab] = React.useState(true);
  const { children, hidden, ...rest } = props;

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  React.useEffect(() => {
    function trackScrolling() {
      const hitBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight && window.scrollY > 0;
      if (hitBottom && showFab) {
        setShowFab(false);
      } else if (!hitBottom && !showFab) {
        setShowFab(true);
      }
    }

    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  });

  return (
    <Zoom in={!hidden && showFab} timeout={transitionDuration} unmountOnExit={true}>
      <Fab {...rest}>{children}</Fab>
    </Zoom>
  );
}

MyFab.propTypes = {
  theme: PropTypes.object,
  hidden: PropTypes.bool,
  children: PropTypes.object,
};

export default MyFab;
