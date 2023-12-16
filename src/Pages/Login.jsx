import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router';
import { LoginApi } from '../request/api';
function Login() {
  const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(false);
  const [count, setCount] = useState(0);
  const [userRol, setUserRol] = useState('');

  const onSubmit = async (values) => {
    setShowSpin(true);
    setCount((prev) => prev + 1);
    if (count >= 4) {
      message.error(
        'You had multiple wrong, please contact manager!'
      );
    }
    try {
      const loginResponse = await LoginApi(values);

      if (loginResponse.errCode > 0) {
        return message.info(loginResponse.message);
      }

      const userRol = loginResponse.data.admin;
      localStorage.setItem('username', loginResponse.data.userName);
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('userId', loginResponse.data.userID);
     if (userRol === 1) {
        // setUserRol(userRol);
        navigate(`/admin/${userRol}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // if (loginResponse.errCode === 0 && userRole === 1) {
  //   localStorage.setItem('username', loginResponse.data.userName);
  //   localStorage.setItem('token', loginResponse.data.token);
  //   message.success(loginResponse.message);

  //   setTimeout(() => {
  //     navigate('/admin');
  //   }, 2000);
  // } else if (loginResponse.errCode === 0 && userRole === 0) {
  //   localStorage.setItem('username', loginResponse.data.userName);
  //   localStorage.setItem('token', loginResponse.data.token);
  //   message.success(loginResponse.message);

  //   setTimeout(() => {
  //     navigate('/');
  //   }, 2000);
  // } else if (loginResponse.errCode === 1) {
  //   message.info(loginResponse.message);
  //   setTimeout(() => {
  //     setShowSpin(false);
  //   }, [2000]);
  // }

  return (
    <div id="login">
      {showSpin ? (
        <Spin size="large" delay="200" fullscreen="true" />
      ) : null}
      <div className="login_announcement">
        <h2>Welcome</h2>
      </div>
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
