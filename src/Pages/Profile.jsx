import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { PasswordUpdate, GetUserInfo } from '../request/api';
import CheckOutContent from '../store/CheckOutContent';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';

const Profile = () => {
  const ctx = useContext(CheckOutContent
);
  const [flag, setFlag] = useState(true);
  const [showSpin, setShowSpin] = useState(true);
  const username = localStorage.getItem('username');
  const onFinish = async (values) => {
    const newPassWord = values.confirm;
    const data = {
      username: username,
      newPassWord: newPassWord,
    };

    const result = await PasswordUpdate(data);

    if (result.errCode !== 0) {
      message.error('Something wrong, please contact manager');
      return;
    }

    message.success('Password update success!');
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

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    const data = {
      userId: userId,
    };
    const response = await GetUserInfo(data);
       if (response.errCode !== 0) {
         return message.error('server error');
       } else {
         setShowSpin(false);
         ctx.setUserInfo(response.data);
         return;
       }
  };

  useEffect(() => {
    if (flag) {
      fetchUserInfo()
      setFlag(false);
    }
  }, [flag]);

  return (
    <div className="profileFrame">
      {showSpin ? (
        <SpinOverLay showSpin={showSpin} />
      ) : (
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
          <Form.Item label="Phone Number">
            <Input defaultValue={ctx.userInfo.phone} />
          </Form.Item>
          <Form.Item label="Address">
            <Input defaultValue={ctx.userInfo.address} />
          </Form.Item>
          <Form.Item label="Email">
            <Input defaultValue={ctx.userInfo.email} />
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
      )}
    </div>
  );
};

export default Profile;
