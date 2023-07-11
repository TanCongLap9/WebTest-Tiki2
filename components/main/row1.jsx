import React from 'react';
import { queryData, Data, PagedView } from '../Shared.jsx';
import '~/styles/main/row1.scss';
const Banner14Trang = () => {
  const queryResult = queryData({ id: 'banner14Items' });
  return (
    <div className="banner-14-trang">
      <Data queryResult={queryResult}>
        <PagedView prevNextBtn loop>
          {queryResult.data?.data.map((v, i) => (
            <a key={`item-${i}`} href=".">
              <img
                src={`${queryResult.data?.urlPrefix}${v}${queryResult.data?.urlSuffix}`}
                alt="Banner"
              />
            </a>
          ))}
        </PagedView>
      </Data>
    </div>
  );
};
const HoanTien25KXu = () => {
  const queryResult = queryData({ id: 'hoan50kxu' });
  return (
    <div className="hoan-tien-25k-xu">
      <Data queryResult={queryResult}>
        <a href=".">
          <img
            src={`${queryResult.data?.urlPrefix}${queryResult.data?.data[0]}${queryResult.data?.urlSuffix}`}
            alt="Hoàn tiền 25K Xu"
          />
        </a>
      </Data>
    </div>
  );
};
export { Banner14Trang, HoanTien25KXu };
