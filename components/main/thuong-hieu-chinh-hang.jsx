import React from 'react';
import { queryData, Data, PagedView, ListView } from '../Shared.jsx';
import '~/styles/main/thuong-hieu-chinh-hang.scss';
const DataRow0 = () => {
  const queryResult = queryData({ id: 'banner10Items' });
  return (
    <div className="cac-thuong-hieu-row0">
      <Data queryResult={queryResult}>
        <PagedView prevNextBtn loop>
          {queryResult.data?.data.map((v, i) => (
            <div key={`item-${i}`} className="flex-row space">
              <img
                src={`${queryResult.data?.urlPrefix}${v.src1}${queryResult.data?.urlSuffix}`}
              />
              <img
                src={`${queryResult.data?.urlPrefix}${v.src2}${queryResult.data?.urlSuffix}`}
              />
            </div>
          ))}
        </PagedView>
      </Data>
    </div>
  );
};
const DataRow1 = () => {
  const queryResult = queryData({ id: 'goiYHomNay' });
  return (
    <div className="cac-thuong-hieu-row1">
      <Data queryResult={queryResult}>
        <ListView className="flex-row" autoWidth>
          {Array.from({ length: 10 }).map((v, i) => (
            <a key={`item-${i}`} href="." className="thuong-hieu flex-col">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg"
                className="san-pham"
              />
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg"
                className="hinh-thuong-hieu"
              />
              <p className="uu-dai">Mua 1 Tặng 10</p>
            </a>
          ))}
        </ListView>
      </Data>
    </div>
  );
};
const ThuongHieuChinhHang = () => {
  return (
    <section className="thuong-hieu-chinh-hang flex-col space">
      <div className="khung-tieu-de flex-row space">
        <h2 className="tieu-de">Thương Hiệu Chính Hãng</h2>
        <a className="xem-them" href=".">
          XEM THÊM
        </a>
      </div>
      <DataRow0 />
      <DataRow1 />
    </section>
  );
};
export { ThuongHieuChinhHang };
