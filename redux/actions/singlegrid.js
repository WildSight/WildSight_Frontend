import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const fetchSingleGrid = (gridId) => async (dispatch, getState) => {

	console.log("Got fetch grid request for gridId"+ gridId);
	dispatch({type: ActionTypes.SINGLE_GRID_LOADING});
	try {
		let response = await fetch(baseUrl + "Locations/"+gridId, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			response = await response.json();
			dispatch({ type: ActionTypes.ADD_SINGLE_GRID, payload: response });
		} else {
			response = await response.text();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: ActionTypes.SINGLE_GRID_FAILED, payload: err });
	}
};

