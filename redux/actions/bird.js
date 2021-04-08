import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const fetchBird = (birdId) => async (dispatch, getState) => {

	console.log("Got fet user request for userId"+ birdId);
	try {
		let response = await fetch(baseUrl + "Species/"+birdId, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			response = await response.json();
			dispatch({ type: ActionTypes.GET_BIRD, payload: response });
		} else {
			response = await response.text();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: ActionTypes.BIRD_FAILED, payload: err });
	}
};

