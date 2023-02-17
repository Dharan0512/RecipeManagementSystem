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


function UserProfile(props) {

const isLogin = localStorage.getItem("user");
console.log('value',isLogin);
  const logout = async () => {
    console.log("logout called");
    
    localStorage.removeItem("user");
    window.location.reload();
     await axios.get('http://localhost:4000/api/auth/logout')
  };

  useEffect(()=>{
  },[logout])
  return (
    <DIV className="profile">
      {isLogin ? <TbPizza/> :<TbPizzaOff/>}
      {isLogin ? (
        <Popup trigger={<Button>Log Out</Button>} position="right center" className="red">
        <Button>Favorites</Button>
        <Button>Cart</Button>
        <Button>Orders</Button>
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
