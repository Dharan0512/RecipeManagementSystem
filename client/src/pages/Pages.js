//routing 
import React from 'react';
import Home from './Home';
// import Cuisine from './Cuisine';
import Cuisine from '../components/Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import {Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import AddRecipe from '../components/AddRecipe';
import EppRecipe from '../components/EppRecipe';
function Pages() {
  const location = useLocation();
  
  return (
    // usefull for routes which is connected identify in web url
    <AnimatePresence exitBeforeEnter>
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Home/>}/>
      <Route path='/cuisine/:type' element={<Cuisine/>}/>
      <Route path='/searched/:search' element={<Searched/>}/>
      <Route path="/searched:search" element={<Searched/>}/>
      <Route path="/recipe/:name" element={<Recipe/>}/>
      <Route path="/addrecipe" element={<EppRecipe/>}/>
    </Routes>
    </AnimatePresence>
  )
}

export default Pages