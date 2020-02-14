import React, { useState, useEffect, Component } from "react";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import { Global } from "@emotion/core";
import styles, { globalStyles } from "./App.styles";
import LoanForm from "./components/LoanForm";
import LeaseForm from "./components/LeaseForm";
import InfoCard from "./components/InfoCard";

import { calculateLoan, calculateAmortization } from "./utils/loanCalculator";

class App extends React.Component {
	_isMounted = false;
	
  constructor(props) {
    super(props);
    this.state = { 
	monthlyPaymentLease:2034,
	monthlyPaymentLoan:1694,
	termMonth:36,
    downPaymentLease: 0,
    tradeInLease: 0,
    annualMiles:12000,
    postCodeLease: 0,
	creditScore:750,
    postCode: 0

	};

    this.handleInputChangePayment = this.handleInputChangePayment.bind(this);
    this.handleInputChangeTermMonth = this.handleInputChangeTermMonth.bind(this);
  }
  
  
  
  componentDidMount() {
	this._isMounted = true;  
	  
	fetch("https://ipinfo.io/json?token=d4df50232abc3b")
      .then(res => res.json())
      .then(
        (result) => {
			if (this._isMounted) {
				this.setState({postCode: result.postal});
				
			}
        },
        (error) => {
          this.setState({
            error
          });
        }
      ); 
	
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(event) {
  //  this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   // alert('Отправленное имя: ' + this.state.value);
   // event.preventDefault();
  }
  handleInputChangeTermMonth(event) {
	  this.setState({termMonth: event.target.value});
	  this.changePaymentLease();
	  
  }
  
  handleInputChangePayment(event) {
	  this.setState({downPaymentLease: event.target.value});
	  this.changePaymentLease();  
  }
  
  changePaymentLease(){
	  let creditScoreValue;
	  if(this.state.creditScore >= 750){
		creditScoreValue = 0.95;
	  }
	  else if(this.state.creditScore >= 700 && this.state.creditScore < 750){
		creditScoreValue = 1;  
	  }
	  else if(this.state.creditScore >= 640 && this.state.creditScore < 700){
		creditScoreValue = 1.05;  
	  }
	  else if(this.state.creditScore < 640){
		creditScoreValue = 1.20;    
	  }
	  let newMonPayment = Math.round((42815 - this.state.tradeInLease - this.state.downPaymentLease) * this.state.annualMiles / 10000 / this.state.termMonth * creditScoreValue);
	  this.setState({monthlyPaymentLease: newMonPayment});  
  }

  render() {
    return (
	<div css={styles}>
      <Global styles={globalStyles} />
      <header>
        <h1>Loan Lease Calculator 🚗</h1>
      </header>
	 <div className="container">
	  <div className="tabs">
		<input id="tab1" type="radio" name="tabs" defaultChecked/>
		<label htmlFor="tab1" title="Loan">Loan</label>
 
		<input id="tab2" type="radio" name="tabs"/>
		<label htmlFor="tab2" title="Lease">Lease</label>
      
        <section className="calculatorWrapper" id="content-tab1">
          <LoanForm
            className='loanForm'
            postCode = {this.state.postCode}
            onSubmit={this.handleSubmit}
          />
        </section>
		
		<section className="calculatorWrapper" id="content-tab2">
           <form onSubmit={this.handleSubmit} css={styles}>
      <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="formField">
		  <select className="term-month--select" onChange={this.handleInputChangeTermMonth} defaultValue={this.state.termMonth}>
			<option value="24">24</option>
			<option value="36">36</option>
			<option value="48">48</option>
		  </select>

        </div>
      </div>
      <div>
        <label htmlFor="downPaymentLease">Down Payment:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.downPaymentLease}
            onChange={this.handleInputChangePayment}
            id="downPaymentLease"
            name="downPaymentLease"
          /> 
		  $
   
        </div>
      </div>
      <div>
        <label htmlFor="tradeInLease">Trade-In Value:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.tradeInLease}
            onChange={this.handleInputChange}
            id="tradeInLease"
            name="tradeInLease"
          /> $
  
        </div>
      </div>
      <div>
        <label htmlFor="creditScore">Approx. Credit Score:</label>
        <div className="formField">
			<select className="credit-score--select" onChange={this.handleInputChange} defaultValue={this.state.creditScore}>
				<option value='600'>600</option>
				<option value='650'>650</option>
				<option value='700'>700</option>
				<option value='750'>750</option>
				<option value='800'>800</option>
				<option value='850'>850</option>
				<option value='900'>900</option>
			</select>

        </div>
      </div>
	   <div>
        <label htmlFor="annualMiles">Annual Miles:</label>
        <div className="formField">
         <select className="credit-score--select" onChange={this.handleInputChange} defaultValue={this.state.annualMiles}>
				<option value='10000'>10000</option>
				<option value='12000'>12000</option>
				<option value='15000'>15000</option>
			</select>

        </div>
      </div>
      <div>
        <label htmlFor="postCodeLease">Post Code:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.postCode}
            onChange={this.handleInputChange}
            id="postCodeLease"
            name="postCodeLease"
          />
        </div>
      </div>
	   <div>
        <button className="calculate-button" type="submit">Calculate</button>
      </div>
    </form>
        </section>
      </div>
	  <section className="infoCard">
		<InfoCard
            className='InfoCard'
            postCode = {this.state.postCode}
			monthlyPaymentLease = {this.state.monthlyPaymentLease}
			monthlyPaymentLoan = {this.state.monthlyPaymentLoan}
            onSubmit={this.handleSubmit}
          />
	  </section>
	 </div>
	 </div>
    );
  }
}

export default App;
