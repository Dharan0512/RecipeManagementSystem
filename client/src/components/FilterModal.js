import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Slider from '@mui/material/Slider'
import {useState} from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

function FilterModal(props, onFilter) {
  const [isActive, setIsActive] = useState(false);
  const [isVeganActive, setVeganActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState([0]);

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

  const handleSubmit = (event)=>{
    event.preventDefault();
    onFilter({isActive, isVeganActive})
  }

  const handleChangeValue = (event, value)=>{
    setSelectedValue(value);
  }

  const applyFilters = ()=>{
    //Price Filters
    const minValue = selectedValue[0];
    const maxValue = selectedValue[1];
    
  }

  // useEffect(()=>{
  //   applyFilters();
  // },[selectedValue])

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
             &nbsp; Healthiness
            </label>
              <Slider value={selectedValue}
              onChange={handleChangeValue}
              valueLabelDisplay='on'
              min={0}
              // max={100}
              size="medium"
              />
            </SlidersCss>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Apply</Button>
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
`

export default FilterModal