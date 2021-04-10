const baseUrl = 'http://192.168.43.185:80/api/';
import axios from 'axios';

const record =  axios.create({
    baseURL:baseUrl
})
const authRecord =(token) => axios.create({
    baseURL:baseUrl,
    headers: {'Authorization': 'Token '+ token}
  });
  
export {baseUrl, authRecord, record}
