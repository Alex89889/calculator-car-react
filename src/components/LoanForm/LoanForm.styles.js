import { css } from "@emotion/core";
import { COLORS } from "../../constants";

export default css`
	  font-size: 2rem;
  padding: 0 5rem;
  .container{
	display: flex;
    justify-content: space-between; 
	flex-direction: row;
  }
  .tabs{
	  width:70%;
  }
  .infoCard{
	  width:30%;
	  border: 1px solid #ddd;
	  padding: 20px;
	  margin-left: 20px;
  }
  .calculatorWrapper {
    display: flex;
    justify-content: space-between;
    .loanForm {
      width: 100%;
    }
  }

  header h1 {
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 4rem;
  }
  
/* Стили секций с содержанием */
.tabs>section {
	display: none;
	padding: 15px;
	background: #fff;
	border: 1px solid #ddd;
}
.tabs>section>p {
	margin: 0 0 5px;
	line-height: 1.5;
	color: #383838;
	animation-duration: 1s;
	animation-fill-mode: both;
	animation-name: fadeIn;
}
/* Описываем анимацию свойства opacity */
 
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.tabs>input {
	display: none;
	position: absolute;
}

.tabs>label {
	display: inline-block;
	margin: 0 0 -1px;
	padding: 15px 25px;
	font-weight: 600;
	text-align: center;
	color: #aaa;
	border: 0px solid #ddd;
	border-width: 1px 1px 1px 1px;
	background: #f1f1f1;
	border-radius: 3px 3px 0 0;
}


.tabs>label:hover {
	color: #888;
	cursor: pointer;
}

.tabs>input:checked+label {
	color: #555;
	border-top: 1px solid #009933;
	border-bottom: 1px solid #fff;
	background: #fff;
}

#tab1:checked~#content-tab1, #tab2:checked~#content-tab2, #tab3:checked~#content-tab3, #tab4:checked~#content-tab4 {
	display: block;
}

  input {
    font-size: 1.8rem;
    border: 0.3rem solid ${COLORS.PRIMARY_1};
    padding: 1rem;
  }
  
  .post-code--input{
	width: 100%;
  }
 
  .term-month--select{
	width: 100%;
    color: ${COLORS.PRIMARY_2};
    background-color: ${COLORS.SECONDARY_2};
    border: none;
    font-size: 2rem;
	border: 1px solid ${COLORS.PRIMARY_1};
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }  
  }
  .term-month--select.active{
		background-color: ${COLORS.SECONDARY_1};
	}
   .credit-score--select{
	width: 100%;
    color: ${COLORS.PRIMARY_2};
    background-color: ${COLORS.SECONDARY_2};
    border: none;
    font-size: 2rem;
	border: 1px solid ${COLORS.PRIMARY_1};
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }  
  }
  .credit-score--select.active{
		background-color: ${COLORS.SECONDARY_1};
	}
  .calculate-button {
    width: 100%;
    color: ${COLORS.SECONDARY_2};
    background-color: ${COLORS.PRIMARY_1};
    border: none;
    padding: 1rem 2rem;
    font-size: 2rem;
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }
  }

 
  .term-month--button{
	width: 16%;
    color: ${COLORS.PRIMARY_2};
    background-color: ${COLORS.SECONDARY_2};
    border: none;
    font-size: 2rem;
	border: 1px solid ${COLORS.PRIMARY_1};
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }  
  }
  .term-month--button.active{
	  border: 2px solid ${COLORS.SECONDARY_1}
	}
   .credit-score--button{
	width: 14%;
    color: ${COLORS.PRIMARY_2};
    background-color: ${COLORS.SECONDARY_2};
    border: none;
    font-size: 2rem;
	border: 1px solid ${COLORS.PRIMARY_1};
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }  
  }
  .credit-score--button.active{
		border: 2px solid ${COLORS.SECONDARY_1}
	}
  .calculate-button {
    width: 100%;
    color: ${COLORS.SECONDARY_2};
    background-color: ${COLORS.PRIMARY_1};
    border: none;
    padding: 1rem 2rem;
    font-size: 2rem;
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }
  }
  
  .btn-bar {
  margin: 0 0 30px 0;
}

.btn-bar__label {
  margin: 0 0 10px 0;
}

.btn-bar__list {
  display: flex;
}

.btn-bar__button {
  width: 14%;
  flex-grow: 1;
  padding: 10px 0;

  font-size: 20px;
  color: gray;

  border: 1px solid gray;
  background-color: #ffffff;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 0;
  }

  &--active {
    color: #ffffff;

    background-color: #007DE1;
  }
}
`;
