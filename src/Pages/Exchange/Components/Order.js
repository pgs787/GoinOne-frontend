import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";

const Order = () => {
  return (
    <Wrapper>
      <Header>
        <Name one>
          <Content>매도 잔량</Content>
          <Content one>11.5779</Content>
        </Name>
        |
        <Name two>
          <Content>매수 잔량</Content>
          <Content two>11.5779</Content>
        </Name>
      </Header>
      <Main>
        <OrderClick>
          <FontAwesomeIcon
            style={{ marginRight: "7px" }}
            icon={faFile}
            color="gray"
          />
          클릭주문
        </OrderClick>
        <Accumulate>
          <Item>개벌</Item>
          <Item>누적</Item>
        </Accumulate>
      </Main>
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  height: 30px;
  color: #bdbdbd;
  font-size: 10px;
`;
const Name = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-right: ${props => props.one && "8px"};
  padding-left: ${props => props.two && "8px"};
`;
const Content = styled.div``;
const Main = styled.div`
  margin: 0 10px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
  height: 37px;
`;
const OrderClick = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
  height: 28px;
  padding: 0 10px 0 7px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  color: #424242;
  font-size: 12px;
  color: inherit;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;
`;

const Accumulate = styled.span`
  display: flex;
  position: absolute;
  right: 0px;
`;

const Item = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.16),
    0 1px 1px 0 rgba(60, 64, 67, 0.08);
  color: #424242;
  padding: 3px 6px;
  cursor: pointer;
`;
