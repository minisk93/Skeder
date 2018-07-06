import {Conference} from "../realmDB";

const initialState = {
  conferences: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CONFERENCES': {
      return {...state, conferences: Conference.get()};
    }
    default:
      return state;
  }
}

