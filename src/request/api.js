import request from './request'

export const LoginApi = (params) => request.post('/supplier-login', params);

export const GetCategoryApi = () => request.get('/supplier-category');

export const GetCategoryList = (params) =>
  request.get(`/supplier-category/${params}`);