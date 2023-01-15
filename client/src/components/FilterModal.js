import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Slider from '@mui/material/Slider'
import {useState} from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

function FilterModal(props) {
  const [isActive, setIsActive] = useState(false);
  const [isVeganActive, setVeganActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState([0]);
  const [sugarValue, setSugarValue] = useState([0]);
  const [proteinValue, setProteinValue] = useState([0]);
  console.log('props',props);
  
  const handleChange = (event)=>{

    switch (event.target.name) {
      case 'isActive':
        console.log('veg');
        setIsActive(event.target.checked);
        break;
      case 'isActives':
        console.log('vegan');
        setVeganActive(event.target.checked);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event, onFilter)=>{
    event.preventDefault();
    console.log('event',event);
    
    onFilter({isActive, isVeganActive, selectedValue, sugarValue, proteinValue})
  }

  const handleChangeValue = (event, value)=>{
    setSelectedValue(value);
  }

  const handleSugarValue = (event, value)=>{
    setSugarValue(value);
  }

  const handleProteinValue = (event, value)=>{
    setProteinValue(value)
  }
  const applyFilters = ()=>{
    //value Filters
    const minValue = selectedValue[0];
    const maxValue = selectedValue[1];
    const minSugar = sugarValue[0];
    const maxSugar = sugarValue[1];
    const minProtein = proteinValue[0];
    const maxProtein = proteinValue[1];
    
  }

  useEffect(()=>{
    applyFilters();
  },[isActive, isVeganActive, selectedValue, sugarValue, proteinValue])

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='is-active'>
              <input 
              type="checkbox"
              id="is-active"
              name='isActive'
              checked={isActive}
              onChange={handleChange}
                />
             &nbsp; Vegetarian
            </label>
         </div>
         <div>
            <label htmlFor='is-actives'>
              <input 
              type="checkbox"
              id="is-actives"
              name='isActives'
              checked={isVeganActive}
              onChange={handleChange}
              />
             &nbsp; Vegan
            </label>
          </div>
          <div>
            <SlidersCss>
            <label htmlFor='is-actives' className='health-title'>
             &nbsp; Carb Level
            </label>
              <Slider value={selectedValue}
              onChange={handleChangeValue}
              valueLabelDisplay='on'
              min={0}
              // max={100}
              size="medium"
              className="slider"
              />
            </SlidersCss>
          </div>
          {/* sugar level */}
          <div>
            <SlidersCss>
            <label htmlFor='is-actives' className='health-title'>
             &nbsp; SugarLevel
            </label>
              <Slider value={sugarValue}
              onChange={handleSugarValue}
              valueLabelDisplay='on'
              min={0}
              // max={100}
              size="medium"
              className="slider"
              />
            </SlidersCss>
          </div>

          {/* protein level */}
           <div>
            <SlidersCss>
            <label htmlFor='is-actives' className='health-title'>
             &nbsp; ProteinLevel
            </label>
              <Slider value={proteinValue}
              onChange={handleProteinValue}
              valueLabelDisplay='on'
              min={0}
              // max={100}
              size="medium"
              className="slider"
              />
            </SlidersCss>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* props.onHide TODO:*/}
      <Button onClick={props.onHide} type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}


const SlidersCss = styled.div`
  display: block;
  margin-right: 20rem;

  .health-title{
    margin-top: .5rem
  }

  .slider{
    margin-top: 2rem;
  }

`

export default FilterModal