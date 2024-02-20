
const AddUser = (userData) => {
    return {
        type: "Users",
        payload: userData
    }
}

const signout = () => {
    return {
      type: 'SIGNOUT'
    };
  };

export {AddUser,signout};