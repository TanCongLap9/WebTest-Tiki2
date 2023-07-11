import React from 'react';
import {
  queryData,
  Data,
  ListView,
  GiaThanh,
  TinhTrangBan,
  PagedView,
} from '../Shared.jsx';
import '~/styles/main/row2.scss';
const CacDanhMuc = () => {
  const queryResult = queryData({ id: 'giaSocHomNay' });
  return (
    <div className="cac-danh-muc">
      <Data queryResult={queryResult}>
        <ListView autoWidth>
          {queryResult.data?.data.map((v, i) => (
            <a key={`item-${i}`} href="." className="danh-muc">
              <img
                src={`${queryResult.data?.urlPrefix}${v.src}${queryResult.data?.urlSuffix}`}
                className="hinh-san-pham"
                alt="Hình sản phẩm"
              />
              <GiaThanh gia={v.gia * 1000} giamGia={v.giamGia} />
              <TinhTrangBan
                daBan={v.daBan}
                phanTramDaBan={v.phanTramDaBan}
                banChay={v.chayHang}
              />
            </a>
          ))}
        </ListView>
      </Data>
    </div>
  );
};
const GiaSocHomNay = () => (
  <section className="gia-soc-hom-nay flex-col space">
    <div className="khung-tieu-de flex-row space">
      <h2>
        <a className="phan-hinh" href=".">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg"
            alt="Giá sốc"
          />
          <span className="flicker-box">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg"
              className="flicker"
            />
          </span>
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg"
            alt="Hôm nay"
          />
        </a>
      </h2>
      <a href="." className="xem-them">
        Xem thêm
      </a>
    </div>
    <CacDanhMuc />
  </section>
);
const Banner5Items = () => {
  const queryResult = queryData({ id: 'banner5Items' });
  return (
    <div className="banner-5-items">
      <Data queryResult={queryResult}>
        <PagedView>
          {queryResult.data?.data.map((v, i) =>
            v.video ? (
              <video
                key={`item-${i}`}
                src={v.video}
                poster={`${queryResult.data?.urlPrefix}${v.image}${queryResult.data?.urlSuffix}`}
                controls
              />
            ) : (
              <a key={`item-${i}`} href=".">
                <img
                  src={`${queryResult.data?.urlPrefix}${v.image}${queryResult.data?.urlSuffix}`}
                  alt="Banner"
                />
              </a>
            )
          )}
        </PagedView>
      </Data>
    </div>
  );
};
export { GiaSocHomNay, Banner5Items };
