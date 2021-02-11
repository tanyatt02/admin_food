import { SET_CURRENT_COMPANY } from '../constants';
import { Action } from 'redux';
import { CommonState } from '../../interfaces/store-core';

interface CustomAction extends Action {
  payload: any;
}

let initialState: CommonState = {
  currentCompany: localStorage.getItem('current-company') || 'notSelected',
};

export default function commonReducer(common = initialState, action: CustomAction) {
  switch (action.type) {
    case SET_CURRENT_COMPANY: {
      localStorage.setItem('current-company', action.payload);
      return Object.assign({}, common, { currentCompany: action.payload });
    }
    default:
      return common;
  }
}
