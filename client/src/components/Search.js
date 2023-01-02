import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  //event handler
  const submitHandler = (e) =>{

   e.preventDefault();
    navigate('/searched/'+input)
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <div>
        <FaSearch>
        </FaSearch>
        <input onChange={(e)=> setInput(e.target.value)} type="text" value={input}/>
        {/* button */}
        </div>
        <div>         
        </div>
        <Button varient="outline">
          Filters
        </Button>
      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 13rem;
    div{
      display: flex;
      flex-direction: row;
      position: relative;
      width: 100%;
    }
    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 2rem;
        outline: none;
    }

    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }

    button{
      border: none;
      padding: 1rem 2rem;
      margin: 1rem 0rem 1rem 5rem;
      border-radius: 5px;
      background: linear-gradient(35deg, #494949, #313131);
    }

    button:active{
      color: none;
      outline: none;
    }
`

export default Search