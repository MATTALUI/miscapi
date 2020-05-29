import React from 'react';
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '1rem',
    fontSize: '0.7rem'
  },
  list: {
    margin: 0,
  }
}));

const TableOfContents = ({ entity }) => {
  const classes = useStyles();
  const entities = get(entity, 'entities', []);
  const nodes = get(entity, 'nodes', []);
  const endpoints = get(entity, 'endpoints', []);
  const displayContents = !!entities.length || !!nodes.length || !!endpoints.length;

  return (
    <Box className={classes.container}>
      {displayContents && (
        <>
          <Typography variant="h5">Contents</Typography>
          <ul className={classes.list}>
            {!!entities.length && (
              <>
                <li>
                  <Typography component="a" href="#entities">Entities</Typography>
                </li>
                <ul>
                  {entities.map(entity => (
                    <li>
                      <Typography component="a" href={`#entity-${entity.name}`}>{startCase(entity.name)}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!endpoints.length && (
              <>
                <li>
                  <Typography component="a" href="#api">API</Typography>
                </li>
                <ul>
                  {endpoints.map(endpoint => (
                    <li>
                      <Typography component="a" href={`#api-${endpoint.endpoint.replace(/\//gi,'-')}`}>{`${endpoint.method.toUpperCase()} ${endpoint.endpoint}`}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ul>
        </>
      )}
    </Box>
  )
};

export default TableOfContents;
