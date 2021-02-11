import { Dispatch } from 'redux';
import Fetcher from '../../api/fetcher';
import {
  ADD_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_SNACK,
} from '../constants';

const addCompany = (name: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.post('/api/company', { company: { name } });
    dispatch({ type: ADD_COMPANY, payload: response.company });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const updateCompany = (name: string, _id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.put('/api/company', { name, _id });
    dispatch({ type: UPDATE_COMPANY, payload: response.company });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const deleteCompany = (_id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await Fetcher.delete('/api/company', _id);
    dispatch({ type: DELETE_COMPANY, payload: _id });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const addUser = (name: string, password: string, companyId: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.post('/api/user', { name, password, companyId });
    console.error('did dispatch');
    dispatch({ type: ADD_USER, payload: { user: response.user, companyId } });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const updateUser = (name: string, password: string, _id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.put('/api/user', { name, password, _id });
    dispatch({ type: UPDATE_USER, payload: response.user });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const deleteUser = (_id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await Fetcher.delete('/api/user', _id);
    dispatch({ type: DELETE_USER, payload: _id });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

export default {
  addCompany,
  updateCompany,
  deleteCompany,
  addUser,
  updateUser,
  deleteUser,
};
