import React, { useState, useEffect, Component } from "react";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import { Global } from "@emotion/core";
import styles, { globalStyles } from "./App.styles";
//import LoanForm from "./components/LoanForm";
//import LeaseForm from "./components/LeaseForm";
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

    this.handleInputChangePayment = this.handleInputChangePayment.bind(this);
    this.handleInputChangeTermMonth = this.handleInputChangeTermMonth.bind(this);
	this.handleInputChangeTrade = this.handleInputChangeTrade.bind(this);
	this.handleInputChangeCredit = this.handleInputChangeCredit.bind(this);
	this.handleInputChangeMiles = this.handleInputChangeMiles.bind(this);
	this.handleInputChangeCode = this.handleInputChangeCode.bind(this);
	
	this.handleInputChangeLoanPay = this.handleInputChangeLoanPay.bind(this);
	this.handleInputChangeTerm = this.handleInputChangeTerm.bind(this);
	this.handleInputChangeTradeLoan = this.handleInputChangeTradeLoan.bind(this);
	this.handleInputChangeCreditLoan = this.handleInputChangeCreditLoan.bind(this);
	this.handleInputChangeAPR = this.handleInputChangeAPR.bind(this);
	this.handleInputChangePostCode = this.handleInputChangePostCode.bind(this);
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
  
  handleInputChangePostCode(event) {
	this.setState({postCodeLoan: event.target.value});
	this.changePaymentLoan();    
  }
  
  handleInputChangeAPR(event) {
	this.setState({APR: event.target.value});
	this.changePaymentLoan();    
  }
  
  handleInputChangeCreditLoan(event) {
	this.setState({isDefaultScore: false});  
	this.setState({creditScoreLoan: event.target.value});
	this.changePaymentLoan();    
  }
  
  handleInputChangeTradeLoan(event) {
	this.setState({tradeIn: event.target.value});
	this.changePaymentLoan();    
  }
  
  handleInputChangeLoanPay(event) {
	this.setState({downPayment: event.target.value});
	this.changePaymentLoan();  
  }

  handleInputChangeTerm(event) {
	this.setState({isDefaultMonth: false});
	this.setState({termMonthLoan: event.target.value});
	this.changePaymentLoan();  
  }
 
 
  handleInputChangeTermMonth(event) {
	  this.setState({termMonth: event.target.value});
	  this.changePaymentLease();
	  
  }
  
  handleInputChangePayment(event) {
	  this.setState({downPaymentLease: event.target.value});
	  this.changePaymentLease();  
  }
  
  handleInputChangeTrade(event) {
	 this.setState({tradeInLease: event.target.value});
	 this.changePaymentLease();  
  }
  
  handleInputChangeCredit(event) {
	this.setState({creditScore: event.target.value});
	this.changePaymentLease();    
  }
  
  handleInputChangeMiles(event) {
	this.setState({annualMiles: event.target.value});
	this.changePaymentLease();     
  }
  
  handleInputChangeCode(event) {
	this.setState({postCodeLease: event.target.value});
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
	  let APR;
	  
	  if(this.state.APR){
		APR = this.state.APR;  
	  }
	  else{ APR = 1;}
	  
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
	  console.log(newMonPayment);
	  this.setState({monthlyPaymentLoan: newMonPayment});  
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
     <form >
      <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="formField">
		  <button type="button" className="term-month--button" value="12" onClick={this.handleInputChangeTerm} name="termMonth">12</button>
		  <button type="button" className={this.state.isDefaultMonth? "term-month--button active" : "term-month--button"} value="24" onClick={this.handleInputChangeTerm} name="termMonth">24</button>
		  <button type="button" className="term-month--button" value="36" onClick={this.handleInputChangeTerm} name="termMonth">36</button>
		  <button type="button" className="term-month--button" value="48" onClick={this.handleInputChangeTerm} name="termMonth">48</button>
		  <button type="button" className="term-month--button" value="72" onClick={this.handleInputChangeTerm} name="termMonth">72</button>
		  <button type="button" className="term-month--button" value="84" onClick={this.handleInputChangeTerm} name="termMonth">84</button>
			  {/* <span>{formErrors.termMonth}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="downPayment">Down Payment:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.downPayment}
            onChange={this.handleInputChangeLoanPay}
            id="downPayment"
            name="downPayment"
          /> 
		  $
          {/*<span>{formErrors.downPayment}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="tradeIn">Trade-In Value:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.tradeIn}
            onChange={this.handleInputChangeTradeLoan}
            id="tradeIn"
            name="tradeIn"
          /> $
          {/*<span>{formErrors.tradeIn}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="creditScoreLoan">Approx. Credit Score:</label>
        <div className="formField">
		  <button type="button" className="credit-score--button" value='600' onClick={this.handleInputChangeCreditLoan}>600</button>
		  <button type="button" className="credit-score--button" value='650' onClick={this.handleInputChangeCreditLoan}>650</button>
		  <button type="button" className="credit-score--button" value='700'  onClick={this.handleInputChangeCreditLoan}>700</button>
		  <button type="button" value='750' onChange={this.handleInputChangeCreditLoan} className={this.state.isDefaultScore? "credit-score--button active" : "term-month--button"}>750</button>
		  <button type="button" className="credit-score--button" value='800' onClick={this.handleInputChangeCreditLoan}>800</button>
		  <button type="button" className="credit-score--button" value='850' onClick={this.handleInputChangeCreditLoan}>850</button>
		  <button type="button" className="credit-score--button" value='900' onClick={this.handleInputChangeCreditLoan}>900</button>
          {/*<span>{formErrors.creditScore}</span>*/}
        </div>
      </div>
	   <div>
        <label htmlFor="APR">Estimated APR:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.state.APR}
            onChange={this.handleInputChangeAPR}
            id="APR"
            name="APR"
          /> %
         {/* <span>{formErrors.APR}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="postCodeLoan">Post Code:</label>
        <div className="formField">
          <input
            type="text"
            value = {this.state.postCode}
            onChange={this.handleInputChangePostCode}
            id="postCode"
            name="postCode"
          />
          {/*<span>{formErrors.postCode}</span>*/}
        </div>
      </div>
    </form>
        </section>
		
		<section className="calculatorWrapper" id="content-tab2">
           <form>
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
            onChange={this.handleInputChangeTrade}
            id="tradeInLease"
            name="tradeInLease"
          /> $
  
        </div>
      </div>
      <div>
        <label htmlFor="creditScore">Approx. Credit Score:</label>
        <div className="formField">
			<select className="credit-score--select" onChange={this.handleInputChangeCredit} defaultValue={this.state.creditScore}>
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
         <select className="credit-score--select" onChange={this.handleInputChangeMiles} defaultValue={this.state.annualMiles}>
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
            value={this.state.postCode}
            onChange={this.handleInputChangeCode}
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
