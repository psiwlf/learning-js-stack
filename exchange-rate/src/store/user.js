const initialState = {
  name: "Test1 user",
  loggedIn: false,
};

export function userReducer(state = initialState, action) {
  return state;
}

// selector
export const getName = state => state.user.name;