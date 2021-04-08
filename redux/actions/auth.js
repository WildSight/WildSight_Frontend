import AsyncStorage from '@react-native-community/async-storage';
import { record, authRecord } from "../../shared/baseUrl";
import {REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_FAILED} from '../ActionTypes'
export const signUp = (userDetails)=> async(dispatch, getState)=>{
    try{
        const response = await record.post('auth/register', userDetails);//check backend url
        console.log("Success");
        await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
        dispatch({type:REGISTER_USER, payload: response.data});

    }catch(e){
        let error = e;
        if(e.response){
            if(e.response.data.username){
                error = e.response.data.username[0];
            }else if(e.response.data.email){
                error = e.response.data.email[0];
            }else if(e.response.data.password){
                error = e.response.data.password[0];
            }
        }
        console.log("Error");
        dispatch({type:AUTH_FAILED, payload:{error}});
    }

}

export const signIn = (userDetails)=> async(dispatch, getState)=>{
    try{
        const response = await record.post('/auth/login', userDetails);//check backend url
        console.log(response.data);
        await AsyncStorage.setItem('loginData', JSON.stringify(response.data));
        dispatch({type:LOGIN_USER, payload: response.data});
    }catch(e){
        let error = e;
        console.log("LE", e.response.data);
        if(e.response){
            if(e.response.data.non_field_errors){
                error = e.response.data.non_field_errors[0];
            }else{
                error = e.response.statusText;
            }
        }
        dispatch({type:AUTH_FAILED, payload:{error}});
    }

}

export const signOut = (userDetails) => async (dispatch,getState) =>{
    const token = userDetails.token;
    try{
        console.log("hi");
        await AsyncStorage.removeItem('loginData');
        const res = await authRecord(token).post('auth/logout');
        
        console.log(res);
        // dispatch({type:LOGOUT_USER, payload:{msg:"You have been logged out successfully"}});
    }catch(e){
        console.log("err", e);
        // dispatch({type:AUTH_FAILED, payload:{errmess:"Failed to logout"}})
    }   
}

export const setLoginStatus = ()=>async(dispatch, getState)=>{
    try{
        let data = await AsyncStorage.getItem('loginData');
        data= JSON.parse(data);
        if(data)
            dispatch({type:LOGIN_USER, payload: data});
    }catch(e){
        console.log(e);
    }

}