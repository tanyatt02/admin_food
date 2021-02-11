import { SET_DIALOG_STATE } from '../constants';
import { Dialogs } from '../../interfaces/store-core';
import { Action } from 'redux';
import { DialogsPayload } from '../../interfaces/redux-payload';

interface DialogsAction extends Action {
  payload: DialogsPayload;
}

let initialState: Dialogs = {
  addCompany: { open: false },
  deleteCompany: { open: false },
  addUser: { open: false },
  deleteUser: { open: false },
  addRaw: { open: false}
};

export default function pupilInfoReducer(dialogs = initialState, action: DialogsAction) {
  switch (action.type) {
    case SET_DIALOG_STATE:
      return Object.assign({}, dialogs, {
        [action.payload.dialog]: { ...dialogs[action.payload.dialog], ...action.payload.state },
      });
    default:
      return dialogs;
  }
}
