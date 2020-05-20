import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import values from 'lodash/values';
import {
  Box,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { buildEntityUrl } from '../utils/urls';

import AppLink from './AppLink';

const useStyles = makeStyles(theme => ({
  linksContainer: {
    padding: "1rem",
    color: "ghostwhite",
    textAlign: "center",
    cursor: "pointer",
  },
}));

const AppLinks = () => {
  const classes = useStyles();
  const apps = useSelector(state => get(state, 'apps', {}));
  const overview = useSelector(state => get(state, 'overview', {}));
  const developing = useSelector(state => get(state, 'developing', {}));

  return (
    <Box className={classes.linksContainer}>
      {overview && (
        <>
          <AppLink text={overview.name} to={buildEntityUrl(overview)}/>
          <Divider/>
        </>
      )}
      {values(apps).map((app, i) => <AppLink key={i} text={app.name} to={buildEntityUrl(app)}/>)}
      {developing && (
        <>
          <Divider/>
          <AppLink text={developing.name} to={buildEntityUrl(developing)}/>
        </>
      )}
    </Box>
  )
};

export default AppLinks;
