import { TOGGLE_DRAWER, ADD_SNACK, POP_SNACK, LOGIN, GET_CURRENT_USER } from '../constants';
import Auth from '../../api/auth';
import { Main } from '../../interfaces/store-core';
import { Action } from 'redux';
import { MainPagePayload } from '../../interfaces/redux-payload';

interface MainPageAction extends Action {
  payload: MainPagePayload;
}

let initialState: Main = {
  drawerOpen: false,
  messages: [],
  user: null,
};

export default function mainReducer(main = initialState, action: MainPageAction) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, main, { drawerOpen: !main.drawerOpen });
    case ADD_SNACK: {
      const messages = [...main.messages];
      return Object.assign({}, main, { messages: [...messages, action.payload.message] });
    }
    case POP_SNACK: {
      const [, ...messages] = main.messages;
      return Object.assign({}, main, { messages });
    }
    case LOGIN:
      return Object.assign({}, main, { user: action.payload.user });
    case GET_CURRENT_USER:
      return Object.assign({}, main, { user: Auth.getCurrentUser() });
    default:
      return main;
  }
}
