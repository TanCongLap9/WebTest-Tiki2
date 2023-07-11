import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import '~/styles/main/templates.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faCompactDisc,
  faCircleExclamation,
  faStar,
  faStarHalf,
} from '@fortawesome/free-solid-svg-icons';

// -- CÁC HÀM --

/**
 * Sử dụng `fetch` để lấy dữ liệu JSON từ URL
 * @param {string} url Địa chỉ lấy dữ liệu
 * @param {...object} params Các tham số khác
 * @return {Promise}
 */
export const fetcher = async (
  url = 'https://62ecdb67818ab252b603f9f3.mockapi.io/data',
  params = {}
) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...params,
  });
  return response.ok
    ? response.json()
    : Promise.reject(
        new URIError(`Fetch error: ${response.status} (${response.statusText})`)
      );
};
/**
 * Rút gọn cho hàm `useQuery`
 * @param {object} args Các tham số của hàm
 * @param {string} args.url Địa chỉ lấy dữ liệu
 * @param {string} args.id ID (chuỗi) cần truy cập của dữ liệu trả về
 * @param {(data) => *} args.select Giá trị trả về từ hàm
 * @param {...object} args.params Các tham số khác cho `useQuery`
 * @return {UseQueryResult}
 */
export const queryData = ({ url, id, select, ...params } = {}) =>
  useQuery({
    queryKey: ['data'],
    queryFn: () => fetcher(url),
    refetchOnWindowFocus: false,
    retry: true,
    select:
      select ?? ((data) => (id ? data.find((obj) => obj.id === id) : data)),
    ...params,
  });

/** Mã hoá mật khẩu
 * @param {string} key Chuỗi cần mã hoá
 * @param {string} code Chuỗi ngẫu nhiên gắn liền với `key`
 * @return {string}
 */
export const encryptPassword = (key, code) => {
  const asc = (chr, offset) => chr.codePointAt(0) + offset;
  return Array.from(key)
    .map((_, i) =>
      String.fromCodePoint(
        ((asc(key[i], -32) + asc(code[i], -32)) % (126 - 32 + 1)) + 32
      )
    )
    .join('');
};

// -- CÁC COMPONENT --

/**
 * Danh sách theo dạng ngang với nút tiến và nút lùi trang
 * @example
 * <caption>Tóm tắt component:</caption>
 * <div className="[className] viewport">
 *   <ul className="list">{children}</ul>
 *   <button className="prev-btn">
 *     <FontAwesomeIcon className="icon" />
 *   </button>
 *   <button className="next-btn">
 *     <FontAwesomeIcon className="icon" />
 *   </button>
 * </div>
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.className - Tên lớp cho viewport, được cách ra bằng dấu cách nếu nhiều tên lớp
 * @param {Array} props.children - Các phần tử được cho vào danh sách
 * @param {number|string} props.width - Chiều dài của khung nhìn
 * @param {number|string} props.height - Chiều cao của khung nhìn
 * @param {number} [props.autoScrollTime] - Số milligiây chờ để chuyển sang trang tiếp theo (nếu phần tử không được di chuột vào)
 * @return {JSX.Element}
 * @example
 * const queryResult = Util.queryData('cacTheLoai');
 * return (
 *   <Util.Data queryResult={queryResult}>
 *     <Util.ListView>
 *       {queryResult.data?.data.map((v, i) => (
 *         <a key={`item-${i}`} href="/">
 *           {v}
 *         </a>
 *       ))}
 *     </Util.ListView>
 *   </Util.Data>
 * );
 */
