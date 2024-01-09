import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AddNewProducts from '../Components/AddNewProducts/AddNewProducts';
import DeleteProduct from '../Components/DeleteProduct/DeleteProduct';
const NewProducts = () => {
  const [current, setCurrent] = useState('list');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <span>Search Product</span>,
      key: 'search',
      icon: <MailOutlined />,
    },
    {
      label: <span>Add New Product</span>,
      key: 'new',
      icon: <AppstoreOutlined />,
    },
  ];
  return (
    <div className="admin-window">
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      {current === 'new' ? <AddNewProducts /> : <DeleteProduct />}
    </div>
  );
};

export default NewProducts;
