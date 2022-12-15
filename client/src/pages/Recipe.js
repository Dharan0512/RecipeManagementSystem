import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'

function Recipe() {

  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions")
  const fetchDetails = async()=>{
    const check = localStorage.getItem('recipe')
    if(check){
       setDetails(JSON.parse(check))
    }else{    
    const key = '177c68ef76bc74460a33a631b601f508c';
    const key1 = '06c9ecde46f0fda28f044c48fe6a75aa19aa6f92';

    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${key}`);
    const detailData = await data.json();
    localStorage.setItem('recipe',JSON.stringify(detailData))
    setDetails(detailData);
    }
}

  useEffect(()=>{
    fetchDetails();
  },[params.name]);
  
console.log('extendedrecipe',details.extendedIngredients);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active": ""} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === "ingredients" ? "active": ""} onClick={()=>setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          {/* <ul>
          {details.extendedIngredients.map((ingredient)=>{
            console.log("log",ingredient.original);
            <li key={ingredient.id}>{ingredient.original}</li>
          })}
          </ul> */}
          </div>
        )}
        
        {/* issues extended Ingredient html not working on tab */}
        
        {activeTab === "ingredients" && (
          <div>
          <ul>
          {details.extendedIngredients.map((ingredient)=>{
            console.log("log",ingredient.original);
            <li key={ingredient.id}>{ingredient.original}</li>
          })}
          </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  )
}


const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe