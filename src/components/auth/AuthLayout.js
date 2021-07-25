import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../../apollo";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

const Footer = styled.div`
  margin-top: 10px;
`;

function AuthLayout({ children }) {
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Wrapper> {children} </Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
