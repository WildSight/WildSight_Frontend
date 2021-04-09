import * as ActionTypes from '../ActionTypes';

export const rawsightings = (state = {
    isLoading: true,
    errMess: null,
    rawsightings: []
}, action) => {
switch(action.type) {
    
    case ActionTypes.ADD_RAW_SIGHTING:
        var rawsighting = action.payload;
        return { ...state, rawsightings: state.rawsightings.concat(rawsighting)};

    default:
        return state;
}
}