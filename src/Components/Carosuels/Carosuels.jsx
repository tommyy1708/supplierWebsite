import React from 'react';
import { Carousel } from 'antd';
import logo from '../../assets/logo.png'
import description from '../../assets/description.png';
import colors from '../../assets/allcolors.jpg';

const Carosuels = () => {
  const contentStyle = {
    height: '100vh',
    color: '#171717',
    textAlign: 'center',
    background: '#fff',
  };
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src={logo} alt="#" width="100%" height="100%" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src={description}
              alt="#"
              width="100%"
              height="100%"
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={colors} alt="#" width="100%" height="100%" />
          </h3>
        </div>
      </Carousel>
    </div>
  );
}

export default Carosuels;
