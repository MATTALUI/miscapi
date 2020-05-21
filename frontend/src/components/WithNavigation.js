import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
} from '@material-ui/core';

import AppLinks from './AppLinks';

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: "#3587A4",
    color: "ghostwhite",
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  contentContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    minHeight: '100vh',
  },
  linksContainer: {
    backgroundColor: '#88CCF1',
    paddingTop: '4rem',
  },
  content: {
    backgroundColor: '#C1DFF0',
    paddingTop: '4rem',
  },
  logo: {
    height: '3rem',
    cursor: 'pointer',
  }
}));

const WithNavigation = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const goHome = () => history.push('/');

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <img className={classes.logo} src={process.env.PUBLIC_URL + '/logo.png'} onClick={goHome} alt="miscapi-logo"/>
        </Toolbar>
      </AppBar>
      <Box className={classes.contentContainer}>
        <Box className={classes.linksContainer}>
          <AppLinks/>
        </Box>
        <Box className={classes.content}>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default WithNavigation;
