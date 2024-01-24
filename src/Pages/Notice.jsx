import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GetAnnouncement, UpdateAnnouncement } from '../request/api';
const Notice = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    if (values.content === undefined) {
       message.info('The announcement can not be empty')
      setLoading(false);
      return
    }
    const response = await UpdateAnnouncement(values.content);

    if (response.errCode === 2) {
      message.info(response.message);
    } else if (response.errCode === 1) {
      message.error(response.message);
    } else {
      message.success(response.message);
    }
    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 2000);
  };

  const fetchData = async () => {
    const response = await GetAnnouncement();
    if (response.errCode !== 0) {
      message.error('Something went wrong');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="notice-editor-container">
      <h6>
        If you don't want to display any notice on the Login page,
        please keep input empty then submit
        <br />
      </h6>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="content" label="Content">
          <Input.TextArea
            rows={1}
            placeholder={'make new announcement here'}
            maxLength={300}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Notice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Notice;
