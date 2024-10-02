
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from '../Components/Header';
import React, { useState } from 'react';
import CoinTable from '../Components/CoinTable';
import Banner from '../Components/Banner';
import LIvePrice from '../Components/LIvePrice';

function Home() {
  return (
    <div>

      <Header/>
      <Banner/>
      <CoinTable/>
      <LIvePrice/>
      
    </div>
        
  )
}

export default Home
