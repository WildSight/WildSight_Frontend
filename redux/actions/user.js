import { record, authRecord } from "../../shared/baseUrl";
import {GET_USER_SIGHTINGS, GET_USER, USER_SIGHTINGS_FAILED, GET_USER_FAILED, UPDATE_USER, UPDATE_USER_FAILED} from '../ActionTypes'

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

export const updateUserProfile = (userDetails)=> async(dispatch, getState)=>{
    const token = userDetails.token;
    let data = userDetails;
    delete data.token;
    try{
        const response = await authRecord(token).patch('auth/userProfile', data);
        console.log(response.data);
        dispatch({type:UPDATE_USER, payload: response.data});

    }catch(e){
        let error = e;
        console.log("Error", e);
        // dispatch({type:UPDATE_USER_FAILED, payload:{error}});
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