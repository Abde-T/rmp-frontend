
const initialState = {
  sortBy: 'newest', 
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER_CRITERIA':
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;