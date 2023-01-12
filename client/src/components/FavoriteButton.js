import styled from "styled-components";
import React,{useState, useEffect} from 'react'
import useSWR from 'swr'
import {MdFavoriteBorder, MdFavorite} from "react-icons/md"

function FavoriteButton(props) {
    console.log('propsFB',props);
    const [user, setUser] = useState(null); 

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser))
        }
    },[])
    console.log('this user saved in local storage');
    // if user not exist in local storage
    if(user === null){
        return(
            <p>
                <span>
                    <a href="/">Log in to favorite this recipe!</a>
                </span>
            </p>
        )
    }
  return (
    <div><FindInitalState userId={user.user.id} recipeId={props.recipeId}/></div>
  )
}




export default FavoriteButton