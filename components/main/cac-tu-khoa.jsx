import React from 'react';
import { queryData, Data, ListView } from '../Shared.jsx';
import '~/styles/main/cac-tu-khoa.scss';
const CacTuKhoa = () => {
  const queryResult = queryData({ id: 'cacTheLoai' });
  return (
    <div className="cac-tu-khoa">
      <div className="page-width-limit">
        <Data queryResult={queryResult}>
          <nav>
            <ListView autoWidth>
              {queryResult.data?.data.map((v, i) => (
                <a key={`item-${i}`} href="/">
                  {v}
                </a>
              ))}
            </ListView>
          </nav>
        </Data>
      </div>
    </div>
  );
};
export { CacTuKhoa };
