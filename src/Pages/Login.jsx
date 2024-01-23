import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import { LoginApi } from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
import Announcement from '../Components/Announcement/Announcement';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(false);
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
        // userRol to determine RBAC
        const userRol = jwtDecode(loginResponse.userToken).admin;
        // const first_name = jwtDecode(loginResponse.userToken).first_name;
        localStorage.setItem(
          'first_name',
          jwtDecode(loginResponse.userToken).first_name
        );
        localStorage.setItem(
          'last_name',
          jwtDecode(loginResponse.userToken).last_name
        );
        localStorage.setItem(
          'userId',
          jwtDecode(loginResponse.userToken).id
        );
        localStorage.setItem(
          'token',
          loginResponse.userToken
        );


        if (userRol === 1) {
          navigate(`/admin`);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
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
