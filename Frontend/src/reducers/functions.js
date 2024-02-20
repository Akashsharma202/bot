let initialUser = {};
const UserReducer = (state = initialUser, action) => {
    switch (action.type) {
        case "Users":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

const userReducerSignOut = (state = [], action) => {
    switch (action.type) {
      case 'SIGNOUT':
        return {
          username: null // Clear user authentication state
        };
      default:
        return state;
    }
  };

export {UserReducer,userReducerSignOut};