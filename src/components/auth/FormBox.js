import styled from "styled-components";
import { BaseBox } from "../shared";

const FormBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

export default FormBox;
