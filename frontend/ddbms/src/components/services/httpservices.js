import axios from 'axios';
import Utils from '../helper/utils';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 50000,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // 'Content-Type': 'multipart/form-data',
  // 'Content-Type': 'application/x-www-form-urlencoded'
  // },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  // console.log(config)

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
});

instance.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    // const originalRequest = error.config
    let errorMessage = '';


    // Validation Error
    if (error.response && error.response.status === 422) {
      Utils.error("here is error 422");
    }

    else if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = `${process.env.PUBLIC_URL}/login`;
      return;
    }
    else if (error.message) {
      errorMessage = error.message;
    }

    if (errorMessage) {
      // Utils.Toast('error', errorMessage);
      console.error('error', errorMessage);
    }

    return Promise.reject(error)
  }
);



const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),

  post: (url, body, headers) => instance.post(url, body, headers).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
