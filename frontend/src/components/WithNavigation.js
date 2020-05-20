import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
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
  }
}));

const WithNavigation = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const goHome = () => history.push('/');
  const name = useSelector(state => get(state, 'name', 'Docs Name'));

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Typography  className={classes.title} onClick={goHome} data-test="navigation__home-button">
            {name}
          </Typography>
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
