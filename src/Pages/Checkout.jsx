import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Typography } from 'antd';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons';
import CheckOutContent from '../store/CheckOutContent';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  const [itemsData, setItemsData] = useState('');
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  const fetchCategoryList = async () => {
    console.log(ctx.cartData);
    if (!ctx.cartData) {
      return;
    } else {
      setItemsData(ctx.cartData.items);
    }

    console.log(itemsData);
  };

  const tempAmount = (item) => {
    const indexCode = item.item_code;
    const foundItem = ctx.cartData.items.find(
      (e) => e.item_code === indexCode
    );
    if (foundItem) {
      return foundItem.amount;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (flag) {
      fetchCategoryList();
      console.log(ctx.cartData);
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
        <div
          style={{
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
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
      width: '10%',
      render: (_, record) => (
        <>
          <p>{record.price}</p>
        </>
      ),
    },
    {
      title: 'Qt.',
      key: 'amount',
      width: '10%',
      render: (_, record) => (
        <>
          <p>{tempAmount(record)}</p>
        </>
      ),
    },
    {
      title: ' ',
      width: '10%',
      align: 'center',
      colSpan:0,
      render: (_, record) => (
          <div className="checkout-buttonsFrame">
            <MinusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.subItemToCart(record)}
            />
          </div>
      ),
    },
    {
      title: ' ',
      width: '10%',
      align: 'center',
      colSpan:0,
      render: (_, record) => (
          <div>
            <PlusCircleTwoTone
              style={{ fontSize: '55rem', color: '#08c' }}
              onClick={() => ctx.addItemToCart(record)}
            />
          </div>
      ),
    },
  ];
  return (
    <div>
      <br />
      <Table
        columns={columns}
        dataSource={ctx.cartData.items}
        pagination={false}
        bordered
        summary={(pageData) => {
          let totalRepayment = 0;
          pageData.forEach(({ price, amount }) => {
            totalRepayment += amount;
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  Amount
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={4}>
                  <Text type="danger">{totalRepayment}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={4}>
                  <Text type="danger">$ {ctx.cartData.subtotal}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default Checkout;
