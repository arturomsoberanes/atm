import atmImg from './img/ATM.svg';
import React from 'react'
import ATMDeposit from './ATMDeposit';
import './App.css';

function App(){
  let deposit = 0; // state of this transaction
  const [atmMode, setAtmMode] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = e => {
    console.log(`handleChange ${e.target.value}`);
    deposit = Number(e.target.value);
    if(atmMode === "Cash Back" && deposit > totalState){
      setIsValid(false);
    }else{
      setIsValid(true);
    }
  };
  const handleSubmit = (e) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    e.target.txtForm.value = "";
    e.preventDefault();
  };
  const selectChange = (e) => {
    let mode = e.target.value;
    if (mode === "") setAtmMode("");
    if (mode === "Deposit"){
      setAtmMode("Deposit");
      setIsDeposit(true);
      setIsValid(true);
    }
    if (mode === "Cash Back"){
      setAtmMode("Cash Back");
      setIsDeposit(false);
    }
  }

  return (
    <div className="form-container">
      <img src={atmImg} alt="ATM image" />
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <select id="ATMoptions" onChange={selectChange}>
          <option value=""></option>
          <option value="Deposit">Deposit</option>
          <option value="Cash Back">Cash Back</option>
        </select>
        {atmMode === ""
          ? <p>Please choose</p>
          : <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={isValid}></ATMDeposit>
        }
      </form>
    </div>
  );
};

export default App;
