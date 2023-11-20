import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Table, Space, Button } from 'antd';
import { GetCategoryList } from '../../request/api';
const Listing = () => {
  const [itemsData, setItemsData] = useState('');
  const [flag, setFlag] = useState(true);
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
