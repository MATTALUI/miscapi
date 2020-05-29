import React from 'react';
import { buildEndpointTableData } from '../utils/tables';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';

import {
  Box,
  makeStyles,
} from '@material-ui/core';

import EntityTable from './EntityTable';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '3rem'
  }
}));

const AppEndpointView = ({ endpoint }) => {
  const classes = useStyles();
  const endpointTableData = buildEndpointTableData(endpoint);

  return (
    <Box id={`api-${endpoint.endpoint.replace(/\//gi,'-')}`} className={classes.container}>
      <EntityTable data={endpointTableData}/>
      <JSONPretty data={endpoint.exampleResponse} theme={JSONPrettyMon}></JSONPretty>
    </Box>
  )
}

export default AppEndpointView;
