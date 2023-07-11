import React from 'react';
import { queryData, Data } from '../Shared.jsx';
import '~/styles/main/row8.scss';
const Row8 = () => {
  const queryResult = queryData({ id: 'row3Items' });
  return (
    <div className="row8 flex-row space">
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
export { Row8 };
