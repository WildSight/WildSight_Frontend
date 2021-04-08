import {BIRD_LOADING, BIRD_FAILED, GET_BIRD,} from "../ActionTypes";

export const birds = (state = { isLoading: true, 
                                errMess: null, birds: null 
                            }, action) => {
	switch (action.type) {
		case BIRD_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		case GET_BIRD:
			return { ...state, isLoading: false, errMess: null, birds: action.payload };
		
		case BIRD_LOADING:
			return {...state, isLoading: true, errMess: null, birds: {}};

		default:
			return state;
	}
};