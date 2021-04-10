import {VOTE_SIGHTING_FAILED, VOTE_SIGHTING_SUCCESS, VOTING} from '../ActionTypes'
const InitialState = {
    isLoading: true,
    message:null, 
    errMess:null
}
export const Votes = (state=InitialState, action)=> {
    switch (action.type){
        case VOTE_SIGHTING_SUCCESS:
            return {...state, isLoading: false, errMess: null,message: action.payload.data};
        
        case VOTE_SIGHTING_FAILED:
            return {...state,isLoading: false, errMess: action.payload.errMess, message: null};
        
        case VOTING:
            return {...state, isLoading: true,errMess: null, message:null}

        default:
            return state;
    }

}