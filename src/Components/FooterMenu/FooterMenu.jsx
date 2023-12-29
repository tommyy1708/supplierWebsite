import React, { useState, useContext } from 'react';
import { message, Avatar, Badge } from 'antd';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import {
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import CheckOutContent from '../../store/CheckOutContent';

const FooterMenu = ({isAdmin }) => {
  const ctx = useContext(CheckOutContent);
  const adminCode = parseInt(isAdmin);
  const userMenu = [
    { icon: <HomeOutlined />, title: 'HOME', url: '/' },
    { icon: <UserOutlined />, title: 'PROFILE', url: '/profile' },
    { icon: <PhoneOutlined />, title: 'CONTACT', url: '/contact' },
    {
      icon: (
        <Badge
          showZero={false}
          count={`${ctx.cartData.totalAmount}`}
          overflowCount={99}
        >
          <Avatar
            shape="square"
            size="default"
            icon={<ShoppingCartOutlined />}
          />
        </Badge>
      ),
      title: 'CHECKOUT',
      url: '/checkout',
    },
  ];

  const adminMenu = [
    { icon: <HomeOutlined />, title: 'HOME', url: '/admin' },
    {
      icon: <UserOutlined />,
      title: 'Add New',
      url: '/admin/new-client',
    },
  ];
  return (
    <div className="footerNavMenu dark">
      {adminCode === 0
        ? userMenu.map((e, index) => (
            <Link key={index} to={e.url}>
              <p>{e.icon}</p>
              <span>{e.title}</span>
            </Link>
          ))
        : adminMenu.map((e, index) => (
            <Link key={index} to={e.url}>
              <p>{e.icon}</p>
              <span>{e.title}</span>
            </Link>
          ))}
    </div>
  );
}

export default FooterMenu;
