import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import NewCustomer from '../Components/NewCustomer/NewCustomer';
import ItemList from '../Components/ItemList/ItemList';
const AdminClients = () => {

  const [current, setCurrent] = useState('list');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <span>Customer List</span>,
      key: 'list',
      icon: <MailOutlined />,
    },
    {
      label: <span>Add New</span>,
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
      <div>{current === 'new' ? <NewCustomer /> : <ItemList />}</div>
    </div>
  );
};

export default AdminClients;
