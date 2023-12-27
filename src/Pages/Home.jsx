import React, { useState, useContext } from 'react';
import {
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { message, Avatar, Badge } from 'antd';
import Category from '../Components/Category/Category';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import CheckOutContent from '../store/CheckOutContent';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';

const Home = () => {
  const ctx = useContext(CheckOutContent);
  const navigate = useNavigate();
  const location = useLocation();
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  const [showSpin, setShowSpin] = useState(false);
  const navMenu = [
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
  return (
    <>
        <SpinOverLay showSpin={showSpin} />
        {location.pathname === '/' ? <Category /> : <Outlet></Outlet>}
    </>
  );
};

export default Home;
