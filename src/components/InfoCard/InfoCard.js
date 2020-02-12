import React, { useState, useEffect, Component } from "react";
import styles from "./InfoCard.styles";
import classNames from "classnames";


class InfoCard extends Component {
  _isMounted = false;
	
  state = {
    tasks: []
  }
  
  async componentDidMount() {
	this._isMounted = true;
	  
    await fetch("./data/infoCard-mock.js")
      .then(res => res.json())
      .then(
        (result) => {
			if (this._isMounted) {
				this.setState({
					isLoaded: true,
					items: result.items
				});
			}
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
	 const { error, isLoaded, items } = this.state;
	 if(this.props.postCode){
		this.taxes = this.props.postCode.split('').map(num => num * 11)
	 }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
	    <section className="info-card">
          {items.map((item,index) => (
		    <div key={item.id}>
				<p><b>MSRP</b>: {item.MSRP } </p>
				<p><b>Vehicle name</b>: {item.vehicleName} </p>		
				<p><b>Monthly loan payment</b>: </p>
				<p><b>Monthly lease payment</b>: </p>
				<p><b>Taxes</b>: {this.taxes}</p> 
				<p><b>Dealer name</b>: {item.dealerName} </p>	
				<p><b>Dealer phone number</b>: {item.dealerPhone} </p>	
				<p><b>Dealer rating</b>: {item.dealerRating} </p>	
			</div> 
          ))}
		</section>
      );
    }
  }
}

export default InfoCard;

