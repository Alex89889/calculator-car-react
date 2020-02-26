import React, { useState, useEffect, Component } from "react";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import { Global } from "@emotion/core";
import styles, { globalStyles } from "./App.styles";
import getCreditScoreValue from './utils/utils';
import InfoCard from "./components/InfoCard";
import LeaseForm from "./components/LeaseForm";
import LoanForm from "./components/LoanForm";


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
	
	this.isValid = {};

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
  
  componentDidUpdate(prevProps, prevState) {
	const {
      downPayment, tradeIn, isDefaultScore, APR, isDefaultMonth, postCode, monthlyPaymentLoan, termMonthLoan, creditScoreLoan, 
	  downPaymentLease, tradeInLease, termMonth, creditScore, annualMiles, postCodeLease
    } = this.state;

    const {
      downPayment: newDownPayment, tradeIn: newTradeIn, isDefaultScore: newIsDefaultScore,creditScoreLoan: newCreditScoreLoan,
      postCode: newPostCode, APR: newAPR, isDefaultMonth: newIsDefaultMonth, monthlyPaymentLoan: newMonthlyPaymentLoan,termMonthLoan: newTermMonthLoan,
	  downPaymentLease: newDownPaymentLease, tradeInLease: newTradeInLease, termMonth: newTermMonth, creditScore: newCreditScore,
	  annualMiles: newAnnualMiles, postCodeLease: newPostCodeLease
    } = prevState;

    const isValid = Object.keys(this.isValid).every((key) => this.isValid[key] === true);

    const isChangePaymentLoan = downPayment !== newDownPayment || tradeIn !== newTradeIn || creditScoreLoan !== newCreditScoreLoan
    || isDefaultScore !== newIsDefaultScore || postCode !== newPostCode || APR !== newAPR
    || isDefaultMonth !== newIsDefaultMonth || monthlyPaymentLoan !== newMonthlyPaymentLoan || termMonthLoan !== newTermMonthLoan;
	
    const isChangePaymentLease = downPaymentLease !== newDownPaymentLease || tradeInLease !== newTradeInLease
    || termMonth !== newTermMonth || creditScore !== newCreditScore || annualMiles !== newAnnualMiles
    || postCodeLease !== newPostCodeLease; 
	 
    if (isChangePaymentLoan && isValid) {
      this.changePaymentLoan();
    }
	if (isChangePaymentLease && isValid) {
      this.changePaymentLease();
    }
  }
  
  changePaymentLease(){ 
	  let newMonPayment = Math.round((42815 - this.state.tradeInLease - this.state.downPaymentLease) * this.state.annualMiles / 10000 / this.state.termMonth * getCreditScoreValue(this.state.creditScore));
	  this.setState({monthlyPaymentLease: newMonPayment});  
  }
  
  changePaymentLoan(){
	  let APR = this.state.APR || 1;
	  let newMonPayment = Math.round((42815 - this.state.tradeIn - this.state.downPayment) / this.state.termMonthLoan * getCreditScoreValue(this.state.creditScoreLoan) * APR);
	  this.setState({monthlyPaymentLoan: newMonPayment});  
  }
  
  changeProp=(prop)=> {
    this.setState({ ...prop });
  }
  
	
  render() {
	  
	const {
      downPayment, tradeIn, isDefaultScore, APR, isDefaultMonth, postCode, monthlyPaymentLoan, validation,termMonthLoan,downPaymentLease,tradeInLease,termMonth,
	  creditScore,postCodeLease,annualMiles, monthlyPaymentLease, creditScoreLoan
    } = this.state;	
	
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
        <LoanForm 
			downPayment={downPayment}
			tradeIn={tradeIn}
			isDefaultScore={isDefaultScore}
			APR={APR}
			isDefaultMonth = {isDefaultMonth}
			postCode={postCode}	
			msrp={monthlyPaymentLoan}
			onChangeProp={this.changeProp}
			termMonthLoan={termMonthLoan}
			creditScoreLoan={creditScoreLoan}
		/>
		<LeaseForm 
			downPaymentLease={downPaymentLease}
			tradeInLease={tradeInLease}
			termMonth={termMonth}
			creditScore={creditScore}
			annualMiles = {annualMiles}
			postCodeLease={postCodeLease}
			msrp={monthlyPaymentLease}
			onChangeProp={this.changeProp}
		/>
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
