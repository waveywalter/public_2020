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
    delete: _delete,
    loco
};
//const baseURL="http://localhost:3000/api";
const baseURL="https://jott.thewaveint.com/api";
function loco(){
    console.log('loco')
}
function login(username, password) {
    console.log("HERE WE GOOOOOOOOOOO")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

        console.log("LOGINNNNNNNNNNNNNNNNNN")
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
    return fetch(baseURL+'/wsers/logout', requestOptions).then(handleLogoutResponse);
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
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(baseURL+'/wsers/'+user.userId, requestOptions).then(handleResponse)
    .then(user => {
        // login successful if there's a jwt token in the response
        if (user.userId) {
            var userold = JSON.parse(localStorage.getItem('user'));
            userold.user = user

            // store user details and jwt token in local storage to keep user logged in between page refreshes
             localStorage.setItem('user', JSON.stringify(userold));
        }

        return user;
    });
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