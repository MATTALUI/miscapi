import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  linkBox: {
    backgroundColor: '#3587A4',
    margin: "1rem 0",
    borderRadius: '0.5rem',
    '&:hover': {
      backgroundColor: '#2f7087',
      background: 'radial-gradient(circle, rgba(47,112,135,1) 0%, rgba(39,89,107,1) 91%)',
    }
  },
  link: {
    fontSize: '1.5rem',
  },
  selected: {
    backgroundColor: '#C1DFF0',
    color: '#1C3144'
  }
}));

const AppLink = ({ text, to }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const classes = useStyles({
    match: to === pathname,
  });

  return (
    <Box className={classnames(classes.linkBox, {
      [classes.selected]: to === pathname,
    })} onClick={() => history.push(to)}>
      <Typography className={classes.link}>{text}</Typography>
    </Box>
  )
};

export default AppLink;
