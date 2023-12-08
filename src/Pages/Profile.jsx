import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { PasswordUpdate } from '../request/api';
const Profile = () => {
  const username = localStorage.getItem('username');
  const onFinish = async (values) => {
    const newPassWord = values.confirm;

    const data = {
      username: username,
      newPassWord:newPassWord
    };

    const result = await PasswordUpdate(data);
    console.log("🚀 ~ file: Profile.jsx:15 ~ onFinish ~ result:", result)

    if (result.errCode !== 0) {
      message.error('Something wrong, please contact manager')
      return;
    }

    message.success('Password update success!')
    return;
  };
  message.config({
    top: 50,
    duration: 2,
    maxCount: 2,
  });
  const onFinishFailed = (errorInfo) => {
      const errorMessage = errorInfo.errorFields[0].errors[0];
    message.error(errorMessage);
      };
  return (
    <div className="profileFrame">
      <Form
        name="userInfoForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Username">
          <Input
            defaultValue={`${localStorage.getItem('username')}`}
            disabled
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue('newPassword') === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'The new password that you entered do not match!'
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Profile;
