import React, { useState, useContext } from 'react';
import {
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { message, Avatar, Badge } from 'antd';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import CheckOutContent from '../../store/CheckOutContent';
import SpinOverLay from '../SpinOverLay/SpinOverLay';
import FooterMenu from '../FooterMenu/FooterMenu';

function Layout({ children }) {
  const ctx = useContext(CheckOutContent);

  const navigate = useNavigate();
  const location = useLocation();
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const isAdmin = localStorage.getItem('admin');
  const [showSpin, setShowSpin] = useState(false);

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

      </div>
      <footer>
        <FooterMenu isAdmin={isAdmin}></FooterMenu>
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
