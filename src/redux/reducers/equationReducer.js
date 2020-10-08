const equationReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EQUATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default equationReducer;
