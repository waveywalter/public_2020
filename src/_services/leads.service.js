import config from 'config';
import { authHeader } from '../_helpers';



export const leadService = {
 
    getLeads,
    createLead,
    createNote,
    getNotes,
    createTask,
    getLeadById,
    getAllTask
   
};
/*/////////////////////////////////////////////////////
Future - Add authentication to LB4 API

////////////////////////////////////////////////////*/

//const baseURL="http://localhost:3000/api";
const baseURL="https://2020i.site/api2";
//const baseURL = 'https://google.com'
function getAllTask(filter){
    console.log("ALL TASK")
    console.log(filter)
    let filterpara = ' '
    return fetch(baseURL+'/tasks?filter[limit]=100').then(handleResponse);
  //return []
}
function createNote(note,userId){
    note.status="New"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)

    };
    note.status="New"
    return fetch(baseURL+'/lead/'+userId+'/note', requestOptions).then(handleResponse);   
}

function createTask(task,userId){
    task.status="New"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)

    };
 
    return fetch(baseURL+'/lead/'+userId+'/task', requestOptions).then(handleResponse);   
}

function getNotes(filter,userId){
    let filterpara = ' '
    //if("fname" in filter) filterpara = '{"where":{"fname":"'+ filter.name +'"}}';
    return fetch(baseURL+'/lead/'+userId+'/related?filter[offset]=0&filter[limit]=10&filter[skip]=0').then(handleResponse);   
}


function getLeads(filter) {
    console.log(filter)
    let filterpara = ' '
    if("fname" in filter) filterpara = '{"where":{"fname":"'+ filter.fname +'"}}';
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(baseURL+'/leads?filter='+filterpara, requestOptions).then(handleResponse);
}

function createLead(lead){
    console.log(lead)
    console.log("SEND LEAD TO API2")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)

    };
    return fetch(baseURL+'/leads', requestOptions).then(handleResponse);
   
}
function getLeadById(id){
  return  fetch("https://2020i.site/api2/leads/"+id).then(handleResponse)
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return {test:"test2"};
}



function update(lead) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return {test:"test3"}
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return 200
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
        console.log(response)
        return data;
    });

}