export const ListView = ({
  className,
  children,
  autoWidth,
  autoScrollTime,
}) => {
  const [offset, setOffset] = React.useState(0);
  const [prevBtnEnabled, setprevBtnEnabled] = React.useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(false);
  const [viewport, ul] = [0, 0].map(() => React.useRef(null));
  let viewportWidth, endPosition;
  React.useEffect(() => {
    viewportWidth = viewport.current.clientWidth;
    endPosition = ul.current.scrollWidth - viewportWidth;
    setprevBtnEnabled(offset > 0);
    setNextBtnEnabled(offset < endPosition);
  });
  return (
    <div className={`${className || ''} viewport`.trim()} ref={viewport}>
      <ul
        className="list flex-row"
        style={{
          transform: `translateX(-${offset}px)`,
          width: autoWidth ? undefined : 100 * children.length + '%',
        }}
        ref={ul}
      >
        {children.map((v, i) => (
          <li
            key={`item-${i}`}
            className="list-item"
            style={{
              width: autoWidth ? undefined : 100 / children.length + '%',
            }}
          >
            {v}
          </li>
        ))}
      </ul>
      {prevBtnEnabled && (
        <button
          onClick={() => setOffset(Math.max(0, offset - viewportWidth))}
          className="prev-btn"
          role="button"
          aria-label="Nút lùi"
          aria-description="Chuyển sang trang trước"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="icon" />
        </button>
      )}
      {nextBtnEnabled && (
        <button
          onClick={() =>
            setOffset(Math.min(endPosition, offset + viewportWidth))
          }
          className="next-btn"
          aria-label="Nút tiến"
          aria-description="Chuyển sang trang sau"
        >
          <FontAwesomeIcon icon={faChevronRight} className="icon" />
        </button>
      )}
    </div>
  );
};
/**
 * Danh sách theo dạng ngang với các nút đại diện cho các trang
 * @example
 * <caption>Tóm tắt component:</caption>
 * <div className="[className] viewport">
 *   <ul className="list">{children}</ul>
 *   <ul className="page-selection">
 *     (<li>
 *       <button className="page-button [selected]"></button>
 *     </li>)* // * children.length phần tử
 *   </ul>
 *   {prevNextBtn ?
 *     <button className="prev-btn">
 *       <FontAwesomeIcon className="icon" />
 *     </button>
 *     <button className="next-btn">
 *       <FontAwesomeIcon className="icon" />
 *     </button>
 *   : null}
 * </div>
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.className - Tên lớp cho viewport, được cách ra bằng dấu cách nếu nhiều tên lớp
 * @param {Array} props.children - Các phần tử được cho vào danh sách
 * @param {number|string} props.width - Chiều dài của khung nhìn
 * @param {number|string} props.height - Chiều cao của khung nhìn
 * @param {boolean} props.prevNextBtn - Hiện các nút tiến, nút lùi trang
 * @param {boolean} props.loop - Lặp lại về đầu trang khi nhấn nút tiến ở cuối trang và ngược lại
 * @param {number} [props.autoScrollTime] - Số milligiây chờ để chuyển sang trang tiếp theo (nếu phần tử không được di chuột vào)
 * @return {JSX.Element}
 * @example
 * const queryResult = Util.queryData('banner14Items');
 * return (
 *   <Util.Data queryResult={queryResult}>
 *     <Util.PagedView prevNextBtn loop>
 *       {queryResult.data?.data.map((v, i) => (
 *         <a key={`item-${i}`} href=".">
 *           <img src={v.src} width="824px" height="274px" alt="Banner" />
 *         </a>
 *       ))}
 *     </Util.PagedView>
 *   </Util.Data>
 * );
 */
