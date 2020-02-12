export function calculateMonthlyPayment({ principal, duration, interestRate }) {
  const monthlyInterest = interestRate / 12 / 100;
  return (
    principal *
    ((monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
      (Math.pow(1 + monthlyInterest, duration) - 1))
  );
}

export function calculateAmortization({
  monthlyPayment,
  annualRate,
  totalMonths,
  principal
}) {
  let currentMonth = 0;
  let unpaidBalance = principal;
  const amortizationTable = [
    {
      unpaidBalanceReduction: 0,
      monthlyPayment: 0,
      month: currentMonth,
      unpaidBalance: unpaidBalance,
      interest: 0
    }
  ];
  const monthlyInterestRate = (annualRate / 100) / 12;
  while(currentMonth < totalMonths){
    const interest = unpaidBalance * monthlyInterestRate;
    const unpaidBalanceReduction = monthlyPayment - interest;
    unpaidBalance -= unpaidBalanceReduction;
    currentMonth++;
    amortizationTable.push({
      unpaidBalanceReduction,
      monthlyPayment,
      month: currentMonth,
      unpaidBalance,
      interest
    });
  }
  return amortizationTable;
}


export function calculateLoan(params) {
  const { duration, principal } = params;
  const monthlyPayment = calculateMonthlyPayment(params);
  return {
    monthlyPayment,
    totalInterests: monthlyPayment * duration - principal
  };
}
