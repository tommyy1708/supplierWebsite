import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { UploadCsv, UpdateCsv } from '../../request/api';
const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState('');
  const [isDisable, setIsDisable] = useState(true);
    const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log('🚀 ~ customRequest ~ file:', file);

    // await setCsvFile(file);
    if (onSuccess) {
      message.info('upload success');
      file.status = 'done';
      setIsDisable(false);
    } else {
      console.log(onError);
    }
  };

  const submit_csv = async () => {
    // const response = await UploadCsv(fileList[0]);
    // let url = JSON.stringify(fileUrl)
    const response = await UpdateCsv(fileUrl);
    console.log('🚀 ~ constsubmit_csv= ~ response:', response);
    // if (response.status === 'success') {
    //   message.success('Success');
    // }
  };

  const beforeUpload = (file) => {
    // You can add custom validation logic here if needed
    console.log('Before upload:', file);
    return true;
  };

  //!!

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        // file.url = file.response.path;
        setFileUrl(file.response.url);
      }
      setIsDisable(false);
      return file;
    });
    setFileList(newFileList);

  };
  const props = {
    action: 'http://127.0.0.1:8000/api/upload-csv',
    onChange: handleChange,
    multiple: false,
  };
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      {/* <Upload
        maxCount={1}
        listType="text"
        // {...props}
        fileList={fileList}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      > */}
      <Upload
        maxCount={1}
        listType="text"
        {...props}
        fileList={fileList}
        onChange={handleChange}
        // customRequest={customRequest}
        // beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button
      onClick={submit_csv}
        type="primary"
        disabled={isDisable}
      >
        Submit
      </Button>
    </Space>
  );
};

export default CsvUpload;
