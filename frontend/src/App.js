import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';

function App() {
  return (
    <BrowserRouter>
      <header className='App-header'>
        <a href='/'>AMAZON</a>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:slug' element={<ProductInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
