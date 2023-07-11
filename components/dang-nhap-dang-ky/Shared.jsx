import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faMagnifyingGlass,
  faCheck,
  faEye,
  faEyeSlash,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { SoDienThoai, Email, MatKhau } from './Shared.jsx';

// -- CÁC COMPONENT --
export const SoDienThoai = ({ className, input, setInput }) => (
  <input
    type="text"
    placeholder="Số điện thoại"
    className={className}
    name="sdt"
    onInput={(e) => setInput({ ...input, sdt: e.target.value })}
  />
);
export const Email = ({ className, input, setInput }) => (
  <input
    type="text"
    placeholder="acb@email.com"
    className={className}
    name="email"
    onInput={(e) => setInput({ ...input, email: e.target.value })}
  />
);
export const MatKhau = ({ input, setInput }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="khung-mat-khau flex-col">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Mật khẩu"
        className="pass"
        name="pass"
        onInput={(e) => setInput({ ...input, pass: e.target.value })}
      />
      <button
        type="button"
        className="hien-mat-khau"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <>
            <FontAwesomeIcon icon={faEyeSlash} /> Ẩn
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faEye} /> Hiện
          </>
        )}
      </button>
    </div>
  );
};
export const SubmitBtn = ({ loginStatus }) => (
  <button
    className={`tiep-tuc ${loginStatus === 'success' ? 'success' : ''}`.trim()}
    disabled={loginStatus === 'success' || loginStatus === "loading"}
    type="submit"
    //onClick={() => formRef.current?.requestSubmit()}
  >
    {loginStatus === 'success' ? (
      <FontAwesomeIcon className="success-icon" icon={faCheck} />
    ) : loginStatus === 'loading' ? (
      <FontAwesomeIcon className="loading-icon" icon={faMagnifyingGlass} />
    ) : (
      'Tiếp Tục'
    )}
  </button>
);
export const StatusText = ({ error, success }) =>
  error ? (
    <p className="login-text login-error">{error.message}</p>
  ) : success ? (
    <p className="login-text login-success">{success}</p>
  ) : (
    <p> </p>
  );
export const NutLui = ({ href, onClick }) =>
  href ? (
    <Link className="nut-lui" to={href} onClick={onClick}>
      <FontAwesomeIcon className="lui-ve" icon={faChevronLeft} />
    </Link>
  ) : (
    <button className="nut-lui" onClick={onClick} type="button">
      <FontAwesomeIcon className="lui-ve" icon={faChevronLeft} />
    </button>
  );
export const KhungMuaSam = () => (
  <div className="khung-mua-sam flex-col">
    <img
      src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
      className="phan-hinh"
    />
    <p className="mua-sam">Mua sắm tại Tiki</p>
    <p className="sieu-uu-dai">Siêu ưu đãi mỗi ngày</p>
  </div>
);
export const Header = ({ loginMode }) =>
  loginMode === 'sdt' ? (
    <div className="dang-nhap-header">
      <h2>Xin chào,</h2>
      <p>Đăng nhập hoặc Tạo tài khoản</p>
    </div>
  ) : loginMode === 'email' ? (
    <div className="dang-nhap-header">
      <h2>Đăng nhập bằng email</h2>
      <p>Nhập email và mật khẩu tài khoản Tiki</p>
    </div>
  ) : loginMode === 'dang-ky' ? (
    <div className="dang-ky-header">
      <h2>Tạo tài khoản</h2>
      <p>Điền email, số điện thoại và mật khẩu</p>
    </div>
  ) : null;
export const DangNhapBangTaiKhoanKhac = () => (
  <div className="dang-nhap-bang-tai-khoan-khac flex-col">
    <p>Hoặc tiếp tục bằng</p>
    <div className="cac-logo-dang-nhap">
      <a href=".">
        <img
          src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
          className="logo-dang-nhap"
        />
      </a>
      <a href=".">
        <img
          src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
          className="logo-dang-nhap"
        />
      </a>
    </div>
    <p className="dieu-khoan-su-dung">
      <span>Bằng việc tiếp tục, bạn đã chấp nhận </span>
      <a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">
        điều khoản sử dụng
      </a>
      <span> và </span>
      <a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">
        chính sách bảo mật thông tin cá nhân của Tiki
      </a>
    </p>
  </div>
);
