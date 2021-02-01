import React, { useEffect, useState } from 'react';
import { Row, Divider, Button, Typography } from 'antd';
import styled from 'styled-components';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LangSwitch } from 'features/Topbar';
import UserAuthForm from './UserAuthForm';

const RowWrapper = styled(Row)`
  background-image: url('https://cutewallpaper.org/21/js-wallpaper/Jay-Welborn-Beginning-React.jpg');
  height: 100vh;
  position: relative;
  background-size: cover;

  .login-content {
    width: 60rem;
    padding: 5rem;
    box-shadow: ${props => props.theme.lightShadow};
    background-color: #fff;
    border-radius: 0.6rem;
  }
`;

const LangSwithcer = styled(LangSwitch)`
  position: absolute;
  top: 3rem;
  right: 3rem;
`;

function UserAuth() {
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.Auth.token);
  const [isRegistering, setIsRegistering] = useState(false);

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  const { from } = location.state || { from: { pathname: '/dashboard' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <RowWrapper type="flex" justify="center" align="middle">
      <LangSwithcer />
      <div className="login-content">
        <Typography.Title className="text-center">
          {!isRegistering ? (
            <FormattedMessage id="Login" />
          ) : (
            <FormattedMessage id="Register" />
          )}
        </Typography.Title>
        <Divider />
        <UserAuthForm isRegistering={isRegistering} />
        <Row justify="center">
          <Button
            className="text-center"
            onClick={() => setIsRegistering(!isRegistering)}
            type="link"
          >
            <FormattedMessage id="Don't have an account?" />
          </Button>
        </Row>
      </div>
    </RowWrapper>
  );
}

export default UserAuth;
