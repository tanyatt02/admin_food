import { Dispatch } from 'redux';
import Fetcher from '../../api/fetcher';
import { GET_COMPANIES, SET_CURRENT_COMPANY, ADD_SNACK } from '../constants';

const getCompanies = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await Fetcher.get('/api/companies');
    dispatch({ type: GET_COMPANIES, payload: response });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const setCurrentCompany = (id: string) => ({ type: SET_CURRENT_COMPANY, payload: id });

export default {
  getCompanies,
  setCurrentCompany,
};
