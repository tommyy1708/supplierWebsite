import React, {useEffect, useState } from 'react';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { message, Spin, Avatar, Badge } from 'antd';
import {
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { GetOrders } from '../request/api';

const Admin = () => {
  const navigate = useNavigate();
  const [sUserName, setSUserName] = useState(
    localStorage.getItem('username')
  );
    const [flag, setFlag] = useState(true);
  const [ordersData, setOrdersData] = useState('');
  const location = useLocation();
  const [showSpin, setShowSpin] = useState(false);
  const navMenu = [
    { icon: <HomeOutlined />, title: 'HOME', url: '/admin' },
  ];

    const fetchCategoryList = async () => {
      const orders = await GetOrders();
      // setOrdersData(orders.data);
      console.log(orders.data)
    };

  useEffect(() => {
    if (flag) {
      fetchCategoryList();
      setFlag(false);
    }
  }, [flag]);

  return (
    <>
      <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{sUserName}</h2>
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
        admin page
      </div>
      <footer>
        <div className="footerNavMenu dark">
          {navMenu !== null || undefined
            ? navMenu.map((e, index) => (
                <Link key={index} to={e.url}>
                  <p>{e.icon}</p>
                  <span>{e.title}</span>
                </Link>
              ))
            : null}
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
};

export default Admin;
