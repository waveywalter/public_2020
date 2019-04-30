import config from 'config';
import { authHeader } from '../_helpers';



export const appService = {

    getApps,
    getApp
};
  const baseURL="https://2020i.site/api";
//const baseURL="http://localhost:3000/api";
//const baseURL = 'https://google.com'
function loco(){
}
function getApps(id){   
     const requestOptions = {
    method: 'GET',
    headers: authHeader()
};
    return fetch("https://2020i.site/api/applications?filter[offset]=0&filter[limit]=100&filter[skip]=0&filter[where][approved][neq]=1", requestOptions).then(handleResponse);
}

function getApp(id){   
    const requestOptions = {
   method: 'GET',
   headers: authHeader()
};
   return fetch('https://2020i.site/api/applications/'+id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                alert("Permission Error.");
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

