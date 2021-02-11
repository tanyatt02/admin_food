import { combineReducers } from 'redux';
import companiesPage from './companies-page';
import dialogs from './dialogs';
import main from './main';
import common from './common';
import rawsPage from './raws-page';
import commonTables from './common-tables-page';

const appReducer = combineReducers({
  companiesPage,
  dialogs,
  main,
  common,
  rawsPage,
  commonTables,
});

export default appReducer;
