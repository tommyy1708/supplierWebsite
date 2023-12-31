import React, { useEffect, useState } from 'react';
import { Table, message, Input, Button } from 'antd';
import { GetUserList } from '../request/api';
const CustomerList = () => {
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
      const emailMatch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
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
  ];

  return (
    <div className="customer-list-container">
      <h1>Customer List</h1>
      <div style={{ marginBottom: '16px' }}>
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

export default CustomerList;
