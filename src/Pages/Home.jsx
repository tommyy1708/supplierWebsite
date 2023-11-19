import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation} from 'react-router-dom';
import { Button, message } from 'antd';
import Category from '../Components/Category/Category';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sUserName, setSUserName] = useState(
    localStorage.getItem('username')
  );
  return (
    <>
      <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{sUserName}</h2>
          </div>
          <div className="headerRight">
            <Button
              onClick={(e) => {
                message.info('Logout......');
                setTimeout(() => {
                  localStorage.clear();
                  navigate('/login');
                }, 3000);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="displayWindow">
        {location.pathname === '/' ? <Category /> : <Outlet></Outlet>}
      </div>
      <footer className="footer">
        <p>
          © {process.env.REACT_APP_YEAR} Copyright by{' '}
          {process.env.REACT_APP_COMPANY_NAME} All rights reserved.
        </p>
        <p>Powered By {process.env.REACT_APP_AUTHOR_NAME}</p>
      </footer>
    </>
  );
};

export default Home;
