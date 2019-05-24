import {FETCH_SURVEYS, FETCH_SAVED_DRAFT} from '../actions/type';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload || false;
    
    case FETCH_SAVED_DRAFT:
      return action.payload || false;

    default:
      return state;
  }
}
