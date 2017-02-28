import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import {  AUTH_USER,  
          AUTH_ERROR,
          UNAUTH_USER,
          PROTECTED_TEST,
          RIDES_RETRIEVED,
          RIDE_DETAIL_RETRIEVE,
          RIDE_REQUEST_SUCCESS,
          USERRIDE_REQUEST_SUCCESS
} from './types';

// const API_URL = 'http://localhost:8080/api';
// const CLIENT_ROOT_URL = 'http://localhost:8080';

const API_URL = 'http://web-nebengers.herokuapp.com/api';
const CLIENT_ROOT_URL = 'http://web-nebengers.herokuapp.com';

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';
  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }

}

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/authenticate`, { email, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user_id', response.data.user.id, { path: '/' });
        dispatch({ 
          type: AUTH_USER, 
          payload : response.data.user
        });
        window.location.href = CLIENT_ROOT_URL + '#/dashboard';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function registerUser({ email, firstName, lastName, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    cookie.remove('user_id', { path: '/' });
    window.location.href = CLIENT_ROOT_URL + '#';
  }
}

export function protectedTest() {  
  return function(dispatch) {
    axios.get(`${API_URL}`, {
      headers: { 'x-access-token': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.message
      });
    })
    .catch((error) => {
      console.log("error disini bukan loh");
      console.log(error);
      //errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}


// Down below is written by fawwaz
export function getAvailableRides(pageNum = 1) {
  return function(dispatch) {
    axios.get(`${API_URL}/ride`, {
      headers : {
        'x-access-token' : cookie.load('token')
      },
      params: {
        page: pageNum
      }
    })
    .then(response => {
      dispatch({
        type: RIDES_RETRIEVED,
        payload: response
      });
      // window.scrollTo(0, 0);
      window.smoothScroll(document.querySelector('body'));
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function getDetailedRide(ride_id) {
  return function(dispatch) {
    axios.get(`${API_URL}/ride/${ride_id}`, {
      headers : {
        'x-access-token' : cookie.load('token')
      }
    })
    .then(response => {
      dispatch({
        type: RIDE_DETAIL_RETRIEVE,
        payload: response
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function createRideRequest(ride_id) {
  return function(dispatch) {
    axios.get(`${API_URL}/create_ride_request`, {
      headers : {
        'x-access-token' : cookie.load('token')
      },
      params : {
        ride_id : ride_id,
        optional_messages : 'ikut ya..'
      }
    })
    .then(response => {
      // dispatch({
      //   type: RIDE_REQUEST_SUCCESS,
      //   payload: response
      // });
      getAllUserRideRequest(dispatch,ride_id);
    })
    .catch((error) => {
      console.log(error);
    });
  } 
}

export function getUserRideRequest(ride_id) {
  return function(dispatch) {
    getAllUserRideRequest(dispatch,ride_id);
  }
}

function getAllUserRideRequest(dispatch, ride_id){
  axios.get(`${API_URL}/ride_request/${ride_id}`, {
    headers : {
      'x-access-token' : cookie.load('token')
    }
  })
  .then(response => {
    dispatch({
      type: USERRIDE_REQUEST_SUCCESS,
      payload: response
    });
  })
  .catch((error) => {
    console.log(error);
  });
}