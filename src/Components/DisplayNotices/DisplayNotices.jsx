import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import styles from './DisplayNotices.module.css'
const DisplayNotices = ({ notices }) => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    // Reset notice index when notices change
    setCurrentNoticeIndex(0);

  }, [notices]);

  return (
    <div className={styles.noticeDisplay}>
      {notices.length > 0 ? (
        <Alert
          message={notices[currentNoticeIndex]}
          type="info"
          showIcon
        />
      ) : null}
    </div>
  );
};

export default DisplayNotices;
