const baseUrl = 'http:/<"your_ip_address">:<"port_number">/api/';
import axios from 'axios';

const record =  axios.create({
    baseURL:baseUrl
})
const authRecord =(token) => axios.create({
    baseURL:baseUrl,
    headers: {'Authorization': 'Token '+ token}
  });
export {baseUrl, authRecord, record}
