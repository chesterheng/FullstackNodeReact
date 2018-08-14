import { FETCH_USER } from "../actions/types";

// initial state is null, mean don't know login or logout
export default (state = null, action) => {
    //console.log(action);
    switch (action.type) {
        case FETCH_USER:
            // '' || false => false (logout)
            // '123' || false => '123 (login)
            return action.payload || false;
        default:
            return state;
    }
};