import * as ActionTypes from '../ActionTypes';

export const sightings = (state = {
    isLoading: true,
    errMess: null,
    sightings: []
}, action) => {
switch(action.type) {
    case ActionTypes.ADD_SIGHTINS:
        return {...state, isLoading: false, errMess: null, sightings: action.payload};

    case ActionTypes.SIGHTINGS_LOADING:
        return {...state, isLoading: true, errMess: null, sightings: []};

    case ActionTypes.SIGHTINGS_FAILED:
        return {...state, isLoading: false, errMess: action.payload, sightings: []};

    default:
        return state;
}
}