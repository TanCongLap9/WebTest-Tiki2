import React, { useState, useReducer, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, Form, useActionData } from 'react-router-dom';
import { fetcher, encryptPassword } from '../Shared.jsx';
import {
  SoDienThoai,
  Email,
  MatKhau,
  SubmitBtn,
  NutLui,
  DangNhapBangTaiKhoanKhac,
  KhungMuaSam,
  Header,
  StatusText,
} from './Shared.jsx';
import '~/styles/dang-nhap-dang-ky/dang-ky.scss';

export const handleSignUp = async (e) => {
  let { sdt, email, pass } = Object.fromEntries(await e.request.formData());
  email = email.toLowerCase();
  const validateResult = validate({ sdt, email, pass });
  if (validateResult?.error) return validateResult;
  try {
    const accounts = await fetcher(
      'https://62ecdb67818ab252b603f9f3.mockapi.io/login?id=\\d'
    );
    const accountData = accounts.find(
      (obj) => obj.sdt === sdt || obj.email == email
    );
    return accountData
      ? accountData.sdt === sdt
        ? {
            error:
              'Số điện thoại đã được đăng ký. Vui lòng sử dụng số điện thoại khác.',
            highlight: ['sdt'],
          }
        : accountData.email == email
        ? {
            error: 'Email đã được đăng ký. Vui lòng sử dụng email khác.',
            highlight: ['email'],
          }
        : { error: '' }
      : { data: true };
  } catch (e) {
    return {
      error: `Đã xảy ra lỗi: ${e.message}`,
    };
  }
};
const validate = ({ sdt, email, pass }) =>
  !sdt || !email || !pass
    ? {
        error: 'Vui lòng điền các thông tin còn thiếu.',
        highlight: Object.keys(input).filter((field) => !input[field]),
      }
    : pass.length < 10
    ? {
        error: 'Mật khẩu phải dài từ 10 ký tự trở lên',
        highlight: ['pass'],
      }
    : pass.length > 50
    ? {
        error: 'Mật khẩu phải dài tối đa 50 ký tự',
        highlight: ['pass'],
      }
    : !pass.match(/^[ -~]+$/) || !pass.match(/[a-zA-Z]/) || !pass.match(/[0-9]/)
    ? {
        error:
          'Mật khẩu phải chứa chữ cái (không dấu) và số, có thể có ký hiệu (như #, *)',
        highlight: ['pass'],
      }
    : !sdt.match(/^0\d{9,10}$/)
    ? {
        error: 'Số điện thoại không đúng dạng.',
        highlight: ['sdt'],
      }
    : !email.match(/\w+?@\w+?\.\w+?/)
    ? { error: 'Email không đúng dạng', hightlight: ['email'] }
    : {};
const signUp = ({ sdt, email, pass }, accountMutation) =>
  new Promise((resolve, reject) => {
    const pkey = Array.from({ length: 50 })
      .map(
        () =>
          String.fromCodePoint(Math.floor(Math.random() * (126 - 32 + 1)) + 32) // ' ' - '~'
      )
      .join('');
    pass = encryptPassword(pass, pkey);
    accountMutation.mutate(
      {
        sdt,
        email,
        pass,
        pkey,
      },
      {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      }
    );
  });
const signUpReducer = (oldState, action) => {
  switch (action.type) {
    case 'loading':
      return { ...oldState, status: 'loading', error: null, success: null };
    case 'error':
      return { ...oldState, status: 'error', error: new Error(action.payload), success: null };
    case 'success':
      return {
        ...oldState,
        status: 'success',
        error: null,
        success: action.payload,
      };
  }
};
const DangKy = () => {
  const [input, setInput] = useState({ sdt: '', pass: '', email: '' });
  const [loginInfo, dispatch] = useReducer(signUpReducer, {
    status: '',
    error: null,
    success: '',
  });
  const accountMutation = useMutation({
    mutationFn: (accountData) =>
      fetcher('https://62ecdb67818ab252b603f9f3.mockapi.io/login', {
        method: 'POST',
        body: JSON.stringify(accountData),
      }),
  });
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.data)
      signUp(input, accountMutation)
        .then(() =>
          dispatch({
            type: 'success',
            payload:
              'Tài khoản đã tạo xong. Vui lòng đăng nhập để xài tài khoản.',
          })
        )
        .catch((error) =>
          dispatch({ type: 'error', payload: `Có lỗi xảy ra: ${error}` })
        );
    else if (actionData?.error)
      dispatch({ type: 'error', payload: actionData.error });
  }, [actionData]);
  return (
    <div className="dang-ky-wrapper flex-row">
      <Link to=".." className="dang-ky-cancel-link" />
      <div className="dang-ky flex-row">
        <Form
          className="khung-dang-ky flex-col space"
          method="POST"
          onSubmit={() => dispatch({ type: 'loading' })}
        >
          <div className="row1 flex-col">
            <NutLui href="/dang-nhap" />
            <Header loginMode="dang-ky" />
            <Email className="email" setInput={setInput} input={input} />
            <SoDienThoai className="sdt" setInput={setInput} input={input} />
            <MatKhau setInput={setInput} input={input} />
            <input type="hidden" name="loginMode" value="email" />
            <StatusText error={loginInfo.error} success={loginInfo.success} />
            <SubmitBtn loginStatus={loginInfo.status} />
          </div>
          <DangNhapBangTaiKhoanKhac />
        </Form>
        <KhungMuaSam />
      </div>
    </div>
  );
};
export default DangKy;
