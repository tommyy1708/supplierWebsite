import React from 'react';
import { TestApi } from '../../request/api';
const Testing = () => {
  const handling = async () => {
    console.log('clicked')
    let params = {
      category: 'bundles',
    }
    const response = await TestApi(params);
    console.log(response);
  };
  return (
    <div>
        <button onClick={handling}>redis</button>
    </div>
  );
}

export default Testing;
