import { record, authRecord } from "../../shared/baseUrl";
import {GET_USER_SIGHTINGS, GET_USER, USER_SIGHTINGS_FAILED, GET_USER_FAILED} from '../ActionTypes'
export const getUserProfile = (userDetails)=> async(dispatch, getState)=>{
    const token = userDetails.token;
    try{
        const response = await authRecord(token).get('auth/userProfile')
        dispatch({type:GET_USER, payload: response.data});

    }catch(e){
        let error = e;
        console.log("Error");
        dispatch({type:GET_USER_FAILED, payload:{error}});
    }
}

export const fetchUserSightings = (userDetails)=> async(dispatch, getState)=>{
    const token = userDetails.token;
    try{
        const response = await authRecord(token).get('auth/GetOwnSightings')
        dispatch({type:GET_USER_SIGHTINGS, payload: response.data});

    }catch(e){
        let error = e;
        console.log("Error");
        dispatch({type:USER_SIGHTINGS_FAILED, payload:{error}});
    }
}