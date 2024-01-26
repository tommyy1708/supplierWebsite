import { useNavigate } from 'react-router-dom';

export const HandleApiResponse = (response) => {
  const navigate = useNavigate();
  if (!response || response.error || response.errCode !== 0) {
    navigate('/login');
    // You can also perform additional actions like displaying an error message
    console.error('API request failed:', response);
    return false;
  }

  return true;
};
