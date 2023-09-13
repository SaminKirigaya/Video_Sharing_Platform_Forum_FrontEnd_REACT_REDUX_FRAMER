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
    name : 'notifAmount',
    initialState : {
        notifAmount : 0
    },
    reducers : {
        setNewNotif(state, action){
            state.notifAmount = action.payload
        }
    }
})

// profile Image data link
const ProfImgSlice = createSlice({
    name : 'proImgPath',
    initialState : {
        proImgPath : ''
    },
    reducers : {
        clearproImgPath(state){
            state.proImgPath = ''
        },
        setTheProImgPath(state, action){
            state.proImgPath = action.payload
        }
    }
})


// cover imae data link
const CoverImgSlice = createSlice({
    name : 'coverImgPath',
    initialState : {
        coverImgPath : ''
    },
    reducers : {
        clearCoverImgPath(state){
            state.coverImgPath = ''
        },
        setCoverImgPath(state, action){
            state.coverImgPath = action.payload
        }
    }
})


// username setting 
const usernameSlice = createSlice({
    name : 'username',
    initialState : {
        username : ''
    },
    reducers : {
        clearusername(state){
            state.username = ''
        },
        setRecentUsername(state, action){
            state.username = action.payload
        }
    }
})


// user serial setting
const userserialSlice = createSlice({
    name : 'serialId',
    initialState : {
        serialId : ''
    },
    reducers : {
        clearSerial(state){
            state.serialId = ''
        },
        setSerial(state, action){
            state.serialId = action.payload
        }

    }
})


// set main store here with their reducer functions
const Store = configureStore({
    reducer : { loginData : loginSlice.reducer, tokenData : tokenSlice.reducer, notifyData : notificationSlice.reducer, profImgData : ProfImgSlice.reducer, coverImgData : CoverImgSlice.reducer, usernameData : usernameSlice.reducer, userserialData : userserialSlice.reducer }
})


// user importing this Functions can call it inside useDispatch and use their reducer function like loginFunctions.logon() or loginFunctions.logout() 
export const loginFunctions = loginSlice.actions;
export const tokenFunctions = tokenSlice.actions; 
export const notifyFunctions = notificationSlice.actions;
export const profImgFunctions = ProfImgSlice.actions;
export const coverImgFunctions = CoverImgSlice.actions;
export const usernameFunctions = usernameSlice.actions;
export const userserialFunctions = userserialSlice.actions;


export default Store