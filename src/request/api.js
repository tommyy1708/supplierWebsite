import request from './request'

export const LoginApi = (params) => request.post('/supplier-login', params);

export const GetUserInfo = (params) => request.get('/supplier-user', { params });

export const User = (params) => request.post('/supplier-user', {params});

export const GetUserList = () => request.get('/supplier-user-list');

export const GetOrders = () => { return request.get(`/supplier-orders`) };

export const GetCategoryApi = () => request.get('/supplier-category');

export const GetCategoryList = (params) =>
  request.get(`/supplier-category/${params}`);

export const PasswordUpdate = (params) =>
  request.put('/passwordUpdate', params);

export const NewOrderSend = (params) => {
 return request.post(`/supplier-addNewOrder`, params);
}

export const GetOrdersByDate = (params) =>
  request.get(`/supplier-ordersbydate`, { params });

export const GetAnnouncement = () =>
   request.get(`/supplier-announcement`);

export const UpdateAnnouncement = (params) =>
   request.put(`/supplier-announcement`, params);
