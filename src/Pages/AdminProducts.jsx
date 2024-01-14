import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AddNewProducts from '../Components/AddNewProducts/AddNewProducts';
import DeleteProduct from '../Components/DeleteProduct/DeleteProduct';
import AdminCategory from '../Components/AdminCategory/AdminCategory';
import AddNewCategory from '../Components/AddNewCategory/AddNewCategory';
const NewProducts = () => {
  const [current, setCurrent] = useState('0');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <span>Search Product</span>,
      key: '0',
      icon: <MailOutlined />,
    },
    {
      label: <span>Add New Product</span>,
      key: '1',
      icon: <AppstoreOutlined />,
    },
    {
      label: <span>Category</span>,
      key: '2',
      icon: <AppstoreOutlined />,
    },
    {
      label: <span>Add New Category</span>,
      key: '3',
      icon: <AppstoreOutlined />,
    },
  ];

  const componentsList = [
    <DeleteProduct />,
    <AddNewProducts />,
    <AdminCategory />,
    <AddNewCategory />,
  ];

  const getComponentByKey = (key) => {

    const index = items.findIndex((item) => item.key === key);

    return componentsList[index];
  }

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
      {getComponentByKey(current)}
    </div>
  );
};

export default NewProducts;
