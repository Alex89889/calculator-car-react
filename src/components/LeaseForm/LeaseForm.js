import React, { useState, useEffect, Component } from "react";
import styles from './LeaseForm.styles';
import classNames from "classnames";
import InputFormField from '../common/InputFormField';
import SelectFormField from '../common/SelectFormField';

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
      termMonth, downPaymentLease, tradeInLease, creditScore, annualMiles, postCodeLease, onChangeProp, msrp,
      validation
	  } = this.props;
			
    return (
	 <section className="calculatorWrapper" id="content-tab2">
           <form>
      <SelectFormField
          label="Term (Month):"
          name="termMonth"
          value={termMonth}
          options={[24, 36, 48]}
          onChangeProp={onChangeProp}
        />
	  <InputFormField label="Down Payment:" row name="downPaymentLease" value={downPaymentLease} onChangeValue={onChangeProp} mask="$"
			rules={
            [(value) => (+value < msrp * 0.25),
              `Only $${msrp * 0.25} has been applied to the payment, which is the maximum allowed 25% of the msrp price`]
       }/>
       <InputFormField label="Trade-In Value:" row name="tradeInLease" value={tradeInLease} onChangeValue={onChangeProp} mask="$" 
			rules={
            [(value) => (+value < msrp * 0.25),
              `Only $${msrp * 0.25} has been applied to the payment, which is the maximum allowed 25% of the msrp price`]
          }/>
     <SelectFormField
          label="Approx. Credit Score:"
          name="creditScore"
          value={creditScore}
          options={[600, 650, 700, 750, 800, 850, 900]}
          onChangeProp={onChangeProp}
        />
	  <SelectFormField
          label="Annual Miles:"
          name="annualMiles"
          value={annualMiles}
          options={[1000, 1200, 1500]}
          onChangeProp={onChangeProp}
        />
	  <InputFormField label="Post Code:" row name="postCodeLease" value={postCodeLease} onChangeValue={onChangeProp} />
      
    </form>
   </section>
    );
  }
}

export default CalculatorForm;
