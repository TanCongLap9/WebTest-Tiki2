import React from 'react';
import Cookie from 'js-cookie';
import { Link, Form } from 'react-router-dom';
import '~/styles/main/header.scss';
import { queryData, Data } from '../Shared.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faSearch,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
const TaiKhoan = () => {
  const queryResult = queryData({
    queryKey: ['login'],
    url: 'https://62ecdb67818ab252b603f9f3.mockapi.io/login',
    select: (data) =>
      Cookie.get('sessionId')
        ? data.find((obj) => obj.pkey === Cookie.get('sessionId'))
        : undefined,
  });
  return (
    <Link to="dang-nhap" className="tai-khoan flex-row">
      <img
        className="phan-hinh"
        src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
        alt="Người dùng"
      />
      <div className="phan-chu">
        <p>{queryResult.data?.sdt ? '' : 'Đăng Nhập / Đăng Ký'}</p>
        <p className="chu-tai-khoan">
          {queryResult.data?.sdt || 'Tài khoản'}
          <FontAwesomeIcon icon={faCaretDown} />
        </p>
      </div>
    </Link>
  );
};
const GioHang = () => {
  const queryResult = queryData({
    queryKey: ['login'],
    url: 'https://62ecdb67818ab252b603f9f3.mockapi.io/login',
    select: (data) =>
      Cookie.get('sessionId')
        ? data.find((obj) => obj.pkey === Cookie.get('sessionId'))
        : undefined,
  });
  return (
    <a href="/" className="gio-hang flex-row">
      <div className="phan-hinh">
        <img
          src="https://salt.tikicdn.com/ts/upload/40/44/6c/b80ad73e5e84aeb71c08e5d8d438eaa1.png"
          alt="Giỏ hàng"
        />
        <p className="so-luong-hang">
          <span className="phan-chu-so-luong-hang">
            {queryResult.data?.giohang.length || 0}
          </span>
        </p>
      </div>
      <p className="phan-chu">Giỏ Hàng</p>
    </a>
  );
};
const TimKiem = () => (
  <Form action="/search" className="tim-kiem">
    <input
      className="o-tim-kiem"
      type="search"
      name="q"
      placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
    />
    <button type="submit" className="nut-tim-kiem">
      <FontAwesomeIcon icon={faSearch} />
      Tìm Kiếm
    </button>
  </Form>
);
const CacTuKhoaTimKiem = () => {
  const queryResult = queryData({ id: 'theLoai' });
  return (
    <div className="cac-tu-khoa-tim-kiem">
      <Data queryResult={queryResult}>
        <ul className="flex-row">
          {queryResult.data?.data.map((v, i) => (
            <li key={`item-${i}`}>
              <a href="/">{v}</a>
            </li>
          ))}
        </ul>
      </Data>
    </div>
  );
};
const BanHang = () => (
  <a href="/" className="ban-hang">
    <FontAwesomeIcon icon={faStore} />
    Bán hàng cùng Tiki
  </a>
);
const Logo = ({ ben }) =>
  (ben === 'tren' && (
    <a href="/" className="khung-logo-tren">
      <img
        className="logo-tren"
        src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
        alt="Tiki"
      />
    </a>
  )) ||
  (ben === 'duoi' && (
    <a href="/" className="khung-logo-duoi">
      <img
        className="logo-duoi"
        src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
        alt="Freeship"
      />
    </a>
  ));
const Header = () => (
  <div className="header">
    <div className="page-width-limit">
      <div className="phan-tren flex-row">
        <Logo ben="tren" />
        <TimKiem />
        <TaiKhoan />
        <GioHang />
      </div>
      <div className="phan-duoi flex-row">
        <Logo ben="duoi" />
        <CacTuKhoaTimKiem />
        <BanHang />
      </div>
    </div>
  </div>
);
export default Header;
