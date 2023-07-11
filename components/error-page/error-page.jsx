import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import '~/styles/error-page/styles.scss';
const errorWindowReducer = (oldState, action) => {
  switch (action.type) {
    case 'minimize':
      return { ...oldState };
    case 'maximize':
      return { ...oldState };
    case 'close':
      return { ...oldState, closeToggle: !oldState.closeToggle };
  }
};
const ErrorPage = () => {
  const [windowState, dispatch] = React.useReducer(errorWindowReducer, {
    closeToggle: false,
  });
  const routeError = ReactRouterDOM.useRouteError();
  React.useEffect(() => console.error(routeError), []);
  React.useEffect(() => {
    if (windowState.closeToggle)
      setTimeout(() => dispatch({ type: 'close' }), 100);
  }, [windowState.closeToggle]);
  return (
    <div
      className="error-window"
      style={{
        opacity: windowState.closeToggle ? 0.25 : 1,
        visibility: windowState.closeToggle ? 'hidden' : 'visible',
        transform: `translate(-50%, -50%) scale(${
          windowState.closeToggle ? '95%' : '100%'
        })`,
      }}
    >
      <div className="error-title-bar flex-row">
        <p className="error-title-text">Lỗi {routeError.status}</p>
        <div className="window-buttons flex-row">
          <button className="minimize-button">_</button>
          <button className="maximize-button">&#x25AD;</button>
          <button
            className="close-button"
            onClick={() => dispatch({ type: 'close' })}
          >
            X
          </button>
        </div>
      </div>
      <section className="error-page">
        <h1 className="status-code">{routeError.status}</h1>
        <h2 className="status-text">({routeError.statusText})</h2>
        <div className="error-desc">
          <p>Không tìm ra trang web bạn đã yêu cầu.</p>
          <ul>
            <li>Có thể đường link bạn đang truy cập không tồn tại?</li>
            <li>Có thể kết nối bị chập chờn?</li>
            <li>Có thể đường link bạn truy cập không còn tồn tại?</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
export { ErrorPage };
