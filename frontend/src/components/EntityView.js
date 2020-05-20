import React from 'react';

import {
  Box,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: "1rem",
  }
}));

const EntityView = ({ entity }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h1">{entity.title || entity.name}</Typography>
      <Typography>Coming Soon</Typography>
    </Box>
  )
};

export default EntityView;
