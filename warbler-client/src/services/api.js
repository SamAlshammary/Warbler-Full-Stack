//this file would be useful to build a generic wat to make an Ajax request

import axios from 'axios';

export function setTokenHeader(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }



 
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
      return axios[method.toLowerCase()](path, data)
        .then(res => {
          return resolve(res.data);
        })
            //the idea here is that when we get backk infromation from Axios it always comes in inn a certain object =>
            //i nthis case its going to come in in an object called response and a subobject called data, when something goes wronng. =>
            //inside of data theres a sub object called error which is what we are sending from our server as the error handler we built. =>
            //with the successful request we always get back some object of data (res.data) above .
        .catch(err => {
          return reject(err.response.data.error);
        });
    });
  }
  
  