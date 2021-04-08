import * as ActionTypes from '../ActionTypes';

export const grids = (state = {
    isLoading: true,
    errMess: null,
    grids: []
}, action) => {
switch(action.type) {
    case ActionTypes.ADD_GRIDS:
        return {...state, isLoading: false, errMess: null, grids: action.payload};

    case ActionTypes.GRIDS_LOADING:
        return {...state, isLoading: true, errMess: null, grids: []};

    case ActionTypes.GRIDS_FAILED:
        return {...state, isLoading: false, errMess: action.payload, grids: []};

    default:
        return state;
}
}