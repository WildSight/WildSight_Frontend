import * as ActionTypes from "../ActionTypes";

import { record, authRecord } from "../../shared/baseUrl";

export const getUnratifiedSights = (userDetails) => async (dispatch,getState) =>{
	const token = userDetails.token;
    try{
        const res = await authRecord(token).get('/Ratification_List');
        dispatch({type:ActionTypes.GET_UNRATIFIED_SIGHTING, payload:{data:res.data}});
    }catch(e){
		console.log("Unratified error",e);
        dispatch({type:ActionTypes.UNRATIFIED_SIGHTING_FAILED, payload:{errmess:"Unable to fetch unratified sightings"}})
    }   
}

export const VoteSighting = (details) => async (dispatch,getState) =>{
	const {pk, vote, token} = details;
    try{
        const res = await authRecord(token).get('/Raw_Sighting/vote', { params: {pk,vote} });
        dispatch({type:ActionTypes.VOTE_SIGHTING_SUCCESS, payload:{message:"Voted sucessfully", data:res.data}});
    }catch(e){
		console.log("Unratified error",e);
        dispatch({type:ActionTypes.VOTE_SIGHTING_FAILED, payload:{errmess:"Unable to vote"}})
    }   
}