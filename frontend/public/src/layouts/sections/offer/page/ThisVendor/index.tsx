import React from 'react';
import coreStyles from '../index.module.scss';

const ThisVendor = () => {
  return (
    <div className={`${coreStyles.container} ${coreStyles.vnedor}`}>
      <h2 className={coreStyles.heading}>About this vendor</h2>
    </div>
  );
};

export default ThisVendor;
