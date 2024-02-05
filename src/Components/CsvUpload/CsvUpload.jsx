// import React, {useState} from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Upload } from 'antd';

// const props = {
//   action: '//jsonplaceholder.typicode.com/posts/',
//   listType: 'picture',
//   previewFile(file) {
//     console.log('Your upload file:', file);
//     // Your process logic. Here we just mock to the same file
//     return fetch(
//       '/api/upload-csv',
//       // 'https://next.json-generator.com/api/json/get/4ytyBoLK8',
//       {
//         method: 'POST',
//         body: file,
//       }
//     )
//       .then((res) => res.json())
//       .then(({ thumbnail }) => thumbnail);
//   },
// };
// const CsvUpload = () => {


//    return (
//      <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Upload</Button>
//   </Upload>
//    );
// }

// export default CsvUpload;


import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { UploadCsv } from '../../request/api';
const CsvUpload = () => {
  const customRequest = async ({ file, onSuccess, onError }) => {
    const response =  await UploadCsv(file);
    console.log("🚀 ~ customRequest ~ response:", response)
    // const formData = new FormData();
    // formData.append('file', file);

    // fetch('/api/upload-csv', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // Handle success
    //     onSuccess();
    //     message.success('File uploaded successfully');
    //     console.log('File uploaded successfully:', result);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     onError(error);
    //     message.error('File upload failed');
    //     console.error('File upload failed:', error);
    //   });
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
