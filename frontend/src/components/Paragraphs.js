import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  spaceBottom: {
    marginBottom: "1rem",
  },
}));

const Paragraphs = ({ children }) => {
  const classes = useStyles();
  const sections = children.split('\n');

  return sections.map((para, i) => (
    <Typography key={i} className={classes.spaceBottom}>{para}</Typography>
  ));
};

export default Paragraphs;
