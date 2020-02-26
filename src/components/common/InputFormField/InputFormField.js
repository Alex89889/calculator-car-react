import React, { Component } from 'react';
import styles from "./InputFormField.styles";

class InputFormField extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleErrors(value) {
    const { rules } = this.props;
    if (rules) {
      if (rules[0](value)) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    }
  }

  handleChange(event) {
    const { target: { value } } = event;
    const newValue = value.replace(/[^.\d]/g, '');
    this.setState({ value: newValue });
	
    this.handleErrors(newValue);
	
	const { name, onChangeValue, validation } = this.props;
    const { isValid } = this.state;
    if (isValid) {
      onChangeValue({ [name]: +value });
      validation(name, true);
    } else {
      validation(name, false);
    }
  }

  render() {
    const {
      label,
      name,
      row,
      mask,
      maskPos,
      rules,
    } = this.props;
    const { value, isValid } = this.state;

    let maskClass = 'input__mask';
    if (mask) {
      maskClass = maskPos === 'left' ? `${maskClass} input__mask--left` : `${maskClass} input__mask--right`;
    }
    let inputClass = 'input__input';
    if (maskPos === 'right') {
      inputClass = `${inputClass} input__input--right`;
    }

    return (
      <div  css={styles}>
        <div className={`input__body${row ? ' input__body--row' : ''}`}>
          <label className="input__label" htmlFor={name}>{label}</label>
          <div className="input__wrapper">
            <p className={maskClass}>{mask}</p>
            <input
              className={inputClass}
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {isValid || (
          <div className="input__error">
            {rules[1]}
          </div>
        )}
      </div>
    );
  }
}



InputFormField.defaultProps = {
  row: false,
  mask: '',
  maskPos: 'left',
  rules: [() => true, ''],
  validation: () => true,
};

export default InputFormField;
