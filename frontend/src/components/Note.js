import React from 'react';

import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(themer => ({
  container: {
    marginTop: '0.5rem',
  },
  bold: {
    fontWeight: 'bold'
  },
}));

const Note = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.container}>
      <Typography component="span" className={classes.bold}>
        NOTE:&nbsp;
      </Typography>
      <Typography component="span" dangerouslySetInnerHTML={{__html: children}}/>
    </Typography>
  )
}

export default Note;
