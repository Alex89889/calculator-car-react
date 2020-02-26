import React, { useState, useEffect, Component } from "react";
import styles from "./LoanForm.styles";
import classNames from "classnames";
import PropTypes from 'prop-types';
import InputFormField from '../common/InputFormField';
import BtnField from '../common/BtnField';


const termMonthValue = [12, 24, 36, 48, 60, 72];
const creditScoreValue = [600, 650, 700, 750, 800, 850, 900];



class CalculatorForm extends React.Component {
	
  constructor(props) {
    super();
    this.state = {
      value: '',
      isValid: true,
    };
	};
  

  render() {
	
	const {
      downPayment, tradeIn, isDefaultScore, APR, isDefaultMonth, postCode, onChangeProp, msrp,termMonthLoan,creditScoreLoan,
      validation,
    } = this.props;

	const buttonMonthLoan = termMonthValue.map((number) =>
		<BtnField currentItem={termMonthLoan} key={number.toString()} type="button" inputClass="term-month--button" value={number} onChangeValue={onChangeProp} name="termMonthLoan"/>);  
    
	const buttonCreditScore = creditScoreValue.map((number) =>
		<BtnField currentItem={creditScoreLoan} key={number.toString()} type="button" value={number} name="creditScoreLoan" onChangeValue={onChangeProp} inputClass="term-month--button"/>);


    return (
	  <section className="calculatorWrapper" id="content-tab1" css={styles}>
     <form >
	   <div>
        <label htmlFor="termMonth">Term (Month):</label>
        <div className="btn-bar">
			{buttonMonthLoan}
		</div>
      </div>
	 
		<InputFormField label="Down Payment:" row name="downPayment" value={downPayment} onChangeValue={onChangeProp} mask="$"
			rules={
            [(value) => (+value < msrp * 0.25),
              `Only $${msrp * 0.25} has been applied to the payment, which is the maximum allowed 25% of the msrp price`]
          }/>
		<InputFormField label="Trade-In Value:" row name="tradeIn" value={tradeIn} onChangeValue={onChangeProp} mask="$" 
			rules={
            [(value) => (+value < msrp * 0.25),
              `Only $${msrp * 0.25} has been applied to the payment, which is the maximum allowed 25% of the msrp price`]
          }/>
		  
		  <div>
        <label htmlFor="creditScoreLoan">Approx. Credit Score:</label>
        <div className="btn-bar">
			{buttonCreditScore}
		</div>
      </div>
		  
	   <InputFormField label="Estimated APR:" row name="APR" value={APR} onChangeValue={onChangeProp} mask="%"/>
	   <InputFormField label="Post Code:" row name="postCode" value={postCode} onChangeValue={onChangeProp} />
	
    </form>
   </section>
    );
  }
}

export default CalculatorForm;
