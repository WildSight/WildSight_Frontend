import {GET_UNRATIFIED_SIGHTING, UNRATIFIED_SIGHTING_FAILED, UNRATIFIED_SIGHTING_LOADING} from '../ActionTypes'
const InitialState = {
    isLoading: true,
    data:null, 
    errMess:null
}
export const UnratifiedSightings = (state=InitialState, action)=> {
    switch (action.type){
        case GET_UNRATIFIED_SIGHTING:
            return {...state, isLoading: false, errMess: null,data: action.payload.data};
        
        case UNRATIFIED_SIGHTING_FAILED:
            return {...state,isLoading: false, errMess: action.payload.errMess, data: null};
        
        case UNRATIFIED_SIGHTING_LOADING:
            return {...state, isLoading: true,errMess: null, data:null}

        default:
            return state;
    }

}