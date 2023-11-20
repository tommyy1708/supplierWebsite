import React, { useEffect, useState } from 'react';
import { Card, message, Image, Spin } from 'antd';
import styles from './Category.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetCategoryApi } from '../../request/api';
const Category = () => {
  const { Meta } = Card;
  const [aCategory, setACategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const aCategory = await GetCategoryApi();
      setACategory(aCategory.data);
      setLoading(false);
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
            loading={loading}
            style={{
              width: 240,
            }}
            cover={
              <Image
                preview={false}
                alt={e.categoryName}
                src={`${e.image}`}
              />
            }
          >
            <Meta title={e.categoryName} />
          </Card>
        </div>
      ))
    ) : (
      <Spin size="large" delay="200" fullscreen="true" />
    )}
  </div>
);};

export default Category;
