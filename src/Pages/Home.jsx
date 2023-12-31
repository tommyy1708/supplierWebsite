import React, { useState } from 'react';
import {
  Outlet,
  useLocation,
} from 'react-router-dom';
import Category from '../Components/Category/Category';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';

const Home = () => {
  const location = useLocation();
  const [showSpin, setShowSpin] = useState(false);
  return (
    <>
        <SpinOverLay showSpin={showSpin} />
        {location.pathname === '/' ? <Category /> : <Outlet></Outlet>}
    </>
  );
};

export default Home;
