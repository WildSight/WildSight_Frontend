import * as ActionTypes from '../ActionTypes';

export const species = (state = {
    isLoading: true,
    errMess: null,
    species: []
}, action) => {
switch(action.type) {
    case ActionTypes.ADD_SPECIES:
        return {...state, isLoading: false, errMess: null, species: action.payload};

    case ActionTypes.SPECIES_LOADING:
        return {...state, isLoading: true, errMess: null, species: []};

    case ActionTypes.SPECIES_FAILED:
        return {...state, isLoading: false, errMess: action.payload, species: []};

    default:
        return state;
}
}