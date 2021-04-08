import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getCustomGrid = (lat, long) => (dispatch) => {

	dispatch(gridsLoading(true));
	return fetch(baseUrl + `Locations/?lat=${lat}&long=${long}`)
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((grid) => dispatch(addGrids(grid)))
		.catch((error) => dispatch(gridsFailed(error.message)));
}

export const gridsLoading = () => ({
	type: ActionTypes.GRID_LOADING,
});

export const gridsFailed = (errmess) => ({
	type: ActionTypes.GRIDS_FAILED,
	payload: errmess,
});

export const addGrids = (grids) => ({
	type: ActionTypes.ADD_GRIDS,
	payload: grids,
});