import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Table,
  notification,
  Select,
  Button,
  message,
  Popconfirm,
} from 'antd';
import { GetCategoryApi, CategoryDelete } from '../../request/api';
const AdminCategory = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [flag, setFlag] = useState(true);

    const fetchData = async () => {
      const response = await GetCategoryApi();
      if (response && response.errCode === 0) {
        const categoryData = response.data;
        setCategoryList(categoryData);
      } else {
        return;
      }
    };

    useEffect(() => {
      fetchData();
      setFlag(false);
    }, [flag]);

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'categoryName',
      render: (text, record) => <p>{record.categoryName}</p>,
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render: (text, record) => (
        <></>
        // <span
        //   style={{
        //     wordWrap: 'break-word',
        //     wordBreak: 'break-word',
        //   }}
        // >
        //   <p>{text}</p>
        // </span>
      ),
    },
    {
      title: 'Delete',
      key: 'Delete',
      render: (_, record) => (
        <>
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => confirm(record)}
            onCancel={() => cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const confirm = async (e) => {
    const response = await CategoryDelete(e.categoryName);

    if (response.errCode === 1) {
      notification.error({
        message: response.message,
      });
    } else {
      notification.success({
        message: response.message,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const cancel = () => {
    return;
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={categoryList}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default AdminCategory;
