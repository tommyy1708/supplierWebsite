import React, { useState, useContext } from 'react';
import {
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { message, Avatar, Badge } from 'antd';
import Category from '../Carosuels/Carosuels';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import CheckOutContent from '../../store/CheckOutContent';
import SpinOverLay from '../SpinOverLay/SpinOverLay';

function Layout({ children }) {
  const ctx = useContext(CheckOutContent);

  const navigate = useNavigate();
  const location = useLocation();
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const isAdmin = localStorage.getItem('admin');
  console.log(
    '🚀 ~ file: Layout.jsx:27 ~ Layout ~ isAdmin:',
    isAdmin
  );
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

  const adminMenu = [
    { icon: <HomeOutlined />, title: 'HOME', url: '/admin' },
    {
      icon: <UserOutlined />,
      title: 'Add New',
      url: '/admin/new-client',
    },
  ];
  return (
    <>
      <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{firstName + ' ' + lastName}</h2>
          </div>
          <div className="headerRight">
            <button
              onClick={(e) => {
                message.info('Logout......');
                setShowSpin(true);
                setTimeout(() => {
                  localStorage.clear();
                  navigate('/login');
                }, 3000);
              }}
            >
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
      <div className="displayWindow">
        {children}
        {/* <SpinOverLay showSpin={showSpin} />
        {location.pathname === '/' ? <Category /> : <Outlet></Outlet>} */}
      </div>
      <footer>
        <div className="footerNavMenu dark">
          {parseInt(isAdmin) === 0
            ? navMenu.map((e, index) => (
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
        <div className="footerCopyright dark">
          <p>
            © {process.env.REACT_APP_YEAR} Copyright by{' '}
            {process.env.REACT_APP_COMPANY_NAME} All rights reserved.
          </p>
          <p>Powered By {process.env.REACT_APP_AUTHOR_NAME}</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
