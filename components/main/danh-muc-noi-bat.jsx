import React from 'react';
import { queryData, Data } from '../Shared.jsx';
import '~/styles/main/danh-muc-noi-bat.scss';
const CacDanhMuc = () => {
  const queryResult = queryData({ id: 'danhMucNoiBat' });
  return (
    <Data queryResult={queryResult}>
      <ul className="cac-danh-muc flex-row space wrap">
        {queryResult.data?.data.map((v, i) => (
          <li key={`item-${i}`}>
            <a href="." className="danh-muc flex-col">
              <img
                src={`${queryResult.data?.urlPrefix}${v.src}${queryResult.data?.urlSuffix}`}
                className="phan-hinh"
              />
              <p className="phan-chu">{v.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </Data>
  );
};
export const DanhMucNoiBat = () => {
  return (
    <div className="danh-muc-noi-bat flex-col">
      <div className="khung-tieu-de">
        <h2 className="tieu-de">Danh Mục Nổi Bật</h2>
      </div>
      <CacDanhMuc />
    </div>
  );
};
