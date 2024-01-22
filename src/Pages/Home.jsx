import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Category from '../Components/Category/Category';

const Home = () => {
  const location = useLocation();
  // const decodedToken = jwtDecode(localStorage.getItem('token'));
  // console.log("🚀 ~ Home ~ decodedToken:", decodedToken)
  // const userData = JSON.parse(decodedToken.userInfo)
  // console.log(userData.userInfo);

//   const extractData = () => {
//   for (const key in decodedToken[0]) {
//     if (decodedToken[0].hasOwnProperty(key)) {
//       console.log(`${key}: ${decodedToken[0][key]}`);
//     }
//   }
// }
  return (
    <>
      {location.pathname === '/' ? <Category /> : <Outlet></Outlet>}
    </>
  );
};

export default Home;
