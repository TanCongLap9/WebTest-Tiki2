import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactQuery from '@tanstack/react-query';
import App from '~/components/main/App';
import DangNhap, {
  handleLogin,
} from '~/components/dang-nhap-dang-ky/dang-nhap.jsx';
import DangKy, {
  handleSignUp,
} from '~/components/dang-nhap-dang-ky/dang-ky.jsx';
import SanPham from '~/components/san-pham/san-pham.jsx';
import Search from '~/components/search/search.jsx';
import { ErrorPage } from '~/components/error-page/error-page.jsx';

const loader1 = (a) => {
  console.groupCollapsed('Loading');
  console.log('Param', a);
  return new Promise((res) =>
    setTimeout(() => {
      console.log('Ended');
      console.groupEnd();
      res(`load ${Math.floor(Math.random() * 1000)}`);
    }, 2000)
  );
};
const action1 = (e) => {
  console.groupCollapsed('Action');
  console.log('Params', e);
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('Ended');
      console.groupEnd();
      rej(`act ${Math.floor(Math.random() * 1000)}`);
    }, 5000);
  });
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const router = ReactRouterDOM.createBrowserRouter([
  {
    path: '/',
    element: <App />,

    action: action1,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dang-nhap',
        element: <DangNhap />,
        action: handleLogin,
      },
      { path: '/dang-ky', element: <DangKy />, action: handleSignUp },
    ],
  },
  {
    path: '/san-pham/:id',
    loader: loader1,
    element: <SanPham />,
  },
  {
    path: '/search',
    loader: loader1,
    element: <Search />,
  },
]);
const queryClient = new ReactQuery.QueryClient();

root.render(
  <StrictMode>
    <ReactQuery.QueryClientProvider client={queryClient}>
      <ReactRouterDOM.RouterProvider router={router} />
    </ReactQuery.QueryClientProvider>
  </StrictMode>
);
