import React from 'react';

import {
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';
import Paragraphs from './Paragraphs';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '2rem'
  },
}));

const SectionEntity = ({ section }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography component="h3" variant="h6">{section.header}</Typography>
      {section.text && <Paragraphs>{section.text}</Paragraphs>}
    </Box>
  );
}

export default SectionEntity;
