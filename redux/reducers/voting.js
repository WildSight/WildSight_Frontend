import {VOTE_SIGHTING_FAILED, VOTE_SIGHTING_SUCCESS, VOTING} from '../ActionTypes'
const InitialState = {
    isLoading: true,
    data:null,
    message:null, 
    errMess:null
}
export const Votes = (state=InitialState, action)=> {
    switch (action.type){
        case VOTE_SIGHTING_SUCCESS:
            return {...state, isLoading: false, errMess: null,message: action.payload.message, data:action.payload.data};
        
        case VOTE_SIGHTING_FAILED:
            return {...state,isLoading: false, errMess: action.payload.errMess, message: null, data:null};
        
        case VOTING:
            return {...state, isLoading: true,errMess: null, message:null, data:null}

        default:
            return state;
    }

}