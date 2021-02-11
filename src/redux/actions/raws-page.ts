import { EXPORT_RAWS, IMPORT_RAWS, GET_RAWS_LIST, ADD_SNACK, ADD_RAW, UPDATE_RAW, DELETE_RAW } from '../constants';
import Fetcher from '../../api/fetcher';
import { Dispatch } from 'redux';

const getRawsList = (_companyId: string) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const params = _companyId === 'notSelected' ? undefined : `?companyId=${_companyId}`;
    const response = await Fetcher.get('/api/raws', params);
    dispatch({ type: GET_RAWS_LIST, payload: response.raws });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const exportRaws = (_companyId: string) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const params = _companyId === 'notSelected' ? undefined : `?companyId=${_companyId}`;
    const response = await Fetcher.getBlob('/api/raws-xlsx', params);
    dispatch({ type: EXPORT_RAWS, payload: response });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const importRaws = (file: File, _companyId?: string) => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    const companyId = _companyId === 'notSelected' ? undefined : _companyId;
    const response: any = await Fetcher.postFile('/api/raws-xlsx', file, companyId);
    dispatch({ type: IMPORT_RAWS, payload: response.raws });
    return Promise.resolve(response && response.success);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const addRaw = (name: string, price: number, companyId: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.post('/api/raw', { name, price, companyId });
    console.error('did dispatch');
    dispatch({ type: ADD_RAW, payload: { raw: response.raw, companyId } });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const updateRaw = (name: string, price: number, _id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.put('/api/raw', { name, price, _id });
    dispatch({ type: UPDATE_RAW, payload: response.raw });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

//const deleteUser = (_id: string) => async (dispatch: Dispatch): //Promise<void> => {
//  try {
//    await Fetcher.delete('/api/user', _id);
//    dispatch({ type: DELETE_USER, payload: _id });
//    return Promise.resolve();
//  } catch (error) {
//    dispatch({ type: ADD_SNACK, payload: error });
//    return Promise.reject();
//  }
//};


export default {
  getRawsList,
  exportRaws,
  importRaws,
};
