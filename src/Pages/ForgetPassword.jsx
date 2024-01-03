import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SendVerifyCode } from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
const ForgetPassword = () => {
  const [showSpin, setShowSpin] = useState(false);
  const sendVerify = async (values) => {
    setShowSpin(true);
    const response = await SendVerifyCode(values);
    if (response) {
      message.info(response.message);
      setTimeout(() => {
        setShowSpin(false);
      }, [2500]);
      return;
    }
    return;
  };
  return (
    <div className="login_box marginCenter">
      <h6>Enter your email to receive verification code</h6>
      <SpinOverLay showSpin={showSpin} />
      <Form name="verify" onFinish={sendVerify} autoComplete="off">
        <Form.Item
          label="E-mail"
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;
