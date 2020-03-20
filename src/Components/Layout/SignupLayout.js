import React from "react";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import styled from "styled-components";

const SignupLayout = props => (
  <>
    <Header />
    <Body>
      <Main>
        <Signupbox>{props.children}</Signupbox>
      </Main>
    </Body>
    <Footer />
  </>
);

export default SignupLayout;

const Body = styled.div`
  margin-top: 68px;
`;
const Main = styled.div`
  padding: 80px 0;
`;

const Signupbox = styled.div`
  // margin: 0 auto;
  max-width: 480px;
`;
