import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Header from '../main/header.jsx';
import Footer from '../main/footer.jsx';
import { queryData, Data, DanhGia, GiaThanh } from '../Shared.jsx';
const Search = () => {
  const [search, setSearch] = ReactRouterDOM.useSearchParams();
  const queryResult = queryData({ id: 'cacSanPham' });
  const q = search.get('q');
  const [soLuongSanPhamHienThi, setSoLuongSanPhamHienThi] = useState(12);
  return (
    <>
      <Header />
      <Data queryResult={queryResult}>
        <ul className="cot-cac-san-pham flex-row wrap">
          {queryResult.data?.data.map((sanPham, i) => (
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
          ))}
        </ul>
      </Data>
      <Footer />
    </>
  );
};
export default Search;
