import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { message, Spin } from 'antd';
import Category from '../Components/Category/Category';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sUserName, setSUserName] = useState(
    localStorage.getItem('username')
  );
  const [showSpin, setShowSpin] = useState(false);
  return (
    <>
      <div className="headerFrame">
        {showSpin ? (
          <Spin size="large" delay="200" fullscreen="true" />
        ) : null}
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
        {location.pathname === '/' ? <Category /> : <Outlet></Outlet>}
      </div>
      <footer>
        <nav className="dark">
          <li>
            <p>
              <HomeOutlined />
            </p>
            <span>HOME</span>
          </li>
          <li>
            <p>
              <UserOutlined />
            </p>
            <span>PROFILE</span>
          </li>
          <li>
            <p>
              <PhoneOutlined />
            </p>
            <span>CONTACT</span>
          </li>
          <li>
            <p>
              <ShoppingCartOutlined />
            </p>
            <span>SHOP</span>
          </li>
        </nav>
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

export default Home;
