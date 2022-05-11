import { setAuthenticated } from "../auth-slice";
import { connect } from "../socket-slice";

const socketMiddleware = store => {
    return next => action => {
        if (setAuthenticated.match(action)) {
            if (action.payload === true) {
                store.dispatch(connect());
            }
        }
        
        next(action);
    }
}

export default socketMiddleware;