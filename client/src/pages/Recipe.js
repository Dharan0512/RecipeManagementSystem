import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'
import axios from "axios";

function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [html, setHtml] = useState({__html: ""})
  const [activeTab, setActiveTab] = useState("instructions")
  
  const fetchDetails = async()=>{
      // const check = localStorage.getItem('recipe')
      // const check = 0;
      // if(check){
      //    setDetails(JSON.parse(check))
      // }else{    
      try{
        //     // const key = process.env.API_KEY;

        //     const key = '77c68ef76bc74460a33a631b601f508c';
        //     const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${key}`);
            
        //     let detailData = await data.json()
        //     setDetails(detailData);
        
        // localStorage.setItem('recipe',JSON.stringify(detailData))
        const key = '77c68ef76bc74460a33a631b601f508c';
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${key}`);
        let detailData; 
        if(data.status === 200){
          return detailData = await data.json()
        } 
        if(data.status === 404){
          
          let backData = await axios.get(`http://localhost:4000/api/v1/recipe/${params.name}`).then(data=>{
            console.log("msg",data.msg.data);
            
         setDetails(data.msg)}).catch((err)=>{console.log(err)});
          // return detailData = await backData.json();
        }
        // setDetails(detailData);
        
        
        localStorage.setItem('recipe',JSON.stringify(detailData))
      }catch(err){
        console.log(err);
        
      }
    }
  
  
  
  const fetchHtml = async()=>{
    // let check = localStorage.getItem('label');
    let check = 0;
    if(check){
      setHtml(JSON.parse(check))
    }else{
      
      try {
        const key = '77c68ef76bc74460a33a631b601f508c';
        //nutrition fetch
        const nutritionLabel = await fetch(`https://api.spoonacular.com/recipes/${params.name}/nutritionLabel?apiKey=${key}`)
        const labelData = await nutritionLabel.text();
        localStorage.setItem('label',JSON.stringify(labelData))
        return {__html: labelData}
      } catch (error) {
        console.log('labelerror',error);
      }
    }
  }
  
  useEffect(()=>{
    // fetchDetails().then(result => setDetails(result))
    fetchHtml().then(result => setHtml(result))
  },[])
  
  useEffect(()=>{
    fetchDetails();
  },[]);
  
console.log('extendedrecipe',details);

  return (
    <>
   {params.name.length > 6 ?
   //user recipe loading
   <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
         <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active": ""} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === "ingredients" ? "active": ""} onClick={()=>setActiveTab('ingredients')}>Ingredients</Button>
        {/* {activeTab === "instructions" && (
          <div>
              <ul>
              { details.instructions.map((ingredient)=>{
                console.log("log",ingredient);
                return  <li key={ingredient.id}>name:{ingredient.step}</li>
              })}
            </ul>
          </div>
        )} */}
        
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
    :  
    //api recipe loading
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
        <h2 className="label">Nutrition Label</h2>
      <div dangerouslySetInnerHTML={html}/>
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active": ""} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === "ingredients" ? "active": ""} onClick={()=>setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          {  <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>  || null}
          </div>
        )}
        
        {/* issues extended Ingredient html not working on tab */}
        
        {activeTab === "ingredients" && (
          <div>
            <ul>
              { details.extendedIngredients.map((ingredient)=>{
                console.log("log",ingredient.original);
                return  <li key={ingredient.id}>{ingredient.original}</li>
              })}
            </ul>
          </div>
        
        )}
      </Info>
  </DetailWrapper>}
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

export default Recipe