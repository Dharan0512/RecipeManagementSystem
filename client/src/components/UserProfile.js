import React from 'react'
import AddRecipe from "./AddRecipe"
import {CgProfile} from "react-icons/cg";
import "../assets/images/not_found.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {TbPizzaOff, Tbpizza} from 'react-icons/tb'
function UserProfile(props) {
    
  return (
    <div className='profile-pic'>
        <TbPizzaOff/>
    </div>
  )
}


export default UserProfile