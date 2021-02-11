import { GET_COMMON_TABLES, GET_COMMON_TABLE, SET_CURRENT_TABLE } from '../constants';
import { Action } from 'redux';
import { CommonTablesPage } from '../../interfaces/store-core';
import { CommonTablesPagePayload } from '../../interfaces/redux-payload';

interface CommonTablesPageAction extends Action {
  payload: CommonTablesPagePayload;
}

let initialState: CommonTablesPage = {
  commonTables: [],
  currentTable: +(localStorage.getItem('current-common-table') || 0),
  currentTableItems: [],
};

export default function commonReducer(commonTables = initialState, action: CommonTablesPageAction) {
  switch (action.type) {
    case GET_COMMON_TABLES:
      return Object.assign({}, commonTables, { commonTables: action.payload.commonTables });
    case GET_COMMON_TABLE:
      return Object.assign({}, commonTables, { currentTableItems: action.payload.tableItems || [] });
    case SET_CURRENT_TABLE: {
      localStorage.setItem('current-common-table', String(action.payload.tableIndex));
      return Object.assign({}, commonTables, { currentTable: action.payload.tableIndex });
    }
    default:
      return commonTables;
  }
}
