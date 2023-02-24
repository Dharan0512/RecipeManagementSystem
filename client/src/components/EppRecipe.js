import React,{useEffect, useState} from 'react'
import Wrapper from "../assets/wrappers/AddRecipe"
import { useAppContext } from '../context/appContext';
function EppRecipe() {
     const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [instructions, setInstructions] = useState([{step: ""}]);
    const [ingredients, setIngredients] = useState([{name: "", amount: "", metric: ""}]);
    const [servings, setServings] = useState(Number);
    const [pricePerServing,setPricePerServing] = useState(Number)
    const [preparationTime, setPreparationTime] = useState(Number)
    const { setAuthCookies, token} = useAppContext()
    let addFormField = ()=>{
      setIngredients([...ingredients, {name: "", amount: ""}])
    }
    let addInsFormField = ()=>{
      setInstructions([...instructions, {step: ""}])
    }

    let removeFormField = (i)=>{
      let newFormValues = [...ingredients]
      newFormValues.splice(i,1)
      setIngredients(newFormValues)
    }
    let removeInsFormField = (i)=>{
      let newFormValues = [...instructions]
      newFormValues.splice(i,1)
      setInstructions(newFormValues)
    }

    let handleChange = (i, e)=>{
      let newFormValues = [...ingredients]
      newFormValues[i][e.target.id] = e.target.value;
      setIngredients(newFormValues)
    }

    let handleInsChange = (i, e)=>{
      let newFormValues = [...instructions]
      newFormValues[i][e.target.id] = e.target.value 
      setInstructions(newFormValues)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

     const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInstructionChange = (e) => {
        const newInstructions = [...instructions, e.target.value];
        setInstructions(newInstructions);
    };

    const handleServing = (e)=>{
      setServings(e.target.value)
    }

    const handlePerServing = (e)=>{
      setPricePerServing(e.target.value)
    }

    const handlePreparation = (e)=>{
      setPreparationTime(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

    // perform form submission logic here
    let formData = new FormData();

    // append the title and image data to the form data
    formData.append("title", title);
    
    formData.append("image", image);
    formData.append("servings",servings)
    formData.append("pricePerServing",pricePerServing)
    formData.append("preparationInMin",preparationTime)
    // append the instructions and ingredients data to the form data

    instructions.forEach((instruction, index) => {
    formData.append(`instructions[${index}][step]`, instruction.step);
  });

    

     ingredients.forEach((ingredient, index) => {

        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][amount]`, ingredient.amount);
        formData.append(`ingredients[${index}][metric]`, ingredient.metric);
      });

    // formData.append("ingredients",[...ingredients])


      console.log('formdata',formData);
      
      const config = {     
      headers: { 'content-type': 'multipart/form-data'}
    }
    
    // make a fetch request to submit the form data
    console.log('image',formData);
    // Axios.post("/api/submit-recipe",{title:formData.get('title'),image: formData.get('image'),ingredients: formData.getAll('...ingredients')},config)
    // .then((res)=>console.log(res.json()))
    // .catch((err)=>{console.log(err)});

        await fetch("http://localhost:4000/api/v1/recipe/upload", {
          method: "POST",
          body: formData,
          headers: {'Authorization': `Bearer ${token}`}
        }, config)  .then((response) => response.json())
        .then((data) => {
          console.log("Form submitted successfully!");
          console.log(data);
        })
        .catch((error) => {
          console.error("Form submission failed:", error);
        });

        };

        useEffect(()=>{

        },[ingredients, instructions])

        
  useEffect(()=>{
    const cookies ={
      authToken: localStorage.getItem('token'),
      csrfToken:  'IBIWF_SES_AUTH_TOKEN'
    }
    setAuthCookies(cookies)
  },[setAuthCookies])

  return (
      <Wrapper>
    <div>
      <form onSubmit={handleSubmit} className="form-head">
        <div className='title-flex'>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            className="form-inline pad"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} className="pad" />
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>

            {instructions.map((instruction, index) => (
              <div key={index}>
                <label htmlFor='instructions'>step{index + 1}:</label>
                <input
                type="text"
                id="step"
                 className="pad"
                value={instruction["step"] || ""}
                onChange={e => handleInsChange(index, e)}
                />
            {
              index ? <button type='button' className="button remove"
              onClick={()=> removeInsFormField(index)}> Remove</button> : null
              }
              </div>
            ))}
       
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addInsFormField()}>Add</button>
          </div>
        </div>
        <div>
          <label>Servings</label>
          <input type="number" id='serving' placeholder='approx serving' className="form-inline pad" onChange={(e)=>handleServing(e)}></input>
        </div>
        {/* price per servings */}
        <div>
          <label>Price per Servings</label>
          <input type="number" id='pricePerServing' placeholder='approx price for per serving' className="form-inline pad" onChange={(e)=>handlePerServing(e)}></input>
        </div>
         <div>
          <label>Preparation in Min</label>
          <input type="number" id='preparationInMin' placeholder='min' className="form-inline pad" onChange={(e)=>handlePreparation(e)}></input>
        </div>
      <div>
        <label htmlFor="ingredients">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label><h6>Name</h6></label>
            <input
              type="text"
              id="name"
               className="form-inline pad"
              value={ingredient['name'] || ""}
              onChange={e => handleChange(index, e) }
              />
            <label><h6>Amount</h6></label>
            <input
              type="number"
              id="amount"
              className="form-inline pad"
              value={ingredient['amount'] || ""}
              onChange={e => handleChange(index,e)}
              />
            
            <label><h6>Metrics</h6></label>
            <select
              id="metric"
              className='pad'
              value={ingredient['metric'] || "pcs"}
              onChange={e=> handleChange(index,e)}
              >
                <option value=""></option>
                <option value="pcs">piece</option>
                <option value="Kg">Kg</option>
                <option value="gram">gram</option>
                <option value="teaspoon">Teaspoon</option>
                <option value="bowl">Bowl</option>
                <option value="ml">ml</option>
                <option value="miligram">mg</option>
            </select>
            {
              index ? <button type='button' className="button remove"
              onClick={()=> removeFormField(index)}> Remove</button> : null
            }
          </div>
        ))}
       
      </div>
        <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormField()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
        </div>
      </form>
    </div>
</Wrapper>
  )
}

export default EppRecipe