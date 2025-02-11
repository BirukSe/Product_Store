import React from 'react'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import {Routes, Route} from 'react-router-dom';
const App = () => {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/> 
      </Routes>
      
    </div>
  )
}

export default App;
