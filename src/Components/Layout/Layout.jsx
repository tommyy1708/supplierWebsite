import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import FooterMenu from '../FooterMenu/FooterMenu';
import SpinOverLay from '../SpinOverLay/SpinOverLay';

function Layout({ children }) {
  const navigate = useNavigate();

  const firstNameRow = localStorage.getItem('first_name');
  const lastNameRow = localStorage.getItem('last_name');
  const firstName =
    firstNameRow?.charAt(0).toUpperCase() +
    firstNameRow?.substring(1);
  const lastName =
    lastNameRow?.charAt(0).toUpperCase() + lastNameRow?.substring(1);
  const [showSpin, setShowSpin] = useState(false);

  // useEffect(() => {
  //   const isTokenValid = VerifyToken();

  //   if (!isTokenValid) {
  //     console.error(
  //       'Invalid token detected. Navigating to login page.'
  //     );
  //     navigate('/login');
  //   }
  // }, [navigate]);

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
                message.info('Logout...');
                setTimeout(() => {
                  localStorage.clear();
                  navigate('/login');
                }, 2000);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="displayWindow">{children}</div>
      <footer>
        <FooterMenu />
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
