import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { GetCategoryList } from '../../request/api';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons';
import styles from './Listing.module.css';
import CheckOutContent from '../../store/CheckOutContent';

const Listing = () => {
  const ctx = useContext(CheckOutContent);
  const [itemsData, setItemsData] = useState('');
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  const params = useParams();

  const fetchCategoryList = async () => {
    let categoryName = params.id;
    const categoryList = await GetCategoryList(categoryName);
    setItemsData(categoryList.data);
  };

  const tempAmount = (item) => {
    const indexCode = item.item_code;
    const foundItem = ctx.cartData.items.find(
      (e) => e.item_code === indexCode
    );
    if (foundItem) {
      return foundItem.quantity;
    } else {
      return 0;
    }
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
      width: '50%',
      render: (text, record) => (
        <span
          style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
        >
          <p>ItemCode:{record.item_code}</p>
          <p>{text}</p>
        </span>
      ),
    },
    {
      title: 'Price',
      key: 'msrp',
      dataIndex: 'price',
      width: '10%',
      render: (_, record) => (
        <>
          <p className={`${styles.listingPrice}`}>{record.price}</p>
        </>
      ),
    },
    {
      title: 'Qt.',
      key: 'quantity',
      width: '10%',
      render: (_, record) => (
        <>
          <p className={`${styles.amount}`}>{tempAmount(record)}</p>
        </>
      ),
    },
    {
      title: ' ',
      width: '30%',
      render: (_, record) => (
        <span className={`${styles.buttonsFrame}`}>
          <span>
            <MinusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.subItemToCart(record)}
            />
          </span>
          <span>
            <PlusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.addItemToCart(record)}
            />
          </span>
        </span>
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
    </div>
  );
};

export default Listing;