export const PagedView = ({
  className,
  children,
  autoWidth,
  prevNextBtn,
  loop,
  autoScrollTime,
}) => {
  const reducer = React.useCallback((page, action) => {
    switch (action.type) {
      case 'set':
        return action.value;
      case 'prev':
        return (page - 1 + children.length) % children.length;
      case 'next':
        return (page + 1) % children.length;
    }
  }, []);

  const [page, dispatch] = React.useReducer(reducer, 0);
  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(0);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(0);
  const ul = React.useRef(null);
  React.useEffect(() => {
    setPrevBtnEnabled(page > 0 || loop);
    setNextBtnEnabled(page < children.length - 1 || loop);
  }, [page]);
  return (
    <div className={`${className || ''} viewport`.trim()}>
      <ul
        className="list flex-row"
        ref={ul}
        style={{
          transform: `translateX(-${
            (page * ul.current?.clientWidth) / children.length
          }px)`,
          width: autoWidth ? undefined : 100 * children.length + '%',
        }}
      >
        {children.map((v, i) => (
          <li
            key={`item-${i}`}
            className="list-item"
            style={{
              width: autoWidth ? undefined : 100 / children.length + '%',
            }}
          >
            {v}
          </li>
        ))}
      </ul>
      <ul className="page-selection flex-row">
        {children.map((_, i) => (
          <li key={`page-${i}`}>
            <button
              onClick={() => dispatch({ type: 'set', value: i })}
              className={`page-button ${page === i ? 'selected' : ''}`.trim()}
              aria-selected={page === i}
              aria-label="Nút trang"
              aria-description={`Chuyển sang trang ${i + 1}`}
            />
          </li>
        ))}
      </ul>
      {prevNextBtn && (
        <>
          {prevBtnEnabled && (
            <button
              onClick={() => dispatch({ type: 'prev' })}
              className="prev-btn"
              aria-label="Nút lùi"
              aria-description="Chuyển sang trang trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="icon" />
            </button>
          )}
          {nextBtnEnabled && (
            <button
              onClick={() => dispatch({ type: 'next' })}
              className="next-btn"
              aria-label="Nút tiến"
              aria-description="Chuyển sang trang sau"
            >
              <FontAwesomeIcon icon={faChevronRight} className="icon" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
/**
 * Biểu tượng đang tải
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.className - Tên lớp (nếu có) được thêm vào biểu tượng, dùng để định kiểu
 * @return {JSX.Element}
 */
const Loading = ({ className }) => (
  <div className="loading-wrapper">
    <div className={`loading ${className ?? ''}`.trim()} aria-label="Đang tải">
      <FontAwesomeIcon icon={faCompactDisc} className="icon" />
    </div>
  </div>
);
/**
 * Biểu tượng lỗi
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.className - Tên lớp (nếu có) được thêm vào biểu tượng, dùng để định kiểu
 * @param {Error} props.error - Nội dung lỗi
 * @param {() => void} props.retry - Hàm dùng để thử tải lại
 * @return {JSX.Element}
 */
const Error = ({ className, error, retry }) => {
  return (
    <div className="error-wrapper">
      <div className={`error ${className ?? ''}`.trim()} aria-label="Lỗi">
        <button
          onClick={() => retry()}
          aria-label="Nút thử lại"
          aria-description="Nhấn vào nút để thử kết nối lại"
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="icon" bounce />
        </button>
        <p className="text">
          {error.message}
          <br />
          Nhấn vào đây để thử tải lại
        </p>
      </div>
    </div>
  );
};
/**
 * Component trả về biểu tượng đang tải, biểu tượng lỗi hoặc nội dung của nó, tuỳ vào giá trị của ``queryResult.status``
 * @param {object} props - Các thuộc tính của component
 * @param {UseQueryResult} props.queryResult - Kết quả truy vấn
 * @param {JSX.Element} props.children - Kết quả hiển thị khi tải xong
 * @return {JSX.Element}
 */
export const Data = ({ queryResult, children }) => {
  switch (queryResult.status) {
    case 'loading':
      return <Loading />;
    case 'error':
      return (
        <Error error={queryResult.error} retry={() => queryResult.refetch()} />
      );
  }
  return children;
};
/**
 * Giá thành
 * @example
 * <caption>Tóm tắt component:</caption>
 * <div className="khung-gia-thanh">
 *   <span className="gia-thanh [da-giam]">
 *     <span className="d" />
 *   </span>
 *   {Boolean(giamGia) && <span className="giam-gia" />}
 *  </div>
 * @param {object} props - Các thuộc tính của component
 * @param {number|string} props.gia - Giá
 * @param {number|string} props.giamGia - Giảm giá, là số >= 0
 * @return {JSX.Element}
 */
export const GiaThanh = ({ gia, giamGia }) => (
  ([gia, giamGia] = [Number(gia), Number(giamGia)]),
  (
    <div className="khung-gia-thanh">
      <span className={`gia-thanh ${giamGia ? 'da-giam' : ''}`.trim()}>
        {`${gia.toLocaleString('vi-VN')} `}
        <span className="d" aria-label="đồng">
          đ
        </span>
      </span>
      {Boolean(giamGia) && (
        <span className="giam-gia" aria-label={`Đã giảm ${giamGia}%`}>
          {-giamGia + '%'}
        </span>
      )}
    </div>
  )
);
/**
 * Tình trạng bán
 * @example
 * <caption>Tóm tắt component:</caption>
 * <div className="thanh-tong">
 *   <div className="thanh-da-ban" />
 *   {banChay ? <img className="ban-chay" /> : null}
 *   <span className="phan-chu"></span>
 * </div>
 * @param {object} props - Các thuộc tính của component
 * @param {boolean} props.banChay - Mặt hàng bán chạy
 * @param {number|string} props.daBan - Số lượng mặt hàng đã bán
 * @param {number|string} props.tongCong - Tổng số lượng mặt hàng
 * @return {JSX.Element}
 */
export const TinhTrangBan = ({ banChay, daBan, phanTramDaBan }) => (
  <div className="thanh-tong">
    <div
      className="thanh-da-ban"
      style={{
        width: phanTramDaBan ? `${phanTramDaBan}%` : '20px',
      }}
    />
    {banChay && (
      <img
        src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
        className="ban-chay"
        alt="Bán chạy"
      />
    )}
    <span className="phan-chu">
      {daBan != 0 ? `Đã bán ${daBan}` : 'Vừa mở bán'}
    </span>
  </div>
);
/** Rút gọn cho phần tử `<svg>`
 * @param {object} props Các thuộc tính của component
 * @param {number|string} props.width Chiều dài của `<svg>`
 * @param {number|string} props.height Chiều cao của `<svg>`
 * @param {Array<object>=} props.g Phần tử `<g>` (với các thuộc tính của nó) nhóm các phần tử đường vẽ lại. Chỉ nhóm khi `g` có giá trị
 * @param {Array<object>=} props.shapes Các phần tử đường vẽ (như `<path>` hoặc `<circle>`) của `<svg>`, mỗi cái với các thuộc tính của nó
 * @param {Array<object>=} props.defs Các phần tử trong `<defs>` của `<svg>`, mỗi cái với các thuộc tính của nó
 * @param {object=} props.mask Phần tử `<mask>` của `<svg>`
 * @param {object=} props.attrs Các thuộc tính khác của `<svg>`
 * @param {JSX.Element} props.children Các phần tử khác được nhồi vào `<svg>`
 * @return {JSX.Element}
 */
export const Svg = ({
  width,
  height,
  g,
  shapes,
  mask,
  defs,
  children,
  ...attrs
}) => {
  const processElem = (elem, i) =>
    elem.type === 'clipPath' ? (
      <elem.type key={`item-${i}`} {...{ ...elem, type: null, rect: null }}>
        <rect {...elem.rect} />
      </elem.type>
    ) : elem.type === 'linearGradient' || elem.type === 'radialGradient' ? (
      <elem.type key={`item-${i}`} {...{ ...elem, type: null, stops: null }}>
        {elem.stops.map((v, i) => (
          <stop key={`item-${i}`} {...v} />
        ))}
      </elem.type>
    ) : (
      <elem.type key={`item-${i}`} {...{ ...elem, type: null }} />
    );
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...attrs}
    >
      {defs && <defs>{defs.map(processElem)}</defs>}
      {shapes?.map(processElem)}
      {g &&
        g.map((v, i) => (
          <g key={`item-${i}`} {...{ ...v, type: null, children: null }}>
            {v.children.map(processElem)}
          </g>
        ))}
      {mask && (
        <mask {...{ ...mask, type: null, children: null }}>
          {mask.children.map(processElem)}
        </mask>
      )}
      {}
    </svg>
  );
};
export const DanhGia = ({ sao }) => (
  <span className="danh-gia cac-sao-xam flex-row">
    {Array.from({ length: 5 }).map((v, i) => (
      <FontAwesomeIcon key={`item-${i}`} icon={faStar} className="sao-xam" />
    ))}
    <span className="cac-sao-vang flex-row">
      {Array.from({ length: Math.ceil(sao) }).map((v, i) => (
        <FontAwesomeIcon
          key={`item-${i}`}
          icon={Math.min(sao - i, 1) >= 0.5 ? faStar : faStarHalf}
          className="sao-vang"
        />
      ))}
    </span>
  </span>
);
