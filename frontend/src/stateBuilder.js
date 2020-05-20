import { createStore } from 'redux';
import docs from './docs';

export default createStore(
  () => docs,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
