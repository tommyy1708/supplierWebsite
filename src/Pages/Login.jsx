import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import { LoginApi } from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import Announcement from '../Components/Announcement/Announcement';

function Login() {
  const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [userRole, setUserRole] = useState('');
  const onSubmit = async (values) => {
    setShowSpin(true);
    try {
      const loginResponse = await LoginApi(values);

      if (loginResponse.errCode !== 0) {
        setTimeout(() => {
          setShowSpin(false);
        }, [2500]);
        return message.info(loginResponse.message);
      } else {
        const userRol = parseInt(loginResponse.data.admin);
        console.log("🚀 ~ file: Login.jsx:23 ~ onSubmit ~ userRol:", userRol)
        localStorage.setItem('first_name',loginResponse.data.first_name);
        localStorage.setItem('last_name',loginResponse.data.last_name);
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('userId', loginResponse.data.id);
        localStorage.setItem('admin', loginResponse.data.admin);
        if (userRol === 1) {
          setShowAdmin(true);
          navigate(`/admin`);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigateBasedOnRole = () => {
    if (parseInt(userRole) === 1) {
      setShowAdmin(true);
      navigate('/admin');
    } else {
      navigate('/');
    }
  };
  const retrieveAccount = () => {
    navigate('/forget-password')
    return;
  };

  return (
    <div id="login">
      <SpinOverLay showSpin={showSpin} />
      <div className="login_announcement">
        <h2>Welcome</h2>
        <Announcement/>
      </div>
      <div className="login_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
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
            <Button
              type="link"
              htmlType="button"
              onClick={retrieveAccount}
            >
              Forget Password
            </Button>
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
