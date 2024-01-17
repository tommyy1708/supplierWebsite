import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Category } from '../../request/api';
import ImageUpload from '../ImageUpload/ImageUpload';
const AddNewCategory = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [form] = Form.useForm();

  // Function to handle form submission
  const handleSubmit = async (data) => {
    const response = await Category(JSON.stringify(data));

    if (response) {
      notification.success({
        message: response.message,
      });
    } else {
      notification.error({
        message: response.message,
      });
    }
    form.resetFields();
  };

  return (
    <div className="adminSubWindow">
      <Form form={form} onFinish={handleSubmit} layout="horizontal">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[
            {
              required: true,
              message: 'Please enter the Category Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <ImageUpload />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewCategory;
