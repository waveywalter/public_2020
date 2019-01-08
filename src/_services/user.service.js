import config from 'config';
import { authHeader } from '../_helpers';



export const userService = {
    login,
    checkrole,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const baseURL="http://localhost:3000/api";

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };


    return fetch(baseURL+'/wsers/login?include=User', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
     };
    localStorage.removeItem('user');
    return fetch(baseURL+'/wsers/logout', requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(baseURL+'/wsers/', requestOptions).then(handleResponse);
}

function getAll( ) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(baseURL+'/wsers', requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(baseURL+'/wsers', requestOptions).then(handleResponse);
}

function checkrole() {
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    
    return fetch(baseURL+'/wsers/username/'+user.userId+'/roles/'+user.user.role, requestOptions); 
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(baseURL+'/wsers/reset-password', requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(baseURL+'/wsers/${id}', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data)
        // console.log(response);
        if (!response.ok) {
            
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // console.log(data);
        return data;
    });

}