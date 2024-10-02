import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import About from "./Pages/About"
import Header from './Components/Header';
import React, { useState } from 'react';
import CoinTable from './Components/CoinTable';
import Banner from './Components/Banner';
import LIvePrice from './Components/LIvePrice';
import Signin from './Pages/Signin';




function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('INR'); // Default currency

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin' element={<Coin />} />  {/*Here which name is used of path that same name is also used in (home,about) link path */}
        <Route path='/about' element={<About />} /> 
        <Route path='/SignIn' element={<Signin />}></Route>
      </Routes>
      
      {/* Optionally include the Banner component if needed */}
      {/* <Banner selectedCurrency={selectedCurrency} /> */}

    </BrowserRouter>
  );
}

export default App;
