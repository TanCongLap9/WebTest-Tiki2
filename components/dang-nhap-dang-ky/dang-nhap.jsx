import React, { useState, useReducer, useEffect, useRef } from 'react';
import { Link, Form, useActionData } from 'react-router-dom';
import { encryptPassword, fetcher } from '../Shared.jsx';
import {
  SoDienThoai,
  Email,
  MatKhau,
  SubmitBtn,
  NutLui,
  Header,
  KhungMuaSam,
  DangNhapBangTaiKhoanKhac,
  StatusText,
} from './Shared.jsx';
import Cookie from 'js-cookie';
import '~/styles/dang-nhap-dang-ky/dang-nhap.scss';

export const handleLogin = async (e) => {
  const { loginMode, pass, email, sdt } = Object.fromEntries(
    await e.request.formData()
  );
  const validationResult = validate({ loginMode, sdt, email, pass });
  if (validationResult?.error) return validationResult;
  try {
    const accounts = await fetcher(
      'https://62ecdb67818ab252b603f9f3.mockapi.io/login?id=\\d'
    );
    const accountData = accounts.find(
      loginMode === 'sdt'
        ? (obj) => obj.sdt === sdt
        : loginMode === 'email'
        ? (obj) => obj.email === email
        : null
    );
    return accountData
      ? encryptPassword(pass, accountData.pkey) === accountData.pass
        ? { data: { pkey: accountData.pkey } }
        : { error: 'Mật khẩu không đúng.', highlight: ['pass'] }
      : loginMode === 'sdt'
      ? {
          error: 'Số điện thoại chưa được đăng ký!',
          highlight: ['sdt'],
        }
      : loginMode === 'email'
      ? {
          error: 'Email chưa được đăng ký!',
          highlight: ['email'],
        }
      : {};
  } catch (e) {
    return {
      error: `Đã xảy ra lỗi: ${e.message}`,
    };
  }
};
const validate = (input) => {
  const { loginMode, sdt, email, pass } = input;
  switch (loginMode) {
    case 'sdt':
      if (!sdt || !pass)
        return {
          error: 'Vui lòng điền các thông tin còn thiếu.',
          highlight: Object.keys(input).filter((field) => !input[field]),
        };
      else if (!sdt.match(/^0\d{9,10}$/))
        return {
          error: 'Số điện thoại không đúng dạng.',
          hightlight: ['sdt'],
        };
      break;
    case 'email':
      if (!email || !pass)
        return {
          error: 'Vui lòng điền các thông tin còn thiếu.',
          highlight: Object.keys(input).filter((field) => !input[field]),
        };
      else if (!email.match(/^\w+?@\w+?\.\w+?$/))
        return {
          error: 'Email không đúng dạng.',
          highlight: ['email'],
        };
      break;
  }
  return {};
};
const login = (accountData) => {
  Cookie.set('sessionId', accountData.pkey, { expires: 7 });
  window.location = '/';
};
const loginReducer = (oldState, action) => {
  switch (action.type) {
    case 'mode':
      return {
        ...oldState,
        status: '',
        error: null,
        mode: action.payload,
      };
    case 'loading':
      return { ...oldState, status: 'loading', error: null };
    case 'error':
      return { ...oldState, status: 'error', error: new Error(action.payload) };
    case 'success':
      return { ...oldState, status: 'success', error: null };
  }
};
const QuenMatKhauTaoTaiKhoan = () => (
  <div className="khung-quen-mat-khau-va-tao-tai-khoan">
    <p>
      <a href=".">Quên mật khẩu?</a>
    </p>
    <p>
      Chưa có tài khoản? <Link to="../dang-ky">Tạo tài khoản</Link>
    </p>
  </div>
);
const DangNhapBangEmail = ({ onClick }) => (
  <button onClick={onClick} type="button" className="dang-nhap-bang">
    Đăng nhập bằng email
  </button>
);
const DangNhap = () => {
  const [input, setInput] = useState({ email: '', sdt: '', pass: '' });
  const [loginInfo, dispatch] = useReducer(loginReducer, {
    status: '',
    error: null,
    mode: 'sdt', // "sdt" | "email"
  });
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.data) {
      dispatch({ type: 'success' });
      login(actionData.data);
    } else if (actionData?.error)
      dispatch({ type: 'error', payload: actionData.error });
  }, [actionData]);
  return (
    <div className="dang-nhap-wrapper flex-row">
      <Link to=".." className={'dang-nhap-cancel-link'.trim()} />
      <div className={'dang-nhap flex-row'.trim()}>
        <Form
          className="khung-dang-nhap flex-col space"
          method="POST"
          onSubmit={() => dispatch({ type: 'loading' })}
        >
          {loginInfo.mode === 'sdt' ? (
            <>
              <div className="row1 flex-col">
                <Header loginMode={loginInfo.mode} />
                <SoDienThoai
                  className="sdt"
                  setInput={setInput}
                  input={input}
                />
                <MatKhau setInput={setInput} input={input} />
                <input type="hidden" name="loginMode" value="sdt" />
                <StatusText error={loginInfo.error} />
                <SubmitBtn loginStatus={loginInfo.status} />
                <DangNhapBangEmail
                  onClick={() => dispatch({ type: 'mode', payload: 'email' })}
                />
              </div>
              <DangNhapBangTaiKhoanKhac />
            </>
          ) : loginInfo.mode === 'email' ? (
            <>
              <div className="row1 flex-col">
                <NutLui
                  onClick={() => dispatch({ type: 'mode', payload: 'sdt' })}
                />
                <Header loginMode={loginInfo.mode} />
                <Email className="email" setInput={setInput} input={input} />
                <MatKhau setInput={setInput} input={input} />
                <input type="hidden" name="loginMode" value="email" />
                <StatusText error={loginInfo.error} />
                <SubmitBtn loginStatus={loginInfo.status} />
              </div>
              <QuenMatKhauTaoTaiKhoan />
            </>
          ) : null}
        </Form>
        <KhungMuaSam />
      </div>
    </div>
  );
};
export default DangNhap;
