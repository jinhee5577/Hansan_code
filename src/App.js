 /*eslint-disable*/ 
import React, { Component, useEffect, useState, useRef, } from 'react';
import Home from './Home.js';
import Traffic from './Traffic.js';
import { Link, Route, Routes, } from 'react-router-dom';
import './App.css';


function App() { 
  useEffect( () => {    

  }, [] );
  
  return (     
      <div className="App">        
        <Routes>   
            <Route exact path="/" element={<Home />} />     
            <Route  path="/car" element={<Traffic />} />     
        </Routes>      
      </div>
  );
}


export default App;
