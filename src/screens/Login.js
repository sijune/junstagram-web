import styled from "styled-components";
import { isDarkModeVar } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;

function Login() {
  return (
    <Container>
      <Title> Login </Title>
      <button onClick={() => isDarkModeVar(true)}>To Dark</button>
      <button onClick={() => isDarkModeVar(false)}>To Light</button>
    </Container>
  );
}

export default Login;
