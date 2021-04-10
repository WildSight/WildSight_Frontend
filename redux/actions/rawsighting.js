import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { Alert, Platform } from "react-native";

import * as mime from 'react-native-mime-types';

const axios = require("axios");

export const postRawSighting = (rawSighting, token) => async (dispatch) => {
	
	var imageUri = rawSighting.image;

	let formData = new FormData();

	var date = new Date().getTime().toString();

	formData.append('image', {
		name: rawSighting.user+"---"+date+".jpg",
		type: 'image/jpeg',
		uri: Platform.OS === "android"
			? imageUri
			: imageUri.replace('file://', ''),
	})

    formData.append('user', rawSighting.user);
    formData.append('count', rawSighting.count);
    formData.append('species', rawSighting.species);
	formData.append('date_time', rawSighting.date_time);
    formData.append('location_longitude', rawSighting.location_longitude);
	formData.append('location_latitude', rawSighting.location_latitude)

	const Token = "Token " + token;

	return fetch(baseUrl + "Raw_Sighting/", {
		method: "POST",
		body: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			"Authorization" : Token,
		},
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => {
			dispatch(addRawSighting(response));
			console.log(response);
			Alert.alert("Sight Posted successfuly", "Thanks for adding a sighting to WildSight.");
		})
		.catch((error) => {
			console.log("post sightings", error.message);
			Alert.alert("Your Sighting could not be posted", error.message);
		});
};

export const addRawSighting = (sighting) => ({
	type: ActionTypes.ADD_RAW_SIGHTING,
	payload: sighting,
});