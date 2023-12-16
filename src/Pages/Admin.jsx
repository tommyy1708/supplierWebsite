import React, { useEffect, useState } from 'react';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Table, Button, message } from 'antd';
import {
  Outlet,
  useNavigate,
  useLocation,
  Link,
  useParams,
} from 'react-router-dom';
import { GetOrders } from '../request/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Filter from '../Components/Filter/Filter';

const Admin = () => {
  const navigate = useNavigate();
  const { userRol } = useParams();
  const [sUserName, setSUserName] = useState(
    localStorage.getItem('username')
  );
  const [flag, setFlag] = useState(true);
  const [ordersData, setOrdersData] = useState('');
  const location = useLocation();
  const [showSpin, setShowSpin] = useState(false);
  const navMenu = [
    { icon: <HomeOutlined />, title: 'HOME', url: '/admin' },
  ];
  const fetchCategoryList = async () => {
    const orders = await GetOrders();
    setOrdersData(orders.data);
  };

  const exportToCSV = (apiData, fileName) => {
    let orderData = [...apiData.items];
    orderData.push({
      client_name: apiData.casher,
      client_phone: apiData.phone,
      client_email: apiData.email,
      client_address: apiData.address,
    });
    //!! new format: edit here orderData.push({ 'test': 123 });
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(orderData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  function parseDateString(dateString) {
    const isoString = dateString.replace(/-(?=\d{2}:\d{2}$)/, 'T');
    return new Date(isoString);
  }
  useEffect(() => {
    if (flag) {
      fetchCategoryList();
      setFlag(false);
    }
  }, [flag]);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '30%',
      sorter: (a, b) =>
        parseDateString(b.date) - parseDateString(a.date),
      defaultSortOrder: 'ascend',
      render: (text, record) => (
        <>
          <span>{record.date.split('-').slice(0, 3).join('-')}</span>
        </>
      ),
    },
    {
      title: 'Order number',
      dataIndex: 'order_number',
      width: '40%',

      render: (text, record) => (
        <>
          <span>{record.order_number}</span>
        </>
      ),
    },
    {
      title: 'Client Name',
      key: 'casher',
      dataIndex: 'casher',
      width: '20%',
      render: (text, record) => (
        <>
          <span>{record.casher}</span>
        </>
      ),
    },
    {
      title: 'Download',
      dataIndex: 'index',
      width: '20%',
      render: (text, record) => (
        <>
          <button
            onClick={() =>
              exportToCSV(record, `${record.order_number}`)
            }
          >
            Download
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{sUserName}</h2>
          </div>
          <div className="headerRight">
            <button
              onClick={(e) => {
                message.info('Logout......');
                setShowSpin(true);
                setTimeout(() => {
                  localStorage.clear();
                  navigate('/login');
                }, 3000);
              }}
            >
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
      <div className="displayWindow">
        <Filter />
        <Table
          bordered
          columns={columns}
          dataSource={ordersData}
          rowKey="order_number"
          pagination={false}
        />
      </div>
      <footer>
        <div className="footerNavMenu dark">
          {navMenu !== null || undefined
            ? navMenu.map((e, index) => (
                <Link key={index} to={e.url}>
                  <p>{e.icon}</p>
                  <span>{e.title}</span>
                </Link>
              ))
            : null}
        </div>
        <div className="footerCopyright dark">
          <p>
            © {process.env.REACT_APP_YEAR} Copyright by{' '}
            {process.env.REACT_APP_COMPANY_NAME} All rights reserved.
          </p>
          <p>Powered By {process.env.REACT_APP_AUTHOR_NAME}</p>
        </div>
      </footer>
    </>
  );
};

export default Admin;
