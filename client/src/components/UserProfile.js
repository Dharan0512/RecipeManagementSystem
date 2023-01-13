import React from 'react'
import styled from 'styled-components';
import AddRecipe from "./AddRecipe"
import {CgProfile} from "react-icons/cg";
import "../assets/images/not_found.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {TbPizzaOff, Tbpizza} from 'react-icons/tb'


function UserProfile(props) {
    
  return (
    <DIV className='profile'>
        <TbPizzaOff/> Sign IN
    </DIV>
  )
}

const DIV = styled.div`
  .profile{
    cursor: pointer;
  }


` 

export default UserProfile