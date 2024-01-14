import React, { useContext } from 'react';
import { Avatar, Badge } from 'antd';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
  ExclamationCircleOutlined,
  OrderedListOutlined,
  TeamOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  useLocation,
  Link,
} from 'react-router-dom';
import CheckOutContent from '../../store/CheckOutContent';

const FooterMenu = ({isAdmin }) => {
  const ctx = useContext(CheckOutContent);
  const adminCode = parseInt(isAdmin);
    const location = useLocation();
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
    { icon: <OrderedListOutlined />, title: 'Orders', url: '/admin' },
    {
      icon: <TeamOutlined />,
      title: 'Customer',
      url: '/admin/clients',
    },
    {
      icon: <FormOutlined />,
      title: 'Products',
      url: '/admin/products',
    },
    {
      icon: <ExclamationCircleOutlined />,
      title: 'Notice',
      url: '/admin/notice',
    },
  ];

    const getMenuStyle = (url) => {
      return location.pathname === url
        ? { backgroundColor: 'darkgray',color:'black', borderRadius:'10px',padding:'2px'}
        : {};
    };

  return (
    <div className="footerNavMenu dark">
      {adminCode === 0
        ? userMenu.map((e, index) => (
            <Link style={getMenuStyle(e.url)} key={index} to={e.url}>
              <p>{e.icon}</p>
              <span>{e.title}</span>
            </Link>
          ))
        : adminMenu.map((e, index) => (
            <Link style={getMenuStyle(e.url)} key={index} to={e.url}>
              <p>{e.icon}</p>
              <span>{e.title}</span>
            </Link>
          ))}
    </div>
  );
}

export default FooterMenu;
