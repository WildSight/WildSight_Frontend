import {GET_USER, GET_USER_FAILED, USER_LOADING, UPDATE_USER, UPDATE_USER_FAILED} from '../ActionTypes'
const InitialState = {
    isLoading: true,
    data:null, 
    errMess:null
}
export const UserProfile = (state=InitialState, action)=> {
    switch (action.type){
        case GET_USER:
            return {...state, isLoading: false, errMess: null,data: action.payload};
        
        case GET_USER_FAILED:
            return {...state,isLoading: false, errMess: action.payload.error, data: null};
        
        case UPDATE_USER:
            return {...state, isLoading: false, errMess: null,data: action.payload};
        
        case UPDATE_USER_FAILED:
            return {...state,isLoading: false, errMess: action.payload.error, data: null};
            
        case USER_LOADING:
            return {...state, isLoading: true,errMess: null, data:null}

        default:
            return state;
    }
}