import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';
import { Button } from '@mui/material';

function FilterModal(props, onFilter) {
  const [isActive, setIsActive] = useState(false);
  const [isVeganActive, setVeganActive] = useState(false);

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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Apply</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FilterModal