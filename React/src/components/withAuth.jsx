import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  const Auth = (props) => {
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('token');
    

    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    }, [token, navigate]);

    return token ? <Component {...props} /> : null;
  };

  return Auth;
};

export default withAuth;