// import Pages from "./pages/Pages";

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
import CartContainer from "./components/CartContainer";
import { useAppContext } from "./context/appContext";
import { useEffect } from "react";

function App() {
  const url = window.location.pathname
  const {setAuthCookies} = useAppContext()
  useEffect(()=>{
    const cookies ={
      authToken: localStorage.getItem('token'),
      csrfToken:  'IBIWF_SES_AUTH_TOKEN'
    }
    setAuthCookies(cookies)
  },[setAuthCookies])
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
              <Route path="/addrecipe" element={<EppRecipe />} />
              <Route path="/cart/:id" element={<CartContainer />} />
            </Route>
              {/* <Route path="/userrecipe/:name" element={<URecipe/>}/> */}
            <Route path="/register" element={<Register />} />
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
