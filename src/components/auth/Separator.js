import styled from "styled-components";

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  div {
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-weight: 600;
    font-size: 12px;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div> </div> <span> Or </span> <div> </div>
    </SSeparator>
  );
}

export default Separator;
