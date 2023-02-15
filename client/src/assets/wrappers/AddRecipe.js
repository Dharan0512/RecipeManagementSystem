import styled from "styled-components";

const Wrapper = styled.section`

  .form-head{
    border-color: black;
    margin-left: 20%;
    font-size: 22px
  }

  .form-inline {  
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .pad {
    margin-left: 2%;
  }
  .form-inline label {
    margin: 5px 10px 5px 0;
  }

  .form-inline input {
    vertical-align: middle;
    margin: 5px 10px 5px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .title-flex {
    display: flex;
    margin: 1%,0: 
  }

  .button-section {
    margin: 1%;
  }
  .button {
    padding: 10px 20px;
    background-color: dodgerblue;
    border: 1px solid #ddd;
    color: white;
    cursor: pointer;
  }

  .button:hover {
    background-color: royalblue;
  }

  .remove {
    background-color: rgb(192, 53, 53);
  }
  .remove:hover {
    background-color: rgb(187, 43, 43);
  }
`;

export default Wrapper