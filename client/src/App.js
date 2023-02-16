// import Pages from "./pages/Pages";
// import Category from "./components/Category";
// import Search from "./components/Search";
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

function App() {
  const url = window.location.pathname
  console.log('url',url);
  
  return (
    <div className="App">
      {/* <BrowserRouter basename="/register">
          <Register/>
      </BrowserRouter>
      <BrowserRouter basename="/api">
          <Nav>
          <GiKnifeFork/>
          <Logo to={"/"}>Recipe Management</Logo>
          <UserProfile className="profile"/>
      </Nav>
        <Search/>
        <Category/>
        <Pages />
       </BrowserRouter> */}
        <AnimatePresence exitBeforeEnter>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
              <Route path="/searched/:search" element={<Searched />} />
              <Route path="/recipe/:name" element={<Recipe />} />
            </Route>
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
