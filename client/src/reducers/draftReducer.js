import {DRAFT_SURVEYS} from '../actions/type';
export default function (state = null, action) {
  switch (action.type) {
    case DRAFT_SURVEYS:
      if (typeof action.payload._id !== 'undefined') {
        return {action: 'success', message: 'Your data is saved as draft'};
      } else {
        return {
          action: 'error',
          message: 'Unable to save data as draft,please try again',
        };
      }
    //   return action.payload || false;
    default:
      return state;
  }
}
