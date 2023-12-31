import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { SendVerifyCode } from '../request/api';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';
const ForgetPassword = () => {
  const [showSpin, setShowSpin] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const sendVerify = async (values) => {
    setIsDisabled(true);
    const response = await SendVerifyCode(values);
    if (response.errCode !== 0) {
      message.error(response.message);
      setTimeout(() => {
        setIsDisabled(false);
      }, [2500]);
      return;
    } else {
      message.success(response.message);
      setTimeout(() => {
        setIsDisabled(false);
      }, [60000]);
      return;
    }
  };
  return (
    <div className="login_box marginCenter">
      <h6>Enter your email to receive verification code</h6>
      <SpinOverLay showSpin={showSpin} />
      <Form name="verify" onFinish={sendVerify} autoComplete="off">
        <Row gutter={16}>
          <Col xs={24} sm={16}>
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
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item>
              <Button
                id="forget-submit-button"
                type="primary"
                htmlType="submit"
                disabled={isDisabled}
              >
                Send Code
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ForgetPassword;
