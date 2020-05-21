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
  const main = useSelector(state => get(state, 'main', {}));
  const general = useSelector(state => get(state, 'general', {}));
  const apps = useSelector(state => get(state, 'apps', {}));
  const followup = useSelector(state => get(state, 'followup', {}));

  return (
    <Box className={classes.linksContainer}>
      {main && (<AppLink text={main.name} to={buildEntityUrl(main)}/>)}
      {values(general).map((entity, i) => <AppLink key={i} text={entity.name} to={buildEntityUrl(entity)}/>)}
      {!!main && !!values(general).length && <Divider/>}
      {values(apps).map((app, i) => <AppLink key={i} text={app.name} to={buildEntityUrl(app)}/>)}
      {!!values(followup).length && <Divider/>}
      {values(followup).map((entity, i) => <AppLink key={i} text={entity.name} to={buildEntityUrl(entity)}/>)}
    </Box>
  )
};

export default AppLinks;
