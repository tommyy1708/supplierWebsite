// Announcement.js

import React, { useState, useEffect } from 'react';
import {GetAnnouncement} from '../../request/api';

const Announcement = () => {
  const [announcement, setAnnouncement] = useState('');
  const fetchData = async () => {
    const announcement = await GetAnnouncement();
    setAnnouncement(announcement.data[0].content);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {announcement !==
        'undefined' ? (
          <div className="announcement-container">
            <p>{announcement}</p>
          </div>
        ):null}
    </div>
  );
};

export default Announcement;
