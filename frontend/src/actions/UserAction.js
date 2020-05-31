import { ActionTypes } from 'const';

class UserAction {

  static setUser({ name, amount_owed, survey }) {
    return {
      type: ActionTypes.SET_USER,
      name,      // User name
      amount_owed, // Users amount_owed
      survey,      // Users current survey state
    }
  }

}

export default UserAction;
