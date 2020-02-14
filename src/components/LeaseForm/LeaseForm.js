import React, { useState, useEffect, Component } from "react";
import styles from "./LeaseForm.styles";
import validationSchema from "./validationSchema";
import classNames from "classnames";

class CalculatorForm extends React.Component {

	
  constructor(props) {
    super(props);
    this.state = { termMonth:36,
    downPaymentLease: 0,
    tradeInLease: 0,
    annualMiles:12000,
    postCodeLease: 0, 
	creditScore:750
};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
	 <form onSubmit={this.handleSubmit} css={styles}>
      <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="formField">
		  <select className="term-month--select" onChange={this.handleInputChange} value={this.state.termMonth}>
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
            value={this.state.downPaymentLease}
            onChange={this.handleInputChange}
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
            value={this.state.tradeInLease}
            onChange={this.handleInputChange}
            id="tradeInLease"
            name="tradeInLease"
          /> $
  
        </div>
      </div>
      <div>
        <label htmlFor="creditScore">Approx. Credit Score:</label>
        <div className="formField">
			<select className="credit-score--select" onChange={this.handleInputChange} value={this.state.creditScore}>
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
         <select className="credit-score--select" onChange={this.handleInputChange} value={this.state.annualMiles}>
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
            value={this.props.postCode}
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
    );
  }
}

export default CalculatorForm;
