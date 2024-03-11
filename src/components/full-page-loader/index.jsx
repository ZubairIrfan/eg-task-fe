import { Spin } from 'antd';
import React from 'react';


function FullPageLoader() {
  return (
    <div className={`full-page-loader`}>
      <Spin />
    </div>
  );
}

export default FullPageLoader;
