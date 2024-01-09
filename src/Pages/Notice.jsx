import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GetAnnouncement, UpdateAnnouncement } from '../request/api';
const Notice = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // Add your logic here to handle the form submission/update notice
    setLoading(true);
    const response = await UpdateAnnouncement(values);
    message.info(response.message);
    setTimeout(() => {
      setLoading(false);
      message.success('Notice updated successfully');
      window.location.reload()
    }, 2000);
  };

  const [announcement, setAnnouncement] = useState('');
  const fetchData = async () => {
    const announcement = await GetAnnouncement();
    setAnnouncement(announcement.data[0].content);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="notice-editor-container">
      <h6>
        If you don't want to display any notice on the Login page,
        please keep input empty then submit
      </h6>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="content" label="Content">
          <Input.TextArea
            rows={1}
            placeholder={announcement}
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
