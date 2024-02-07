import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { UploadCsv } from '../../request/api';
const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const customRequest = async ({ file, onSuccess, onError }) => {
    await setCsvFile(file);
    if (onSuccess) {
      message.info('upload success');
      setIsDisable(false);
    } else {
      console.log(onError);
    }
  };

  const submit_csv = async () => {
    const response = await UploadCsv(csvFile);
    if (response.status === 'success') {
      message.success('Success');
    }
  };

  const beforeUpload = (file) => {
    // You can add custom validation logic here if needed
    console.log('Before upload:', file);
    return true;
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <Upload
        listType="text"
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button
        type="primary"
        onClick={submit_csv}
        disabled={isDisable}
      >
        Submit
      </Button>
    </Space>
  );
};

export default CsvUpload;
