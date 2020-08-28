import React from 'react';
import Pagination from './pagination';

const App = () => {
  const handlePageChange = (value) => {
    console.log(value);
  };

  return <Pagination pageTotal={20} hideOnSinglePage={true} onChange={handlePageChange} />;
};

export default App;
