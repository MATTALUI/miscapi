import React from 'react';
import { Typography } from '@material-ui/core';

const Paragraphs = ({ children }) => {
  const sections = children.split('\n');

  return sections.map(para => (<Typography>{para}</Typography>));
};

export default Paragraphs;
