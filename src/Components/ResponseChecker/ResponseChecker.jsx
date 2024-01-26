import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResponseChecker = ( response ) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleApiResponse(response);
  }, [response]);

  const handleApiResponse = (response) => {
    if (!response || response.error || response.errCode !== 0) {
      // Redirect to the login page
      navigate('/login');
      // You can also perform additional actions like displaying an error message
      console.error('API request failed');
      return false;
    }
    return true;
  };

  return null; // Or you can return some UI if needed
};

export default ResponseChecker;
