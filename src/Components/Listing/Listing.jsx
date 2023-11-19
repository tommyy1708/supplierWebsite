import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Table, Space, Button } from 'antd';
const Listing = () => {
  const [itemsData, setItemsData] = useState([
    {
      item_code: 'HB111-0',
      item: 'bundles',
      price: 123.0,
      category: 'bundles',
    },
    {
      item_code: 'HB112-1',
      item: 'bob-wigs',
      price: 222.0,
      category: 'bob-Wigs',
    },
    {
      item_code: 'HB113-2',
      item: 'short-wigs',
      price: 234.0,
      category: 'short-Wigs',
    },
    {
      item_code: 'HB114-3',
      item: 'accessories',
      price: 555.0,
      category: 'accessories',
    },
  ]);
  const [flag, setFlag] = useState(true);
  const { id } = useParams();
  const curItemsData = itemsData.filter(
    (e) => e.category.indexOf(id) !== -1
  );
  useEffect(() => {
    if (flag) {
      setItemsData(curItemsData);
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
        <Table columns={columns} dataSource={itemsData} rowKey="item_code"/>
      </div>
    </div>
  );
};

export default Listing;
