import { Dispatch } from 'redux';
import Fetcher from '../../api/fetcher';
import {
  GET_COMMON_TABLES,
  GET_COMMON_TABLE,
  SET_CURRENT_TABLE,
  IMPORT_COMMON_TABLE,
  EXPORT_COMMON_TABLE,
  ADD_SNACK,
} from '../constants';
import { CommonTable } from '../../interfaces/shared/api';

const getCommonTables = () => async (dispatch: Dispatch): Promise<CommonTable[]> => {
  try {
    const response = await Fetcher.get('/api/common-tables');
    dispatch({ type: GET_COMMON_TABLES, payload: { commonTables: response.commonTables } });
    return Promise.resolve(response.commonTables);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const getCommonTable = (table: CommonTable) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.get('/api/common-table', `?table=${table}`);
    dispatch({ type: GET_COMMON_TABLE, payload: { tableItems: response.tableItems } });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const setCurrentTable = (tableIndex: number) => ({ type: SET_CURRENT_TABLE, payload: { tableIndex } });

const exportCommonTable = (table: CommonTable) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await Fetcher.getBlob('/api/common-table-xlsx', `?table=${table}`);
    dispatch({ type: EXPORT_COMMON_TABLE, payload: response });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

export default {
  getCommonTables,
  getCommonTable,
  setCurrentTable,
  exportCommonTable,
};
