import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';

const Pagination = ({ pageTotal, hideOnSinglePage, onChange }) => {
  if (hideOnSinglePage && pageTotal === 1) {
    return null;
  }

  return <Page pageConfig={{ totalPage: pageTotal }} pageCallbackFn={onChange} />;
};

Pagination.propTypes = {
  pageTotal: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  pageTotal: 1,
  hideOnSinglePage: false,
  onChange: () => {},
};

export default Pagination;
