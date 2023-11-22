import React, { useEffect, useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { GetCategoryList } from '../../request/api';
import styles from './Listing.module.css'
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
      title: 'ItemCode',
      dataIndex: 'item_code',
      key: 'item_code',
    },
    {
      title: 'Item Description',
      key: 'item',
      dataIndex: 'item',
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
    },
  ];

  return (
    <div>
      <div className={`${styles.listingHeader}`}>
        <Button onClick={() => navigate('/')}>
          Back to Category
        </Button>
      </div>
      <div className="inquiry_table">
        <Table
          columns={columns}
          dataSource={itemsData}
          rowKey="item_code"
        />
      </div>
    </div>
  );
};

export default Listing;
