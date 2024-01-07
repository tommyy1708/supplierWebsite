import React, { useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { Product } from '../../request/api';

const AddNewProducts = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [form] = Form.useForm();
  // Function to handle form submission
  const handleSubmit = async (data) => {
    const response = await Product(JSON.stringify(data));
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
  const [formLayout, setFormLayout] = useState('horizontal');
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

  return (
    <Form form={form} onFinish={handleSubmit} layout={formLayout}>
      <Form.Item
        label="Item Code"
        name="item_code"
        rules={[
          {
            required: true,
            message: 'Please enter the Item Code',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Name"
        name="item"
        rules={[
          {
            required: true,
            message: 'Please enter the product name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please enter the product price',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please enter the product category',
          },
        ]}
      >
        <Select
          style={{
            width: 120,
          }}
          options={[
            {
              value: 'bundles',
              label: 'Bundles',
            },
            {
              value: 'bob-wigs',
              label: 'Bob-Wigs',
            },
            {
              value: 'short-wigs',
              label: 'Short-Wigs',
            },
            {
              value: 'accessories',
              label: 'Accessories',
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewProducts;
