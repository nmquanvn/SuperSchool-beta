import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useHome = ({ to = '/' }) => {
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    if (isLogin) {
      if (window) {
        window.scrollTo(0, 0);
      }
      setIsRedirect(true);
    }
  }, [isLogin]);
  return isRedirect ? <Redirect to={to} /> : null;
};

export default useHome;
