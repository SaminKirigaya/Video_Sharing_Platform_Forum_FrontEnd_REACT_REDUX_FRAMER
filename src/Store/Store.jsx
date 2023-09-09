import { createSlice, configureStore } from "@reduxjs/toolkit";

// login Slice to set if login or logged out
const loginSlice = createSlice({
    name : 'login',
    initialState : {
        login : false
    },
    reducers : {
        logon(state){
            state.login = true
        },
        logout(state){
            state.login = false
        }
    }
})


// to set or clear token upon logged in or logged out
const tokenSlice = createSlice ({
    name : 'token',
    initialState : {
        token : ''
    },
    reducers : {
        clearToken(state){
            state.token = ''
        },
        setTokenNow(state, action){
            state.token = action.payload
        }
    }
})


// notifications 
const notificationSlice = createSlice({
    name : 'notify',
    initialState : {
        notifAmount : 0
    },
    reducers : {
        setNewNotif(state, action){
            state.notifAmount = action.payload
        }
    }
})


// set main store here with their reducer functions
const Store = configureStore({
    reducer : { loginData : loginSlice.reducer, tokenData : tokenSlice.reducer, notifyData : notificationSlice.reducer}
})


// user importing this Functions can call it inside useDispatch and use their reducer function like loginFunctions.logon() or loginFunctions.logout() 
export const loginFunctions = loginSlice.actions;
export const tokenFunctions = tokenSlice.actions; 
export const notifyFunctions = notificationSlice.actions;


export default Store