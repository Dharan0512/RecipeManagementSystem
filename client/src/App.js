import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Search from "./components/Search";
import styled from "styled-components";
import { Link, HashRouter } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
function App() {
  const url = window.location.pathname
  console.log('url',url);
  
  return (
    <div className="App">
      <BrowserRouter basename="/register">
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
       </BrowserRouter>
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
