import { css } from "@emotion/core";
import { COLORS } from "../../../constants";

export default css`
.select-form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 30px 0;

  label {
    margin: 0;
  }

  .select-form-field__label {
    margin: 0 0 5px 0;
  }
  .select-form-field__select {
    padding: 5px;

    font-size: 15px;
  }
}
`;