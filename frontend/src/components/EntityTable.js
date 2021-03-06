import React from 'react';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    minHeight: '1rem',
    marginTop: '0.5rem'
  },
}));

const EntityTable = ({ data }) => {
  const classes = useStyles();
  const header = get(data, '0', []);
  const rows = data.slice(1);

  return (
    <Paper className={classes.container}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {header.map((item, i) => <TableCell key={i}>{startCase(item)}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((item, j) => <TableCell key={j}>{item.toString()}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default EntityTable;
