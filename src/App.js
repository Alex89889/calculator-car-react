import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import { Global } from "@emotion/core";
import styles, { globalStyles } from "./App.styles";
import LoanForm from "./components/LoanForm";
import LeaseForm from "./components/LeaseForm";
import InfoCard from "./components/InfoCard";
//import PaymentsSummary from "./components/PaymentsSummary";
import { calculateLoan, calculateAmortization } from "./utils/loanCalculator";

const loanInitialValues = {
  carPrice: 10000,
  downPayment: 0,
  loanDurationMonths: 12,
  interestRate: 4.5 // Per Year
};

function App() {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterests, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // Calculate loan with the initial values when the component mounts
  useEffect(() => {
    updateLoanValues(loanInitialValues);
  }, []);

  // Calculate loan when the user submits new values
  const handleSubmit = values => {
    updateLoanValues(values);
  };

  const updateLoanValues = values => {
    const { carPrice, downPayment, loanDurationMonths, interestRate } = values;
    const principal = carPrice - downPayment;
    const { monthlyPayment, totalInterests } = calculateLoan({
      principal,
      duration: loanDurationMonths,
      interestRate
    });
    const amortizationSchedule = calculateAmortization({
      monthlyPayment,
      annualRate: interestRate,
      totalMonths: loanDurationMonths,
      principal: principal
    });
    setMonthlyPayment(monthlyPayment);
    setTotalInterest(totalInterests);
    setAmortizationSchedule(amortizationSchedule);
  };

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
            initialValues={loanInitialValues}
            onSubmit={handleSubmit}
          />
        </section>
		
		<section className="calculatorWrapper" id="content-tab2">
          <LeaseForm
            className='leaseForm'
            initialValues={loanInitialValues}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
	  <section className="infoCard">
		<InfoCard
            className='InfoCard'
            initialValues={loanInitialValues}
            onSubmit={handleSubmit}
          />
	  </section>
	 </div>
    </div>
  );
}

export default App;
