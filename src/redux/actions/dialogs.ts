import { SET_DIALOG_STATE } from '../constants';
import { Dialog } from '../../interfaces/dialogs';

const setDialogState = (dialog: string, state: Dialog) => ({
  type: SET_DIALOG_STATE,
  payload: { dialog, state },
});

export default {
  setDialogState,
};
