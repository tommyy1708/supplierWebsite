import React, { useState } from 'react';
import {
  DatePicker,
  Space,
  Table,
  Button,
  Col,
  Row,
  Statistic,
  message,
} from 'antd';
// import { InquiryOrderDataOnDate } from '../request/api';

const Filter = () => {
  const [begin, setBegin] = useState('');
  const [end, setEnd] = useState('');
  const [aOrderData, setAOrderData] = useState('');
  const [nTotalProfit, setNTotalProfit] = useState(0);
  const [nTotalCost, setNTotalCost] = useState(0);
  const [nRevenue, setNRevenue] = useState(0);
  const [dateNotNone, setDateNotNone] = useState(false);
  const { RangePicker } = DatePicker;

  const gotData = async () => {
    // if (dateNotNone) {
    //   const data = {
    //     begin: begin,
    //     end: end,
    //   };
    //   const aOrderData = await InquiryOrderDataOnDate(data);
    //   if (aOrderData) {
    //     setAOrderData(aOrderData.data.data.aReports);
    //     setNTotalCost(aOrderData.data.data.aStatistics[0].totalCost);
    //     setNTotalProfit(
    //       aOrderData.data.data.aStatistics[0].totalProfit
    //     );
    //     setNRevenue(aOrderData.data.data.aStatistics[0].totalTotal);
    //   }
    // } else {
    //   message.info('Please select date!');
    //   return;
    // }
  };

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setBegin(dateString[0]);
      setEnd(dateString[1]);
      setDateNotNone(true);
      return;
    } else {
      message.info('Date invalid, reselect date!');
      return;
    }
  };
  return (
    <div>
      <Space>
        <RangePicker
          className="report-datePicker"
          onChange={onChange}
          inputReadOnly={true}
        />
        <Button type="primary" onClick={gotData}>
          Search
        </Button>
      </Space>
    </div>
  );
};

export default Filter;
