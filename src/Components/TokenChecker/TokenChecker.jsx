import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifyToken } from '../../request/api';
const TokenChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!VerifyToken()) {
      navigate('/login');
    }
  }, [navigate]);
  // Render the children if the token is not expired
  return <>{children}</>;
};

export default TokenChecker;
