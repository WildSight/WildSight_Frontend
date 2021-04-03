import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");


export const fetchSpecies = (interests) => (dispatch) => {

	dispatch(speciesLoading(true));
	return fetch(baseUrl + 'Species/')
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
		.then((species) => dispatch(addSpecies(species)))
		.catch((error) => dispatch(speciesFailed(error.message)));
};

export const speciesLoading = () => ({
	type: ActionTypes.SPECIES_LOADING,
});

export const speciesFailed = (errmess) => ({
	type: ActionTypes.SPECIES_FAILED,
	payload: errmess,
});

export const addSpecies = (species) => ({
	type: ActionTypes.ADD_SPECIES,
	payload: species,
});