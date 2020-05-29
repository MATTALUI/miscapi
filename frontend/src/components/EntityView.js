import React from 'react';
import get from 'lodash/get';

import {
  Box,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Paragraphs from './Paragraphs';

import AppEntityView from './AppEntityView';
import AppEndpointView from './AppEndpointView';
import TableOfContents from './TableOfContents';
import NodeEntityMapper from './NodeEntityMapper';

const useStyles = makeStyles(theme => ({
  container: {
    padding: "1rem",
  },
  dividers: {
    marginTop: '0.5rem',
    marginBottom: '2rem'
  },
}));

const EntityView = ({ entity }) => {
  const classes = useStyles();
  const intro = get(entity, 'intro', "");
  const entities = get(entity, 'entities', []);
  const nodes = get(entity, 'nodes', []);
  const endpoints = get(entity, 'endpoints', []);

  return (
    <Box className={classes.container}>
      <Typography variant="h2">{entity.title || entity.name}</Typography>
      {intro && <Paragraphs>{intro}</Paragraphs>}
      <TableOfContents entity={entity}/>
      {!!entities.length && (
        <>
          <Divider className={classes.dividers}/>
          <Typography id="entities" variant="h3">Entities</Typography>
          {entities.map((entity, i) => <AppEntityView key={i} entity={entity}/>)}
        </>
      )}
      {!!nodes.length && (
        <>
          <Divider className={classes.dividers}/>
          {nodes.map((node, i) => (<NodeEntityMapper key={i} node={node}/>))}
        </>
      )}
      {!!endpoints.length && (
        <>
          <Divider className={classes.dividers}/>
          <Typography id="api" variant="h3">API</Typography>
          {endpoints.map(endpoint => <AppEndpointView endpoint={endpoint}/>)}
        </>
      )}
    </Box>
  )
};

export default EntityView;
