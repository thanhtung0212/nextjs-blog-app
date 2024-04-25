import React from 'react';
import Header from '../components/Header';
import Signup from '../components/Signup';
import AuthenWrapper from '../components/AuthenWrapper';

const SignUpPage = () => {
  return (
    <AuthenWrapper>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />
      <Signup />
    </AuthenWrapper>
  );
};

export default SignUpPage;
