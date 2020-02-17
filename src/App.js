import React, { useState, useEffect, Component } from "react";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import { Global } from "@emotion/core";
import styles, { globalStyles } from "./App.styles";
import InfoCard from "./components/InfoCard";

import { calculateLoan, calculateAmortization } from "./utils/loanCalculator";

class App extends React.Component {
	_isMounted = false;
	
  constructor(props) {
    super(props);
    this.state = { 
		monthlyPaymentLease:2034,
		monthlyPaymentLoan:1695,
		termMonth:36,
		downPaymentLease: 0,
		tradeInLease: 0,
		annualMiles:12000,
		postCodeLease: 0,
		creditScore:750,
		creditScoreLoan:750,
		postCode: 0,
		termMonthLoan:24,
		downPayment: 0,
		tradeIn: 0,
		APR:0,
		postCodeLoan:0,
		isDefaultMonth: true,
		isDefaultScore: true
	};

  }
  
  componentDidMount() {
	this._isMounted = true;  
	  
	fetch("https://ipinfo.io/json?token=d4df50232abc3b")
      .then(res => res.json())
      .then(
        (result) => {
			if (this._isMounted) {
				this.setState({postCode: result.postal});
				this.setState({postCodeLoan: result.postal});
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
  
  handleInputChange = (event) => {
	this.setState({isDefaultScore: false}); 
	this.setState({isDefaultMonth: false});
	const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

	this.changePaymentLoan();    
  }
  
  handleInputChangeLease = (event) => {
	
	const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

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
  
  changePaymentLoan(){
	  let creditScoreValue;
	  let APR = this.state.APR || 1;
	  
	  if(this.state.creditScoreLoan >= 750){
		creditScoreValue = 0.95;
	  }
	  else if(this.state.creditScoreLoan >= 700 && this.state.creditScoreLoan < 750){
		creditScoreValue = 1;  
	  }
	  else if(this.state.creditScoreLoan >= 640 && this.state.creditScoreLoan < 700){
		creditScoreValue = 1.05;  
	  }
	  else if(this.state.creditScoreLoan < 640){
		creditScoreValue = 1.20;    
	  }
	  let newMonPayment = Math.round((42815 - this.state.tradeIn - this.state.downPayment) / this.state.termMonthLoan * creditScoreValue * APR);
	  this.setState({monthlyPaymentLoan: newMonPayment});  
  }
  
	
  render() {
	const termMonthValue = [12, 24, 36, 48, 60, 72];
	const buttonMonthLoan = termMonthValue.map((number) =>
		(number === 24) ?
		<button key={number.toString()} type="button" className={this.state.isDefaultMonth? "term-month--button active" : "term-month--button"} value={number} onClick={this.handleInputChange} name="termMonthLoan">{number}</button>
		: <button key={number.toString()} type="button" className="term-month--button" value={number} onClick={this.handleInputChange} name="termMonthLoan">{number}</button>);  
    
	const creditScoreValue = [600, 650, 700, 750, 800, 850, 900];
	const buttonCreditScore = termMonthValue.map((number) =>
		(number === 750) ?
		<button key={number.toString()} type="button" value={number} onChange={this.handleInputChange} name="creditScoreLoan" className={this.state.isDefaultScore? "credit-score--button active" : "term-month--button"}>{number}</button>
		: <button key={number.toString()} type="button" className="credit-score--button" value={number} onClick={this.handleInputChange} name="creditScoreLoan">{number}</button>	);
	
	const termMonthValueLease = [24, 36, 48];
	const selectTermMonth = termMonthValueLease.map((number) =>
		<option key={number.toString()} value={number}>{number}</option>
	);
	
	const selectCreditScore = creditScoreValue.map((number) =>
		<option key={number.toString()} value={number}>{number}</option>
	);
	
	const annualMilesValue = [10000, 12000, 15000];
	const selectAnnualMiles = annualMilesValue.map((number) =>
		<option key={number.toString()} value={number}>{number}</option>
	);
	
	
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
     <form >
      <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="formField">
			{buttonMonthLoan}
		</div>
      </div>
      <div>
        <label htmlFor="downPayment">Down Payment:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.downPayment}
            onChange={this.handleInputChange}
            id="downPayment"
            name="downPayment"
          /> 
		  $
        </div>
      </div>
      <div>
        <label htmlFor="tradeIn">Trade-In Value:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.tradeIn}
            onChange={this.handleInputChange}
            id="tradeIn"
            name="tradeIn"
          /> $
        </div>
      </div>
      <div>
        <label htmlFor="creditScoreLoan">Approx. Credit Score:</label>
        <div className="formField">
			{buttonCreditScore}
		</div>
      </div>
	   <div>
        <label htmlFor="APR">Estimated APR:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.APR}
            onChange={this.handleInputChange}
            id="APR"
            name="APR"
          /> %
        </div>
      </div>
      <div>
        <label htmlFor="postCodeLoan">Post Code:</label>
        <div className="formField">
          <input
            type="text"
            value = {this.state.postCode}
            onChange={this.handleInputChange}
            id="postCode"
            name="postCode"
          />
        </div>
      </div>
    </form>
        </section>
		
		<section className="calculatorWrapper" id="content-tab2">
           <form>
      <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="formField">
		  <select className="term-month--select" onChange={this.handleInputChangeLease} defaultValue={this.state.termMonth}>
			  {selectTermMonth}
		  </select>

        </div>
      </div>
      <div>
        <label htmlFor="downPaymentLease">Down Payment:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.downPaymentLease}
            onChange={this.handleInputChangeLease}
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
            onChange={this.handleInputChangeLease}
            id="tradeInLease"
            name="tradeInLease"
          /> $
  
        </div>
      </div>
      <div>
        <label htmlFor="creditScore">Approx. Credit Score:</label>
        <div className="formField">
			<select className="credit-score--select" onChange={this.handleInputChangeLease} defaultValue={this.state.creditScore}>
				{selectCreditScore}
			</select>

        </div>
      </div>
	   <div>
        <label htmlFor="annualMiles">Annual Miles:</label>
        <div className="formField">
         <select className="credit-score--select" onChange={this.handleInputChangeLease} defaultValue={this.state.annualMiles}>
			 {selectAnnualMiles}
		</select>
        </div>
      </div>
      <div>
        <label htmlFor="postCodeLease">Post Code:</label>
        <div className="formField">
          <input
            type="text"
            value={this.state.postCode}
            onChange={this.handleInputChangeLease}
            id="postCodeLease"
            name="postCodeLease"
          />
        </div>
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
