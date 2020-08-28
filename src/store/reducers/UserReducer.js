import { SET_LOGGED_IN_USER } from "../actions/UserActions";

const initialState = {
}


const UserReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_LOGGED_IN_USER: {         
        let user = action.user || {};
        let token = action.token || null;
            return {...state, ...user, token}
        }
        default:
            return state
    }
};

export default UserReducer;