import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import NewCustomer from '../Components/NewCustomer/NewCustomer';
import ItemList from '../Components/ItemList/ItemList';
const AdminClients = () => {
  const location = useLocation();
  console.log('🚀 ~ AdminClients ~ path:', location.pathname );

    const [current, setCurrent] = useState('list');
  const onClick = (e) => {
    console.log('click ', e);
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
    <div className='admin-window'>
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div>
        {current === 'new'
          ? <NewCustomer/>
          : <ItemList/>}
      </div>
    </div>
  );
}

export default AdminClients;
