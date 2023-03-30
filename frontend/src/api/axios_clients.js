import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log('request successfull', response)
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 4xx cause this function to trigger
    // Do something with response error
    //console.log('request failed', error)
    return Promise.reject(error);
  }
);

export default instance;
