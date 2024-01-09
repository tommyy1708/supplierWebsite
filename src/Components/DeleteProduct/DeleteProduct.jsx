import React, { useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { GetProduct } from '../../request/api';

const DeleteProduct = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const { Search } = Input;
  const onSearch = async (value, _e, info) => {
    if (info.source === 'clear') {
      console.log('info = ', info.source);
    } else if (info.source === 'input') {
      if (value !== null && value !== '' && value !== undefined) {
        const data = {
          keyWord: value,
        };
        // eslint-disable-next-line
        const response = await GetProduct(data);
      }
    }
    // console.log(info?.source, value);
  };
  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </>
  );
};

export default DeleteProduct;
