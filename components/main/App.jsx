import React from 'react';
import { Outlet } from 'react-router-dom';
import '~/styles/main/styles.scss';
import Header from './header.jsx';
import { CacTuKhoa } from './cac-tu-khoa.jsx';
import { GiaSocHomNay, Banner5Items } from './row2.jsx';
import { Banner14Trang, HoanTien25KXu } from './row1.jsx';
import { Row3, Row4, Row5 } from './row3-4-5.jsx';
import { ThuongHieuChinhHang } from './thuong-hieu-chinh-hang.jsx';
import { DanhMucNoiBat } from './danh-muc-noi-bat.jsx';
import { Row8 } from './row8.jsx';
import { GoiYHomNay } from './goi-y-hom-nay.jsx';
import Footer from './footer.jsx';

const App = () => (
  <>
    <Outlet />
    <Header />
    <div className="noi-dung">
      <CacTuKhoa />
      <div className="cac-hang page-width-limit">
        <div className="row1 flex-row">
          <Banner14Trang />
          <HoanTien25KXu />
        </div>
        <div className="row2 flex-row">
          <GiaSocHomNay />
          <Banner5Items />
        </div>
        <Row3 />
        <Row4 />
        <Row5 />
        <Row8 />
        <ThuongHieuChinhHang />
        <DanhMucNoiBat />
        <GoiYHomNay />
      </div>
    </div>
    <Footer />
  </>
);

export default App;
