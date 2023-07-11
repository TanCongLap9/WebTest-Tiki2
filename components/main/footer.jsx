import React from 'react';
import { queryData, Data, Svg } from '../Shared.jsx';
import '~/styles/main/footer.scss';
const HoTroKhachHang = () => (
  <section className="ho-tro-khach-hang">
    <h2 className="tieu-de">Hỗ trợ khách hàng</h2>
    <nav>
      <ul className="flex-col">
        <li>
          <p>
            Hotline: <b>1900-6035</b>
            <br />
            (1000 đ/phút, 8-21h kể cả T7, CN)
          </p>
        </li>
        {[
          'Các câu hỏi thường gặp',
          'Gửi yêu cầu hỗ trợ',
          'Hướng dẫn đặt hàng',
          'Phương thức vận chuyển',
          'Chính sách đổi trả',
          'Hướng dẫn trả góp',
          'Chính sách nhập hàng khẩu',
          'Hỗ trợ khách hàng: hotro@tiki.vn',
          'Báo lỗi bảo mật: security@tiki.vn',
        ].map((v, i) => (
          <li key={`item-${i}`}>
            <a href=".">{v}</a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);
const VeTiki = () => (
  <section className="ve-tiki">
    <h2 className="tieu-de">Về Tiki</h2>
    <nav>
      <ul className="flex-col">
        {[
          'Giới Thiệu Tiki',
          'Tuyển dụng',
          'Chính sách bảo mật thanh toán',
          'Chính sách bảo mật thông tin cá nhân',
          'Chính sách giải quyết khiếu nại',
          'Điều khoản sử dụng',
          'Giới thiệu Tiki Xu',
          'SEP - Mua sắm có lời',
          'Tiếp thị liên kết cùng Tiki',
          'Bán hàng doanh nghiệp',
          'Điều kiện vận chuyển',
        ].map((v, i) => (
          <li key={`item-${i}`}>
            <a href=".">{v}</a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);
const HopTacVaLienKet = () => (
  <section className="hop-tac-va-lien-ket">
    <h2 className="tieu-de">Hợp tác và liên kết</h2>
    <nav>
      <ul className="flex-col">
        {['Quy chế hoạt động Sàn GDTMĐT', 'Bàn hàng cùng Tiki'].map((v, i) => (
          <li key={`item-${i}`}>
            <a href=".">{v}</a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);
const ChungNhanBoi = () => {
  const queryResult = queryData({ id: 'chungNhanBoi' });
  return (
    <section className="chung-nhan-boi">
      <h2 className="tieu-de">Chứng nhận bởi</h2>
      <Data queryResult={queryResult}>
        {[32, 83].map((width, i) => (
          <a href="." key={`item-${i}`}>
            <img
              src={`${queryResult.data?.urlPrefix}${queryResult.data?.data[i]}${queryResult.data?.urlSuffix}`}
              width={width}
              height="32"
              alt=""
            />
          </a>
        ))}
      </Data>
    </section>
  );
};
const PhuongThucThanhToan = ({ children }) => {
  const queryResult = queryData({
    queryKey: ['login'],
    url: 'https://62ecdb67818ab252b603f9f3.mockapi.io/login',
    id: 'phuongThucThanhToan',
  });
  return (
    <section className="phuong-thuc-thanh-toan">
      <h2 className="tieu-de">Phương thức thanh toán</h2>
      <ul className="cac-phuong-thuc flex-row wrap">
        {queryResult.data?.data.map((v, i) => (
          <li key={`item-${i}`}>
            <Svg
              {...JSON.parse(v)}
              fill="none"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
            />
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
};
const DichVuGiaoHang = () => {
  const queryResult = queryData({
    queryKey: ['login'],
    url: 'https://62ecdb67818ab252b603f9f3.mockapi.io/login',
    id: 'dichVuGiaoHang',
  });
  return (
    <section className="dich-vu-giao-hang">
      <h2 className="tieu-de">Dịch vụ giao hàng</h2>
      <Data queryResult={queryResult}>
        <Svg
          {...JSON.parse(queryResult.data?.data[0] ?? null)}
          width="68"
          height="33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        />
      </Data>
    </section>
  );
};
const KetNoiVoiChungToi = ({ children }) => {
  const queryResult = queryData({
    queryKey: ['login'],
    url: 'https://62ecdb67818ab252b603f9f3.mockapi.io/login',
    id: 'ketNoiVoiChungToi',
  });
  return (
    <section className="ket-noi-voi-chung-toi">
      <Data queryResult={queryResult}>
        <h2 className="tieu-de">Kết nối với chúng tôi</h2>
        <ul className="flex-row">
          {queryResult.data?.data.map((nenTang, i) => (
            <li key={`item-${i}`}>
              <a href={JSON.parse(nenTang).href}>
                <Svg
                  {...{ ...JSON.parse(nenTang), href: null }}
                  width="32"
                  height="33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                />
              </a>
            </li>
          ))}
        </ul>
        {children}
      </Data>
    </section>
  );
};
const TaiUngDungTrenDienThoai = () => {
  const queryResult = queryData({ id: 'taiUngDungTrenDienThoai' });
  return (
    <section className="tai-ung-dung-tren-dien-thoai">
      <h2 className="tieu-de">Tải ứng dụng trên điện thoại</h2>
      <Data queryResult={queryResult}>
        <div className="flex-row space">
          <img
            src={`${queryResult.data?.urlPrefix}${queryResult.data?.data[0]}${queryResult.data?.urlSuffix}`}
            width="80"
            height="80"
            alt=""
          />
          <div className="tai-ve flex-col space">
            {[1, 2].map((v, i) => (
              <a
                key={`item-${i}`}
                href={queryResult.data?.data[v].split('\n')[0]}
              >
                <img
                  src={`${queryResult.data?.urlPrefix}${
                    queryResult.data?.data[v].split('\n')[1]
                  }${queryResult.data?.urlSuffix}`}
                  width="122px"
                  height="36px"
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>
      </Data>
    </section>
  );
};
const ThongTinTiki = () => (
  <div className="thong-tin-tiki">
    <p>
      Trụ sở chính: Toà nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường 12,
      quận 10, Thành phố Hồ Chí Minh
    </p>
    <p>
      Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và
      nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
    </p>
    <p>
      <span>
        Giấy chứng nhận đăng ký kinh doanh số 0309532909 do Sở Kế hoạch và Đầu
        tư Thành phố Hồ Chí Minh cấp lần đầu ngày{' '}
      </span>
      <time dateTime="2010-01-06">06/01/2010</time>
      <span> và sửa đổi lần thứ 23 ngày </span>
      <time dateTime="2022-02-14">14/02/2022</time>
    </p>
    <p>&copy; 2022 - Bản quyền của Công ty TNHH Ti Ki</p>
  </div>
);
const UuDiemTiki = () => (
  <section className="uu-diem-tiki">
    <h2 className="tieu-de">Tiki - Thật nhanh, thật chất lượng, thật rẻ</h2>
    <h3>Tiki có tất cả</h3>
    <p>
      <span>
        Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn
        loại mặt hàng từ{' '}
      </span>
      <a href=".">Điện thoại smartphone</a>
      <span> tới </span>
      <a href=".">Rau củ quả tươi</a>
      <span>
        , kèm theo dịch vụ giao hàng siêu tốc TikiNOW, Tiki mang đến cho bạn một
        trải nghiệm mua sắm online bắt đầu từ chữ tín. Thêm vào đó, ở Tiki bạn
        có thể sử dụng vô vàn các tiện ích khác như{' '}
      </span>
      <a href=".">
        mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm
      </a>
      .
    </p>
    <h3>Khuyến mãi, ưu đãi tràn ngập</h3>
    <p>
      <span>Bạn muốn săn giá sốc, Tiki có </span>
      <a href=".">giá sốc mỗi ngày</a>
      <span> cho bạn! Bạn là tín đồ của các thương hiệu, các </span>
      <a href=".">cửa hàng Official chính hãng</a>
      <span>
        {' '}
        đang chờ đón bạn. Không cần săn mã freeship, vì Tiki đã có hàng triệu
        sản phẩm trong{' '}
      </span>
      <a href=".">chương trình Freeship+</a>
      <span>
        , không giới hạn lượt đặt, tiết kiệm thời gian vàng bạc của bạn. Mua
        thêm gói{' '}
      </span>
      <a href=".">TikiNOW tiết kiệm</a>
      <span> để nhận 100% free ship </span>
      <time dateTime="02:00:00">2h</time>
      <span>
        {' '}
        &amp; trong ngày, hoặc mua TikiNOW cao cấp để nhận được 100% freeship,
        áp dụng cho 100% sản phẩm, 100% tỉnh thành Việt Nam. Bạn muốn tiết kiệm
        hơn nữa? Đã có TikiCARD,{' '}
      </span>
      <a href=".">thẻ tín dụng Tiki hoàn tiền 15%</a>
      <span> trên mọi giao dịch (tối đa hoàn 600k/tháng)</span>
    </p>
  </section>
);
const DanhMucSanPham = () => {
  const queryResult = queryData({ id: 'danhMucSanPham' });
  return (
    <div className="danh-muc-san-pham">
      <h2 className="tieu-de">Danh Mục Sản Phẩm</h2>
      <div className="cac-danh-muc flex-col wrap">
        {queryResult.data?.data.map((v, i) => (
          <section key={`item-${i}`}>
            <Data queryResult={queryResult}>
              <h3>{v.name}</h3>
              <p>
                {v.data.map((v, i, array) => (
                  <React.Fragment key={`item-${i}`}>
                    <a href=".">{v}</a>
                    {i < array.length - 1 ? ' / ' : null}
                  </React.Fragment>
                ))}
              </p>
            </Data>
          </section>
        ))}
      </div>
    </div>
  );
};
const Footer = () => (
  <footer className="footer">
    <div className="page-width-limit">
      <div className="row1 flex-row">
        <HoTroKhachHang />
        <VeTiki />
        <div className="flex-col">
          <HopTacVaLienKet />
          <ChungNhanBoi />
        </div>
        <PhuongThucThanhToan>
          <DichVuGiaoHang />
        </PhuongThucThanhToan>
        <KetNoiVoiChungToi>
          <TaiUngDungTrenDienThoai />
        </KetNoiVoiChungToi>
      </div>
      <hr />
      <ThongTinTiki />
      <hr />
      <UuDiemTiki />
      <hr />
      <DanhMucSanPham />
    </div>
  </footer>
);
export default Footer;
