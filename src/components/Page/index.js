import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Page = ({ pageConfig, pageCallbackFn, groupCount }) => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [startPage, setStartPage] = useState(1); // 分组开始页码
  const [totalPage, setTotalPage] = useState(1); // 总页数

  useEffect(() => {
    setTotalPage(pageConfig.totalPage);
    pageCallbackFn(currentPage);
  }, [pageConfig.totalPage]);

  const handlePageClick = (currentPage) => {
    // 当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
    if (currentPage >= groupCount) {
      const newStartPage = currentPage - 2;
      setStartPage(newStartPage);
    }
    if (currentPage < groupCount) {
      setStartPage(1);
    }
    // 第一页时重新设置分组的起始页
    if (currentPage === 1) {
      setStartPage(1);
    }
    setCurrentPage(currentPage);
    // 将当前页码返回父组件
    pageCallbackFn(currentPage);
  };

  const handlePrePageClick = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage === 0) {
      return false;
    }
    handlePageClick(newCurrentPage);
  };

  const handleNextPageClick = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage > totalPage) {
      return false;
    }
    handlePageClick(newCurrentPage);
  };

  const renderPageList = () => {
    let pages = [];
    // 上一页
    pages.push(
      <li className={currentPage === 1 ? styles.nomore : null} onClick={handlePrePageClick} key={0}>
        上一页
      </li>
    );

    if (totalPage <= 10) {
      // 总页码小于等于 10 时，全部显示出来
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <li key={i} onClick={() => handlePageClick(i)} className={currentPage === i ? styles.activePage : null}>
            {i}
          </li>
        );
      }
    } else {
      // 总页码大于 10 时，部分显示

      // 第一页
      pages.push(
        <li className={currentPage === 1 ? styles.activePage : null} key={1} onClick={() => handlePageClick(1)}>
          1
        </li>
      );

      let pageLength = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage;
      } else {
        pageLength = groupCount + startPage;
      }
      // 前面省略号(当 当前页码 大于等于 分组的页码 时，显示省略号)
      if (currentPage >= groupCount) {
        pages.push(<li key={-1}>···</li>);
      }
      // 非第一页 和 最后一页 显示
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(
            <li className={currentPage === i ? styles.activePage : null} key={i} onClick={() => handlePageClick(i)}>
              {i}
            </li>
          );
        }
      }
      // 后面省略号
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li key={-2}>···</li>);
      }
      // 最后一页
      pages.push(
        <li
          className={currentPage === totalPage ? styles.activePage : null}
          key={totalPage}
          onClick={() => handlePageClick(totalPage)}
        >
          {totalPage}
        </li>
      );
    }
    // 下一页
    pages.push(
      <li
        className={currentPage === totalPage ? styles.nomore : null}
        onClick={handleNextPageClick}
        key={totalPage + 1}
      >
        下一页
      </li>
    );
    return pages;
  };

  return <ul className={styles.pageContainer}>{renderPageList()}</ul>;
};

Page.propTypes = {
  pageConfig: PropTypes.shape({
    totalPage: PropTypes.number,
  }),
  pageCallbackFn: PropTypes.func,
  groupCount: PropTypes.number,
};

Page.defaultProps = {
  pageConfig: {
    totalPage: 1,
  },
  pageCallbackFn: () => {},
  groupCount: 5,
};

export default Page;
