import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from "react-router-dom";
import {MdFavoriteBorder, MdFavorite} from "react-icons/md"
import axios from "axios"
function UserRecipe() {
  const [veggie, setVeggie] = useState([]); //function allow to modify the variable
  const [favorties, setFavorites] = useState([])
  const  getVeggie = async ()=>{
      const count = 20;
      const api = await axios.get(`http://localhost:4000/api/v1/recipe/`).then(data=>{
         setVeggie(data.data.msg)

      }).catch((err)=>{console.log(err)});
      
      console.log('userRecipe',veggie);
    
  }
  useEffect(()=>{
   getVeggie()
  },[])

  // const handleFavorites = useCallback((newImage)=>{
  //   console.log('newImage',newImage.type.name);
    
  //   if(newImage.type.name == "MdFavorite"){
  //    return  setSelectedImage(<MdFavoriteBorder/>)
  //   }else if(newImage.type.name == "MdFavoriteBorder"){
  //     return setSelectedImage(<MdFavorite/>)
  //   }
  // },[setSelectedImage])

 const toggleFavorite = (id)=>{
   
   if(favorties.includes(id)){
     setFavorites(favorties.filter(f=> f !== id));
     localStorage.setItem("usrFav",[...favorties])
    }else{
      localStorage.setItem("usrFav",[...favorties,id])
      setFavorites([...favorties,id])
    }
    console.log('fav',favorties,id);
 } 
  return (
    <div>
        <Wrapper>
          <h3>User Recipes</h3>
          <Splide options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: '3rem',
          }}>
          {veggie.map((recipe)=>{
            return(
              <SplideSlide key={recipe._id}>
                <Card>
                {/* <span onClick={()=>{toggleFavorite(recipe._id)}} className="fav">{favorties.includes(recipe._id) ? <MdFavorite/> : <MdFavoriteBorder/>}</span> */}
                <Link to={"/recipe/"+recipe._id}>
                  <p>{recipe.title}</p>
                  <img src={`http://localhost:4000/static/${recipe.image.name}.jpeg`} alt={recipe.title}></img>
                  <Gradient/>
                </Link>
                </Card>
              </SplideSlide>
            );
          })}
          </Splide>
        </Wrapper>
    </div>
  )
};

const Wrapper = styled.div`
    margin: 4rem 0rem;
  `
  const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
  
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem
  }

  .fav{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: black;
    width: 100%;
    text-align: left;
    font-weight: 600;
    font-size: 2rem;
    height: 40%
    display: flex;
    justify-content: flex-end;
    align-item: 0rem;
    margin-bottom: 22rem;
    margin-left: 1rem;
  }

`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))
`

export default UserRecipe