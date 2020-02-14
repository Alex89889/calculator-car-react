import React, { useState, useEffect, Component } from "react";
import styles from "./LoanForm.styles";
import validationSchema from "./validationSchema";
import classNames from "classnames";

class CalculatorForm extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = { termMonth:24,
    downPayment: 0,
    tradeIn: 0,
    APR:0,
	postCode:0
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
		  <button type="button" className="term-month--button" value='12' onChange={this.handleInputChange}>12</button>
		  <button type="button" className="term-month--button active" value='24' onChange={this.handleInputChange}>24</button>
		  <button type="button" className="term-month--button" value='36' onChange={this.handleInputChange}>36</button>
		  <button type="button" className="term-month--button" value='48' onChange={this.handleInputChange}>48</button>
		  <button type="button" className="term-month--button" value='72' onChange={this.handleInputChange}>72</button>
		  <button type="button" className="term-month--button" value='84' onChange={this.handleInputChange}>84</button>
			  {/* <span>{formErrors.termMonth}</span>*/}
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
          {/*<span>{formErrors.downPayment}</span>*/}
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
          {/*<span>{formErrors.tradeIn}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="creditScore">Approx. Credit Score:</label>
        <div className="formField">
		  <button type="button" className="credit-score--button" value='600' onChange={this.handleInputChange}>600</button>
		  <button type="button" className="credit-score--button" value='650' onChange={this.handleInputChange}>650</button>
		  <button type="button" className="credit-score--button" value='700'  onChange={this.handleInputChange}>700</button>
		  <button type="button" value='750' onChange={this.handleInputChange} className="credit-score--button active">750</button>
		  <button type="button" className="credit-score--button" value='800' onChange={this.handleInputChange}>800</button>
		  <button type="button" className="credit-score--button" value='850' onChange={this.handleInputChange}>850</button>
		  <button type="button" className="credit-score--button" value='900' onChange={this.handleInputChange}>900</button>
          {/*<span>{formErrors.creditScore}</span>*/}
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
         {/* <span>{formErrors.APR}</span>*/}
        </div>
      </div>
      <div>
        <label htmlFor="postCode">Post Code:</label>
        <div className="formField">
          <input
            type="text"
            defaultValue={this.props.postCode}
            onChange={this.handleInputChange}
            id="postCode"
            name="postCode"
          />
          {/*<span>{formErrors.postCode}</span>*/}
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
