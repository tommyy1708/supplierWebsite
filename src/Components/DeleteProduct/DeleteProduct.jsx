import React, { useState } from 'react';
import {
  Input,
  Table,
  notification,
  Button,
  Popconfirm,
} from 'antd';
import { GetProduct, ProductDelete } from '../../request/api';

const DeleteProduct = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [searchData, setSearchData] = useState('');
  const { Search } = Input;
  const onSearch = async (value, _e, info) => {
    if (info.source === 'clear') {
      console.log('info = ', info.source);
    } else if (info.source === 'input') {
      if (value !== null && value !== '' && value !== undefined) {
        const data = {
          keyWord: value,
        };
        // eslint-disable-next-line
        const response = await GetProduct(data);
        setSearchData(response.data);
      }
    }
  };

  const columns = [
    {
      title: 'Item Code',
      key: 'item_code',
      dataIndex: 'item_code',
      render: (text, record) => <p>{record.item_code}</p>,
    },
    {
      title: 'Item Description',
      key: 'item',
      dataIndex: 'item',
      render: (text, record) => (
        <span
          style={{
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <p>{text}</p>
        </span>
      ),
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
      render: (_, record) => (
        <>
          <p>{record.price}</p>
        </>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      render: (_, record) => (
        <>
          <p>{record.category}</p>
        </>
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
    const response = await ProductDelete(e.item_code);

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
      <Search
        placeholder="input item code"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={searchData}
        rowKey="item_code"
        pagination={false}
      />
    </>
  );
};

export default DeleteProduct;
