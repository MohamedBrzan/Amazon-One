import React from 'react';
import PageTitle from '../../utils/PageTitle';
import ProductsPage from '../Products/Products';

const Home = () => {
  return (
    <div className='home'>
      <PageTitle title='Amazon' />
      <ProductsPage />
    </div>
  );
};

export default Home;
