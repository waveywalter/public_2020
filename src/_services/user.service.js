import config from 'config';
import { authHeader } from '../_helpers';



export const userService = {
    login,
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

function logout(user) {
    // const requestOptions = {
    //     method: 'DELETE',
    //     body: authHeader()
    // };
    // fetch(baseURL+'/wtokens/${user.id}/?access_token=${user.id}', requestOptions).then(handleResponse);
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    var rolemapRegister = {
        "principalType": "USER",
        "principalId": user,
        "roleId": "5c1161ee3c9f4b14bcd44b3c"
    }
    const requestOptionsRole = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rolemapRegister)
    };
    msg1 = fetch(baseURL+'/wsers/', requestOptions).then(handleResponse);
    // msg2 = fetch(baseURL+'/wsers/', requestOptionsRole).then(handleResponse);
    return msg1;
}

function getAll(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(baseURL+'/wsers/?access_token=${user.id}', requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(baseURL+'/wsers', requestOptions).then(handleResponse);
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
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }
// console.log(data);
        return data;
    });

}