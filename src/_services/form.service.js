import config from 'config';
import { authHeader } from '../_helpers';



export const formService = {
    saveform,
    updateform,
    getformbyid,
    getforms,
    deleteform,
    attachUserToForm,
    getFormsByUser
};
//  const baseURL="https://2020i.site/api";
const baseURL="http://localhost:3000/api";
//const baseURL = 'https://google.com'
function loco(){
    console.log('loco')
}

function saveform(formdata) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    };

    return fetch(baseURL+'/Forms', requestOptions).then(handleResponse);
}

function updateform(formdata) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    };

    return fetch(baseURL+'/Forms/'+formdata.id, requestOptions).then(handleResponse);
}

function getformbyid(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(baseURL+'/Forms/'+id, requestOptions).then(handleResponse);
}

function getforms(filter) {
    let filterpara = ' '
    if("FormType" in filter) filterpara = '{"where":{"FormType":"'+ filter.FormType +'"}}';
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(baseURL+'/Forms?filter='+filterpara, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteform(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(baseURL+'/Forms/'+id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response)
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

function handleLogoutResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            window.location.href = "/";
            return Promise.reject(error);
        }
        window.location.href = "/";
        return data;
    });

}

function getFormsByUser(id,toekn){
    console.log("GETFORMSSSSSSSSS")
    console.log(toekn)
    console.log(id)
    return fetch('/api/wsers/'+id+'/signedforms?access_token='+toekn,{
        method:"GET",
        headers: { ...authHeader(), 'Content-Type': 'application/json' },  
    }).then(handleResponse)

}

function attachUserToForm(data){
    console.log(data)
    data.status = false
    fetch('/api/wsers/'+data.userId+'/signedforms',{
        method:"POST",
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)   
    }).then(handleResponse)
}