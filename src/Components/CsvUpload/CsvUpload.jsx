import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { UploadCsv } from '../../request/api';
const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const customRequest = async ({ file, onSuccess, onError }) => {
  console.log("🚀 ~ customRequest ~ file:", file)

    // await setCsvFile(file);
    // if (onSuccess) {
    //   message.info('upload success');
    //   setIsDisable(false);
    // } else {
    //   console.log(onError);
    // }
  };

  const submit_csv = async () => {
    const response = await UploadCsv(fileList[0]);
    if (response.status === 'success') {
      message.success('Success');
    }
  };

  const beforeUpload = (file) => {
    // You can add custom validation logic here if needed
    console.log('Before upload:', file);
    return true;
  };

  //!!
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/xxx.png',
    // },
  ]);
  const handleChange = (info) => {
    console.log('🚀 ~ handleChange ~ info:', info);
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);

    setIsDisable(false);
  };
  const props = {
    action: 'http://127.0.0.1:8000/api/upload-csv',
    onChange: handleChange,
    multiple: true,
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
        {...props}
        fileList={fileList}
        // customRequest={customRequest}
        beforeUpload={beforeUpload}
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
