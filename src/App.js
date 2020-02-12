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
    this.state = { /*termMonth:36,
    downPaymentLease: 0,
    tradeInLease: 0,
    annualMiles:12000,*/
    postCode: 0
	/*creditScore:750*/
	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleInputChange(event) {
	  
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
            initialValues={this.loanInitialValues}
            onSubmit={this.handleSubmit}
          />
        </section>
		
		<section className="calculatorWrapper" id="content-tab2">
          <LeaseForm
            className='leaseForm'
            initialValues={this.loanInitialValues}
            onSubmit={this.handleSubmit}
          />
        </section>
      </div>
	  <section className="infoCard">
		<InfoCard
            className='InfoCard'
            postCode = {this.state.postCode}
            onSubmit={this.handleSubmit}
          />
	  </section>
	 </div>
	 </div>
    );
  }
}

export default App;
