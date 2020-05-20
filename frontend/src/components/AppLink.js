import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  linkBox: {
    backgroundColor: "#3587A4",
    margin: "1rem 0",
    borderRadius: '0.5rem',
    '&:hover': {
      backgroundColor: '#2f7087',
      background: 'radial-gradient(circle, rgba(47,112,135,1) 0%, rgba(39,89,107,1) 91%)',
    }
  },
  link: {
    fontSize: '1.5rem',
  }
}));

const AppLink = ({ text, to }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.linkBox} onClick={() => history.push(to)}>
      <Typography className={classes.link}>{text}</Typography>
    </Box>
  )
};

export default AppLink;
