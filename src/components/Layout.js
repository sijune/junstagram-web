import styled from "styled-components";
import Header from "./Header";

const Content = styled.div`
  max-width: 930px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
