import {REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_FAILED} from '../ActionTypes';
const InitialState = {
    isLoading: true,
    username: null,
    userId:null,
    token:null, 
    errMess:null,
    message:null
}
export const Auth = (state=InitialState, action)=> {
    switch (action.type){
        case REGISTER_USER:
            return {...state, isLoading: false, errMess: null,message:"Registered Successfully", username: action.payload.user.username,  userId: action.payload.user.id, token:action.payload.token};
        
        case LOGIN_USER:
            return {...state,isLoading: false, errMess: null, message:"Logged In Successfully", username: action.payload.user.username,  userId: action.payload.user.id, token:action.payload.token};
        
        case LOGOUT_USER:
            return {...state, isLoading: false,errMess: null, message:action.payload.msg,username: null, userId:null, token: null}
        
        case AUTH_FAILED:
            return {...state,  isLoading: false, message:"", errMess: action.payload.error, username: null, userId:null, token: null};
    
    

    default:
        return state;
    }

}