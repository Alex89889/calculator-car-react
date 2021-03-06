import { css } from "@emotion/core";
import { COLORS } from "../../../constants";

export default css`
.input {
  width: 35%;
  margin: 0 0 30px 0;
  
  &--row {
    width: 100%;
    label {
      margin: 0;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    margin: 0 0 10px 0;

    &--row {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    width: 152px;

    border: 1px solid gray;
    border-radius: 3px;
  }

  &__mask {
    display: none;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 10px;
    order: 1;

    &--left {
      display: flex;

      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
    }

    &--right {
      display: flex;
      order: 3;
      margin: 0 10px 0 0;

      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
    }
  }

  &__input {
    padding: 5px;
    order: 2;
    width: 100%;

    font-size: 15px;

    border: 0;
    border-radius: 3px;

    &--right {
      text-align: right;
    }
  }

  &__label {
    margin: 0 0 5px 0;
  }

  &__error {
    padding: 7px;

    color: #721c24;

    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
  }
}

}
`;