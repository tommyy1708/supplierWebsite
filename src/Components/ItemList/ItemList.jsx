import React, { useEffect, useState } from 'react';
import {
  Table,
  message,
  Input,
  Button,
  Popconfirm,
  notification,
} from 'antd';
import { GetUserList, CustomerDelete } from '../../request/api';

const ItemList = () => {
  notification.config({
    placement: 'topLeft',
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const fetchData = async () => {
    const response = await GetUserList();
    if (response.errCode !== 0) {
      return message.error(response.message);
    } else {
      setUsers(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    // Fetch user data from the backend (replace with your actual API endpoint)
    fetchData();
  }, []);

  const filterUsers = () => {
    const filteredUsers = users.filter((user) => {
      const emailMatch = user.email
        .toLowerCase()
        .includes(searchEmail.toLowerCase());
      const phoneMatch = user.phone.includes(searchPhone);
      return emailMatch && phoneMatch;
    });
    setUsers(filteredUsers);
  };

  // Function to reset the search filters and fetch all users
  const resetFilters = async () => {
    setSearchEmail('');
    setSearchPhone('');
    setLoading(true);

    const response = await GetUserList();

    setUsers(response.data);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
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
    const response = await CustomerDelete(e.id);

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
    <div className="customer-list-container">
      <div>
        <Input
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Input
          placeholder="Search by Phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <Button type="primary" onClick={filterUsers}>
          Search
        </Button>
        <Button onClick={resetFilters}>Reset</Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey={(record) => record.id + record.phone}
      />
    </div>
  );
};

export default ItemList;
