// import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
// import { GiKnifeFork } from "react-icons/gi";
// import UserProfile from "./components/UserProfile";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import styled from "styled-components";
import { Link} from "react-router-dom";
import Register from "./pages/Register";
import Searched from "./pages/Searched";
import SharedLayout from "./components/SharedLayout";
import { AnimatePresence } from "framer-motion";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";
import Cuisine from "./components/Cuisine";
import EppRecipe from "./components/EppRecipe";
import URecipe from "./pages/URecipe";

function App() {
  const url = window.location.pathname
  
  return (
    <div className="App">
        <AnimatePresence mode="wait">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
              <Route path="/searched/:search" element={<Searched />} />
              <Route path="/recipe/:name" element={<Recipe />} />
            </Route>
              {/* <Route path="/userrecipe/:name" element={<URecipe/>}/> */}
            <Route path="/register" element={<Register />} />
            <Route path="/addrecipe" element={<EppRecipe />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
    font-size: 1.5rem;
    font-weight: 400;
    font-family: 'Lobster Two', cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg{
        font-size: 2rem;
    }
  
    .profile{
      cursor: pointer
    }
`;
export default App;
