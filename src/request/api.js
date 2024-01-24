import request from './request'

export const LoginApi = (params) => request.post('/supplier-login', params);

export const GetUserInfo = (params) => request.get('/supplier-user', { params });

export const User = (params) => request.post('/supplier-user', {params});

export const Category = (params) => request.post('/supplier-category', {params});

export const CustomerDelete = (id) => request.delete(`/supplier-user/${id}`);

export const Product = (params) => request.post('/supplier-product', { params });

export const ProductDelete = (itemCode) =>
request.delete(`/supplier-product/${itemCode}`);

export const GetProduct = (params) => request.get('/supplier-product', {params});

export const GetUserList = () => request.get('/supplier-user-list');

export const GetOrders = () => { return request.get(`/supplier-orders`) };

export const GetCategoryApi = () => request.get('/supplier-category');

export const CategoryDelete = (categoryName) => request.delete(`/supplier-category/${categoryName}`);

export const GetCategoryList = (params) =>
  request.get(`/supplier-category/${params}`);

export const PasswordUpdate = (params) =>
  request.put('/passwordUpdate', params);

export const UpdateAnnouncement = (content) =>
  request.put(`/supplier-announcement`, content );

export const GetAnnouncement = () =>
     request.get(`/supplier-announcement`);

export const ChangeAdmin = (params) =>
     request.put(`/supplier-admin-change`, params);

export const NewOrderSend = (params) => {
 return request.post(`/supplier-addNewOrder`, params);
}

export const GetOrdersByDate = (params) =>
  request.get(`/supplier-ordersbydate`, { params });


export const SendVerifyCode = (params) =>
  request.post(`/password-retrieval`, params);

export const UploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return request.post('/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const VerifyToken = () => request.get(`/supplier-verify-token`);