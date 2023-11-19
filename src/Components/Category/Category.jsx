import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import styles from './Category.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetCategoryApi } from '../../request/api';
const Category = () => {
  const { Meta } = Card;
  const [aCategory, setACategory] = useState(false);
  const location = useLocation();
  const categoryData = [
    'bundles',
    'bob-wigs',
    'short-wigs',
    'accessories',
  ];
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const aCategory = await GetCategoryApi();
      setACategory(aCategory.data);
    } catch (error) {
      message.error('error');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location.pathname]);

return (
  <div className={styles.cardsFrame}>
    {aCategory ? (
      aCategory.map((e, index) => (
        <div
          key={e.id}
          className={`${styles.cards}`}
          onClick={() => navigate(`/category/${e.categoryName}`)}
        >
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title={e.categoryName} />
          </Card>
        </div>
      ))
    ) : (
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={true}
      ></Card>
    )}
  </div>
)};

export default Category;
