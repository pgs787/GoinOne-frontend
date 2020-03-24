import React from "react";

import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import styled from "styled-components";

const MainLayout = props => {
  return (
    <Wrapper>
      <Header exchange={props.exchange} />
      <Body>
        <Main>
          <Content>{props.children}</Content>
        </Main>
      </Body>
      <Footer exchange={true} />
    </Wrapper>
  );
};
export default MainLayout;

const Wrapper = styled.div`
  background-color: white;
`;
const Body = styled.div`
  margin-top: 68px;
`;
const Main = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
`;

const Content = styled.div`
  width: 1440px;
  background-color: transparent;
  padding: 0px 20px 20px;
  margin: 0 auto;
  overflow: hidden;
`;
