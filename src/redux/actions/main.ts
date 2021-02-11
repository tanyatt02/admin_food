import { TOGGLE_DRAWER, ADD_SNACK, POP_SNACK, LOGIN, GET_CURRENT_USER } from '../constants';
import { EventMessage } from '../../interfaces/main';
import { Dispatch } from 'redux';
import Fetcher from '../../api/fetcher';
import Auth from '../../api/auth';

const toggleDrawer = () => ({ type: TOGGLE_DRAWER });

const addSnack = (message: EventMessage) => ({ type: ADD_SNACK, payload: { message } });

const popSnack = () => ({ type: POP_SNACK });

const login = (name: string, password: string) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await Fetcher.post('/auth/login', { name, password });
    if (response.success) {
      Auth.authenticate(response.token, response.user);
      Fetcher.init();
    }
    dispatch({ type: LOGIN, payload: response });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({ type: ADD_SNACK, payload: error });
    return Promise.reject();
  }
};

const getCurrentUser = () => ({ type: GET_CURRENT_USER });

export default {
  toggleDrawer,
  addSnack,
  popSnack,
  login,
  getCurrentUser,
};
