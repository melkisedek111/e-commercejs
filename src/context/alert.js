import React, {createContext, useReducer} from 'react';

const INITIAL_STATE = {
    alert: {}
}

const AlertContext = createContext({
    alert: {},
    setShowAlert: (alertDetails) => {}
});

const alertReducer = (state, action) => {
    switch(action.type) {
        case "SHOW_ALERT":
            return {
                ...state,
                alert: action.payload
            }
        default:
            return state;
    }
}

const AlertProvider = (props) => {
    const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE)
    const setShowAlert = (alertDetails) => {
        dispatch({
            type: "SHOW_ALERT",
            payload: alertDetails
        });
    }

    return (
        <AlertContext.Provider value={{alert: state.alert, setShowAlert}} {...props} />
    )
}

export {AlertContext, AlertProvider}