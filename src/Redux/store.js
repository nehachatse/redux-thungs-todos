import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/reducer";
import appReducer from "./app/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
});

// const loggerMiddleware = (store) => (next) => action => {
//     console.log("dispatching the action 1", action);
//     console.log(store.getState);
//     const value = next(action);
//     console.log(value);
//     console.log(store.getState);
//     console.log("end of 1")
// }

// const loggerMiddleware2 = (store) => (next) => action => {
//     console.log("dispatching the action 2", action);
//     console.log(store.getState);
//     const value = next(action);
//     console.log(value);
//     console.log(store.getState);
//     console.log("end of 2");

// }

const networkReqMiddleware =  ( store ) => next => action => {
    if(typeof action === "function"){
        const func = action;
        return func(store.dispatch, store.getState);
    }
    else{
        return next(action);
    }
}
 
export const store = createStore(rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(networkReqMiddleware)
    );
