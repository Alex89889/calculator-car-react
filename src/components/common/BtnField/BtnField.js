import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./BtnField.styles";

class BtnField extends Component {
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


  handleChange(event) {
	event.preventDefault();

	const { name, onChangeValue, validation } = this.props;
    const { isValid, value } = this.state;
    if (isValid) {
      onChangeValue({ [name]: +value });
      validation(name, true);
    } else {
      validation(name, false);
    }

  }

  render() {
    const {
      name,
      inputClass,
	  currentItem
    } = this.props;
    const { value, isValid } = this.state;


    return (
        <button
            className={`btn-bar__button${currentItem === value ? ' btn-bar__button--active' : ''}`}
            type="text"
            name={name}
            value={value}
            onClick={this.handleChange}>
			{value}
	    </button>
    );
  }
}

BtnField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  validation: PropTypes.func,
};

BtnField.defaultProps = {
  validation: () => true,
};

export default BtnField;
