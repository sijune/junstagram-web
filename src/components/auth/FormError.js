import styled from "styled-components";

const SFormError = styled.span`
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
  color: tomato;
`;

function FormError({ message }) {
  return (message === "") | !message ? null : (
    <SFormError> {message} </SFormError>
  );
}

export default FormError;
