import React from 'react';
import { queryData, Data } from '../Shared.jsx';
import '~/styles/main/row3-4-5.scss';
const Row3 = () => {
  const queryResult = queryData({ id: 'row3Banners' });
  return (
    <div className="row3 flex-row">
      {queryResult.data?.data.map((v, i) => (
        <div key={`item-${i}`} className={i === 1 ? 'center' : null}>
          <Data queryResult={queryResult}>
            <a href=".">
              <img
                src={`${queryResult.data?.urlPrefix}${v}${queryResult.data?.urlSuffix}`}
                alt="Banner"
              />
            </a>
          </Data>
        </div>
      ))}
    </div>
  );
};
const Row4 = () => {
  const queryResult = queryData({ id: 'row10Items' });
  return (
    <div className="row4">
      <Data queryResult={queryResult}>
        <ul className="flex-row space">
          {queryResult.data?.data.map((v, i) => (
            <li key={`item-${i}`} className="flex-col">
              <a href=".">
                <img
                  src={`${queryResult.data?.urlPrefix}${v.src}${queryResult.data?.urlSuffix}`}
                  className="phan-hinh"
                  alt="Banner"
                />
                <p className="phan-chu">{v.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </Data>
    </div>
  );
};
const Row5 = () => {
  const queryResult = queryData({ id: 'row4Items' });
  return (
    <div className="row5 flex-row space">
      {queryResult.data?.data.map((v, i) => (
        <div key={`item-${i}`}>
          <Data queryResult={queryResult}>
            <a href=".">
              <img
                src={`${queryResult.data?.urlPrefix}${v}${queryResult.data?.urlSuffix}`}
                alt="Banner"
              />
            </a>
          </Data>
        </div>
      ))}
    </div>
  );
};
export { Row3, Row4, Row5 };
