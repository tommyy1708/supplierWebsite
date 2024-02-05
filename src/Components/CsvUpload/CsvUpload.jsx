import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { UploadCsv } from '../../request/api';
const CsvUpload = () => {
  const customRequest = async ({ file, onSuccess, onError }) => {
    const response =  await UploadCsv(file);
    console.log("🚀 ~ customRequest ~ response:", response)
    if (response.status === 'success') {
      message.success('Success')
    }
  };

  const beforeUpload = (file) => {
    // You can add custom validation logic here if needed
    console.log('Before upload:', file);
    return true;
  };

  return (
    <Upload
      customRequest={customRequest}
      beforeUpload={beforeUpload}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default CsvUpload;
