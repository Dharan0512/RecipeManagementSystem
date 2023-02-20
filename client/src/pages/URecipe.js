import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'
import axios from "axios";

function URecipe() {
  let params = useParams();
  
  const [details, setData] = useState({});
  const [activeTab, setActiveTab] = useState("instructions")
  
  const fetchDetails = async()=>{
      try{
        console.log('is it work');
        // const data = await fetch(`http://localhost:4000/api/v1/recipe/${params.name}`).then((res)=>{return console.log(res)});
        let data = await axios.get(`http://localhost:4000/api/v1/recipe/${params.name}`)
        
        let detailData = await data.json()
        console.log('data',detailData);
        setData(detailData.data)
      }catch(err){
        console.log(err);
      }
      
  }
  useEffect(()=>{
    fetchDetails()
})

  
  
  
console.log('extendedrecipe',details.length);

  return (
    <>{details.title === undefined ? <h1>loading</h1> : null}
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
              <ul>
              { details.instructions.map((ingredient)=>{
                console.log("log",ingredient);
                return  <li key={ingredient.id}>name:{ingredient.step}</li>
              })}
            </ul>
          </div>
        )}
        
        {/* issues extended Ingredient html not working on tab */}
        
        {activeTab === "ingredients" && (
          <div>
            <ul>
              { details.extendedIngredients.map((ingredient)=>{
                console.log("log",ingredient.original);
                return  <li key={ingredient.id}>name:{ingredient.name}{ingredient.amount} metric:{ingredient.metric}</li>
              })}
            </ul>
          </div>
        
        )}
      </Info>
        
   </DetailWrapper>
  
    </>
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

export default URecipe