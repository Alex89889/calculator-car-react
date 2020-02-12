import * as yup from "yup";

yup.setLocale({
  mixed: {
    notType: function notType(_ref) {
      const { type, path } = _ref;
      return `${path} must be a ${type}.`;
    }
  }
});

yup.addMethod(yup.number, "format", function() {
  return this.transform(function(currentValue, originalValue) {
    if (originalValue === "") {
      return 0;
    }
    return currentValue;
  });
});

const validationSchema = yup.object().shape({
  carPrice: yup
    .number()
    .label("Car Price")
    .format(),
  downPayment: yup
    .number()
    .label("Down Payment")
    .format(),
  loanDurationMonths: yup
    .number()
    .min(1)
    .label("Loan Duration")
    .format(),
  loanDurationYears: yup
    .number()
    .label("Loan Duration")
    .format(),
  interestRate: yup
    .number()
    .label("Yearly Interest Rate")
    .format()
    .min(0)
    .max(100)
});

export default validationSchema;
