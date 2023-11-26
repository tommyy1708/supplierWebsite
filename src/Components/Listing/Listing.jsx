import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { GetCategoryList } from '../../request/api';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons';
import styles from './Listing.module.css';
const Listing = () => {
  const [itemsData, setItemsData] = useState('');
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();
  // const curItemsData = itemsData.filter(
  //   (e) => e.category.indexOf(id) !== -1
  // );
  const params = useParams();

  const fetchCategoryList = async () => {
    let categoryName = params.id;
    const categoryList = await GetCategoryList(categoryName);
    setItemsData(categoryList.data);
  };
  useEffect(() => {
    if (flag) {
      fetchCategoryList();
      setFlag(false);
    }
  }, [flag]);

  const columns = [
    {
      title: 'Item Description',
      key: 'item',
      dataIndex: 'item',
      width: '60%',
      render: (text, record) => (
        <div
          style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
        >
          <p>ItemCode:{record.item_code}</p>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
      width: '15%',
      render: (_, record) => (
        <>
          <p className={`${styles.listingPrice}`}>{record.price}</p>
        </>
      ),
    },
    {
      title: ' ',
      width: '25%',
      render: (_, record) => (
        <div className={`${styles.buttonsFrame}`}>
          <div>
            <MinusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
            />
          </div>
          <div>
            <PlusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.listingFrame}`}>
      <div className="inquiry_table">
        <Table
          title={() => (
            <Button onClick={() => navigate('/')}>Back</Button>
          )}
          footer={() => (
            <Button onClick={() => navigate('/')}>Back</Button>
          )}
          bordered
          columns={columns}
          dataSource={itemsData}
          rowKey="item_code"
          pagination={false}
        />
      </div>
      <div>
        <Button onClick={() => navigate('/')}>Back</Button>
      </div>
    </div>
  );
};

export default Listing;
