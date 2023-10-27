import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import OrderHandlePage from './page/Order/OrderHandlePage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order/:context' element={<OrderHandlePage />} />
      </Routes>
    </div>
  );
}

export default App;
