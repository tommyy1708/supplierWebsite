import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import FooterMenu from '../FooterMenu/FooterMenu';
import SpinOverLay from '../SpinOverLay/SpinOverLay';
import { jwtDecode } from 'jwt-decode';
function Layout({ children }) {
  const navigate = useNavigate();

  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const token = localStorage.getItem('token');
  const isAdmin = jwtDecode(token).admin;
  const [showSpin, setShowSpin] = useState(false);

  return (
    <>
      <SpinOverLay showSpin={showSpin} />
      <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{firstName + ' ' + lastName}</h2>
          </div>
          <div className="headerRight">
            <button
              onClick={(e) => {
                setShowSpin(true);
                message.info('Logout......');
                setTimeout(() => {
                  localStorage.clear();
                  navigate('/login');
                }, 3000);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="displayWindow">{children}</div>
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
