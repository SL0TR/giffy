import React from 'react';
import { Row, Form, Input, Button } from 'antd';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import getValidateMessages from 'lib/helpers/getValidationMessages';
import PropTypes from 'prop-types';
import { loginRequest, registerRequest } from './reducer';

function UserAuthForm({ isRegistering }) {
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const onFinish = formData => {
    if (isRegistering) {
      dispatch(
        registerRequest({
          formData,
          successText: `${messages['Successfully registered!']}`,
        }),
      );
    } else {
      dispatch(
        loginRequest({
          formData,
          successText: `${messages['Successfully logged in!']}`,
        }),
      );
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      validateMessages={getValidateMessages(messages, 'name')}
    >
      <Form.Item
        className="mb-1"
        name="email"
        rules={[{ required: true }, { type: 'email' }]}
        hasFeedback
      >
        <Input placeholder={messages.Email} />
      </Form.Item>

      <Form.Item
        className="mb-3"
        name="password"
        rules={[
          { required: true },
          {
            min: 4,
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder={messages.Password} />
      </Form.Item>
      {isRegistering && (
        <Form.Item
          className="mb-3"
          name="password_confirm"
          hasFeedback
          rules={[
            {
              required: true,
            },
            {
              min: 4,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  messages['The two passwords that you entered do not match!'],
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder={messages['Confirm Password']} />
        </Form.Item>
      )}

      <Row type="flex" justify="center">
        <Form.Item>
          <Button
            size="large"
            className="px-4"
            type="primary"
            htmlType="submit"
          >
            {messages.Submit}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

UserAuthForm.propTypes = {
  isRegistering: PropTypes.bool,
};

export default UserAuthForm;
