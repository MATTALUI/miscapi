import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import values from 'lodash/values';

import docStore from '../stateBuilder';
import { buildEntityUrl } from '../utils/urls';
import WithNavigation from './WithNavigation';
import EntityView from './EntityView';

const App = () => {
  const state = docStore.getState();
  const apps = get(state, 'apps', {});
  const overview = get(state, 'overview', {});
  const developing = get(state, 'developing', {});

  return (
    <Provider store={docStore}>
      <Router>
        <WithNavigation>
          <Switch>
              <Route exact path={buildEntityUrl(overview)} component={()=>(
                <EntityView entity={overview}/>
              )}/>
              {values(apps).map((app, i)=>(
                <Route exact path={buildEntityUrl(app)} component={()=>(
                  <EntityView entity={app} key={i}/>
                )}/>
              ))}
              <Route exact path={buildEntityUrl(developing)} component={()=>(
                <EntityView entity={developing}/>
              )}/>
              <Route component={()=>(<>Oh no! You've found a 404!</>)}/>
          </Switch>
        </WithNavigation>
      </Router>
    </Provider>
  );
}

export default App;
