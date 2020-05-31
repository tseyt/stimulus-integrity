import { ActionTypes } from 'const';

const initialState = {
  name: "",
  amount_owed: 0,
  survey: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      return Object.assign({}, state, {
        // If the name is not specified, do not change it
        // The places that will change the name is login
        // In that cases, the `win_count`, `lost_count`, `game` will be reset
        name: typeof action.name === "undefined" ? state.name : action.name,
        amount_owed: action.amount_owed || initialState.amount_owed,
        survey: action.survey || initialState.survey,
      });
    }
    default:
      return state;
  }
}
