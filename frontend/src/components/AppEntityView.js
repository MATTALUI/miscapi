import React from 'react';
import { buildEntityAttributesTable } from '../utils/tables';
import get from 'lodash/get';

import {
  Box,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

import Note from './Note';
import EntityTable from './EntityTable';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '2rem'
  }
}));

const AppEntityView = ({ entity }) => {
  const classes = useStyles();
  const attributes = get(entity, 'attributes', {});
  const attributeTableData = buildEntityAttributesTable(attributes);

  return (
    <Box id={`entity-${entity.name}`} className={classes.container}>
      <Typography variant="h4">{entity.name}</Typography>
      <Typography>{entity.explanation}</Typography>
      {entity.note && <Note>{entity.note}</Note>}
      {!!attributeTableData.length && <EntityTable data={attributeTableData}/>}
    </Box>
  );
};

export default AppEntityView;
