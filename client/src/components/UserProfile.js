import React,{useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import "../assets/images/not_found.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbPizzaOff, TbPizza } from "react-icons/tb";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup"
import { useAppContext } from "../context/appContext";


function UserProfile() {
const {user} = useAppContext()
const isLogin = localStorage.getItem("user");
// const user = JSON.parse(isLogin)
console.log('value',isLogin,user);
  const logout = async () => {
    console.log("logout called");
    
    localStorage.removeItem("user");
    window.location.reload();
     await axios.get('http://localhost:4000/api/auth/logout')
  };

  useEffect(()=>{
  },[logout, user])
  return (
    <DIV className="profile">
      {isLogin ? <TbPizza/> :<TbPizzaOff/>}
      {isLogin ? (
        <Popup trigger={<Button>{user.name}</Button>} position="right center" className="red">
        <Link to={"/favourites"}>
          <Button>Favorites</Button>
        </Link>
        <Link to={"/addrecipe"}>
          <Button>Add Recipe</Button>
        </Link>
        <Link to={"/myrecipe"}>
          <Button>My Recipe</Button>
        </Link>
        <Link to={`/cart/${user._id}`}>
          <Button>Cart</Button>
        </Link>
        <Button onClick={()=> logout()}>LogOut</Button>
        </Popup>
        // <Button onClick={() => logout()}>LOG OUT</Button>
      ) : (
        <Popup trigger={<Button>Log in</Button>} position="right center" className="red">
        <Link to={"/register"}>
          <div>Login</div>
        </Link>
      </Popup>
      )}
    </DIV>
  );
}

const DIV = styled.div`
  .profile {
    cursor: pointer;
  },
  .red: {
    margin-top: 2%;  background: rgb(139,0,0);  width: 50%;  padding: 5px;
  }
`;


export default UserProfile;
