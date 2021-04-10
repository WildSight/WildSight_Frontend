import {GET_USER_SIGHTINGS, USER_SIGHTINGS_FAILED, USER_SIGHTINGS_LOADING} from '../ActionTypes'
const InitialState = {
    isLoading: true,
    data:null, 
    errMess:null
}
export const UserSightings = (state=InitialState, action)=> {
    switch (action.type){
        case GET_USER_SIGHTINGS:
            return {...state, isLoading: false, errMess: null,data: action.payload};
        
        case USER_SIGHTINGS_FAILED:
            return {...state,isLoading: false, errMess: action.payload.error, data: null};
        
        case USER_SIGHTINGS_LOADING:
            return {...state, isLoading: true,errMess: null, data:null}

        default:
            return state;
    }

}