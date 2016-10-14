const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TEXT_SELECTED':
      return action.text;
    default:
      return state;
  }
};
