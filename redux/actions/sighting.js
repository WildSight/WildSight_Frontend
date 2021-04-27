import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getCustomSightings = (gridId, time) => (dispatch) => {

	dispatch(sightingsLoading(true));
	return fetch(baseUrl + `Refined_Sightings/Location/?loc=${gridId}&time=${time}`)
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
		.then((sightings) => dispatch(addSightings(sightings)))
		.catch((error) => dispatch(sightingsFailed(error.message)));
}

export const getCustomSpeciesLocationSightings = (gridId, time, specieId) => (dispatch) => {

	dispatch(sightingsLoading(true));
	return fetch(baseUrl + `Refined_Sightings/Species-Location/?loc=${gridId}&time=${time}&sp=${specieId}`)
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
		.then((sightings) => dispatch(addSightings(sightings)))
		.catch((error) => dispatch(sightingsFailed(error.message)));
}

export const getCustomSpecieSightings = (specieId, timeId) => (dispatch) => {

	dispatch(sightingsLoading(true));
	return fetch(baseUrl + `Refined_Sightings/Species/?sp=${specieId}`)
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
		.then((sightings) => dispatch(addSightings(sightings)))
		.catch((error) => dispatch(sightingsFailed(error.message)));
}


export const sightingsLoading = () => ({
	type: ActionTypes.SIGHTINGS_LOADING,
});

export const sightingsFailed = (errmess) => ({
	type: ActionTypes.SIGHTINGS_FAILED,
	payload: errmess,
});

export const addSightings = (sightings) => ({
	type: ActionTypes.ADD_SIGHTINS,
	payload: sightings,
});