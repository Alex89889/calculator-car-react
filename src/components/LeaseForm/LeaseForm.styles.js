import { css } from "@emotion/core";
import { COLORS } from "../../constants";

export default css`

  & > div {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0;
    label{
      width: 30%;
    }
    .formField {
      position: relative;
      flex-wrap: wrap;
      display: flex;
      width: 70%;
      input {
        width: 80%;
      }
      span {
        font-size: 1.5rem;
        color: red;
        margin-top: 0.5rem;
      }
    }
    @media only screen and (max-width: 450px) {
      flex-direction: column;
      .formField, label{ 
        width: 100%;
      }
    }
  }
  & > div:first-of-type{
    margin-top: 0;
  }
  .error {
    border: 0.3rem solid red;
  }
  input {
    font-size: 1.8rem;
    border: 0.3rem solid ${COLORS.PRIMARY_1};
    padding: 1rem;
  }
 
  .term-month--select{
	width: 100%;
    color: black;
    background-color: white;
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
    color: black;
    background-color: white;
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
    color: white;
    background-color: ${COLORS.PRIMARY_1};
    border: none;
    padding: 1rem 2rem;
    font-size: 2rem;
    &:hover {
      background-color: ${COLORS.SECONDARY_1};
      cursor: pointer;
    }
  }

  button:focus,
  input:focus {
    outline: ${COLORS.SECONDARY_2} solid 0.3rem;
    outline-offset: -0.3rem;
  }
`;
