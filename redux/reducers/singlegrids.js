import {SINGLE_GRID_LOADING, SINGLE_GRID_FAILED, ADD_SINGLE_GRID,} from "../ActionTypes";

export const singlegrids = (state = { isLoading: true, 
                                errMess: null, singlegrids: null 
                            }, action) => {
	switch (action.type) {
		case SINGLE_GRID_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case ADD_SINGLE_GRID:
			return { ...state, isLoading: false, errMess: null, singlegrids: action.payload };
		
		case SINGLE_GRID_LOADING:
			return {...state, isLoading: true, errMess: null, singlegrids: {}};

		default:
			return state;
	}
};