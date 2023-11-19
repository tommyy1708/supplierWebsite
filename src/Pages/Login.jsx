import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router';
import Carosuels from '../Components/Carosuels/Carosuels';
import { LoginApi } from '../request/api';
function Login() {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
  const [count, setCount] = useState(0);
  const onSubmit = async (values) => {
    setShowLoading(true);
    setCount((prev) => prev + 1);
    if (count >= 4) {
      message.error(
        'You had multiple wrong, please contact manager!'
      );
    }
    const loginResponse = await LoginApi(values);

    if (!loginResponse) {
      return message.error(
        'Something wrong, contact network manager'
      );
    }
    if (loginResponse.errCode === 0) {
      localStorage.setItem('username', loginResponse.data.userName);
      localStorage.setItem('token', loginResponse.data.token);
      message.success(loginResponse.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (loginResponse.errCode === 1) {
      message.info(loginResponse.message);
      setTimeout(() => {
        setShowLoading(false);
      }, [2000]);
    }
  };

  return (
    <div id="login">
      {showSpin ? (
        <Spin size="large" delay="200" fullscreen="true" />
      ) : null}
      <div className="login_title">{/* <Carosuels /> */}</div>
      <div className="login_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
