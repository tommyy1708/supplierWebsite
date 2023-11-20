import axios from 'axios';
//settings
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
  timeout: 5000,
});

//add request interceptor
instance.interceptors.request.use(
 config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    //action for request error
    return Promise.reject(error);
  }
);

//add response interceptor
instance.interceptors.response.use(
  function (response) {

    return response.data;
  }, function (error) {
    //action for response error

    return Promise.reject(error);
  }
);
export default instance;
