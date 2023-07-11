import React, { useState } from 'react';
import { queryData, Data, GiaThanh, DanhGia } from '../Shared.jsx';
import '~/styles/main/goi-y-hom-nay.scss';

const CacSanPham = ({ theLoai }) => {
  const danhSachTheLoai = [
    'danh-cho-ban',
    'mua-1-duoc-4',
    'coupon-888k',
    'di-cho-sieu-sale',
    'deal-sieu-hot',
    're-vo-doi',
    'hang-moi',
    'xu-huong-thoi-trang',
  ];
  const [soLuongSanPhamHienThi, setSoLuongSanPhamHienThi] = useState(12);
  const queryResult = queryData({
    select: (data) => {
      const cacSanPham = data.find((obj) => obj.id === 'cacSanPham');
      const filteredItems = cacSanPham.data.filter(
        (item) => item['theLoai'] === danhSachTheLoai[theLoai]
      );
      return { ...cacSanPham, data: filteredItems };
    },
  });
  return (
    <div className="cac-san-pham">
      <Data queryResult={queryResult}>
        <ul className="cot-cac-san-pham flex-row">
          {queryResult.data?.data
            .map((sanPham, i) => (
              <li key={`item-${i}`} className="flex-row">
                <div className="san-pham">
                  <a href=".">
                    <img
                      src={`${queryResult.data?.urlPrefix}${sanPham.src}${queryResult.data?.urlSuffix}`}
                      alt={sanPham.name}
                      className="phan-hinh"
                    />
                    {sanPham.ad && <span className="quang-cao">Ad</span>}
                    <p className="ten-san-pham">{sanPham.name}</p>
                    <div className="khung-danh-gia flex-row">
                      <DanhGia sao={sanPham.sao} />
                      <span className="da-ban">Đã bán {sanPham.daBan}</span>
                    </div>
                    <GiaThanh
                      gia={sanPham.gia * 1000}
                      giamGia={sanPham.giamGia}
                    />
                  </a>
                </div>
              </li>
            ))
            .slice(0, soLuongSanPhamHienThi)}
        </ul>
      </Data>
      {soLuongSanPhamHienThi < queryResult.data?.data.length && (
        <button
          className="xem-them"
          onClick={() => setSoLuongSanPhamHienThi(soLuongSanPhamHienThi + 12)}
        >
          Xem Thêm
        </button>
      )}
    </div>
  );
};
const CacGoiY = ({ theLoai, setTheLoai }) => {
  const queryResult = queryData({ id: 'goiYHomNay' });
  return (
    <div className="cac-goi-y">
      <Data queryResult={queryResult}>
        <ul className="flex-row space">
          {queryResult.data?.data.map((v, i) => (
            <li key={`item-${i}`} className="goi-y">
              <button
                className={`flex-col ${theLoai === i ? 'da-chon' : ''}`.trim()}
                aria-selected={theLoai === i}
                onClick={() => setTheLoai(i)}
              >
                <img
                  src={`${queryResult.data?.urlPrefix}${v.src}${queryResult.data?.urlSuffix}`}
                  className="phan-hinh"
                />
                <span className="phan-chu">{v.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Data>
    </div>
  );
};
const GoiYHomNay = () => {
  const [theLoai, setTheLoai] = React.useState(0);
  return (
    <section className="goi-y-hom-nay flex-col">
      <div className="khung-goi-y">
        <div className="khung-tieu-de">
          <h2 className="tieu-de">Gợi Ý Hôm Nay</h2>
        </div>
        <CacGoiY theLoai={theLoai} setTheLoai={setTheLoai} />
      </div>
      <CacSanPham theLoai={theLoai} />
    </section>
  );
};
export { GoiYHomNay };
