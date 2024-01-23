import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { GetOrders } from '../request/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Filter from '../Components/Filter/Filter';
import SpinOverLay from '../Components/SpinOverLay/SpinOverLay';


const Admin = () => {
  // const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(true);
  const [flag, setFlag] = useState(true);
  const [ordersData, setOrdersData] = useState('');

  // const navMenu = [
  //   { icon: <HomeOutlined />, title: 'HOME', url: '/admin' },
  // ];

  const fetchCategoryList = async () => {
    const orders = await GetOrders();

    if (orders.errCode !== 0) {
      message.error(orders.message);
      return;
    } else {
      const result = JSON.parse(orders.data);
      setOrdersData(result);
      setShowSpin(false);
    }
  };

  const exportToCSV = (apiData, fileName) => {
    let orderData = [];
    for (let i = 0; i < apiData.items.length; i++) {
      orderData.push({
        item_code: apiData.items[i].item_code,
        item: apiData.items[i].item,
        quantity: apiData.items[i].quantity,
      });
    }

    orderData.push({
      Customer:
        'Name:' +
        apiData.first_name +
        ' ' +
        apiData.last_name +
        '\n' +
        'Phone:' +
        apiData.phone +
        '\n' +
        'Mobile:' +
        apiData.mobile_number +
        '\n' +
        'Email:' +
        apiData.email +
        '\n' +
        'Address:' +
        apiData.address +
        '\n' +
        'Shipping_address:' +
        apiData.shipping_address +
        '\n',
    });

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
      width: '15%',
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
      width: '30%',

      render: (text, record) => (
        <>
          <span>{record.order_number}</span>
        </>
      ),
    },
    {
      title: 'Client Name',
      key: 'casher',
      width: '10%',
      render: (text, record) => (
        <>
          <span>{`${record.first_name} ${record.last_name}`}</span>
        </>
      ),
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
      width: '10%',
      render: (text, record) => (
        <>
          <span>{record.phone}</span>
        </>
      ),
    },
    {
      title: 'E-mail',
      key: 'email',
      dataIndex: 'email',
      width: '10%',
      render: (text, record) => (
        <>
          <span>{record.email}</span>
        </>
      ),
    },
    {
      title: 'Download',
      dataIndex: 'index',
      width: '25%',
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
  // const decodedToken = jwtDecode(localStorage.getItem('token'));
  // console.log(decodedToken);
  return (
    <>
      {showSpin ? <SpinOverLay showSpin={showSpin} /> : null}
      {/* <div className="headerFrame">
        <div className="header dark">
          <div className="headerLeft">
            <h2>Welcome-{firstName + ' ' + lastName}</h2>
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
      </div> */}
      <div className="adminWindow">
        <Filter setOrdersData={setOrdersData} />
        <Table
          bordered
          columns={columns}
          dataSource={ordersData}
          rowKey="order_number"
          pagination={false}
        />
      </div>
      {/* <footer>
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
      </footer> */}
    </>
  );
};

export default Admin;
