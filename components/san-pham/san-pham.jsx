import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const SanPham = () => {
  const params = ReactRouterDOM.useParams();
  console.log(params);
  return <div>a</div>;
};
export default SanPham;
