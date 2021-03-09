import axios from 'axios'

const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = "LOGIN_USER"
const LOGOUT_USER = "LOGOUT_USER"
const GET_USER = "GET_USER"

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getUser(){
    const user = axios.get('/api/auth/user').then( res => res.data )
    return {
        type: GET_USER,
        payload: user
    }
}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            //* action.payload is user session we created (obj with user info)
            //* how do I want this to change state?
            return { ...state, user: action.payload, isLoggedIn: true }
        case LOGOUT_USER:
            //* sets state back to empty, could also write return: initialState
            return { ...action.payload }
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return { ...state, user: action.payload, isLoggedIn: true }
        case GET_USER + "_REJECTED":
            return initialState
       default:
        return state
    }
}