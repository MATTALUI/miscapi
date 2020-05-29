import React from 'react';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import get from 'lodash/get';
import values from 'lodash/values';
import concat from 'lodash/concat';

import docStore from '../stateBuilder';
import { buildEntityUrl } from '../utils/urls';
import WithNavigation from './WithNavigation';
import EntityView from './EntityView';

const App = () => {
  const state = docStore.getState();
  const main = get(state, 'main', {});
  const general = get(state, 'general', {});
  const apps = get(state, 'apps', {});
  const followup = get(state, 'followup', {});
  const allEntities = concat(values(general), values(apps), values(followup));

  return (
    <Provider store={docStore}>
      <Router>
        <WithNavigation>
          <Switch>
              <Route exact path={buildEntityUrl(main)} component={()=>(
                <EntityView entity={main}/>
              )}/>
              {allEntities.map((entity, i)=>(
                <Route key={i} exact path={buildEntityUrl(entity)} component={()=>(
                  <EntityView entity={entity}/>
                )}/>
              ))}
              <Route component={()=>(<>Oh no! You've found a 404!</>)}/>
          </Switch>
        </WithNavigation>
      </Router>
    </Provider>
  );
}

export default App;
