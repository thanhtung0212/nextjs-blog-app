import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import AuthenWrapper from '../components/AuthenWrapper';

const LoginPage = () => {
  return (
    <AuthenWrapper>
      <Header
        heading={'Welcome to our app!'}
        paragraph={'Sign in to access your account. New? Sign up for free!'}
        linkName={'Sign up'}
        linkUrl={'/signup'}
      />
      <Login />
    </AuthenWrapper>
  );
};

export default LoginPage;
