import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import OrderHandle from './page/OrderHandle';
import Search from './page/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order/:context' element={<OrderHandle />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
