import React from "react";
import styled, { css } from "styled-components";

import ExchangeLayout from "Components/Layout/ExchangeLayout";
import Summary from "./Components/Summary";
import Time from "./Components/Dealtime";
import Amount from "./Components/Amount";
import Order from "./Components/Order";
import Buyandsell from "./Components/Buyandsell";
import Tradehistory from "./Components/Tradehistory";
import Chat from "./Components/Chat";
import Searchandlist from "./Components/Searchandlist";
import Aseetlist from "./Components/Myasset";

const Index = () => {
  return (
    <ExchangeLayout exchange={true}>
      <Inner>
        <Leftbox>
          <SummaryWrapper>
            <Summary />
          </SummaryWrapper>
          <Graph></Graph>
          <Boxgroup>
            <Dealtime>
              <Time />
            </Dealtime>
            <Amountbox>
              <AmountWrapper>
                <Amount />
              </AmountWrapper>
              <OrderWrapper>
                <Order />
              </OrderWrapper>
            </Amountbox>
            <Tradebox>
              <Buyandsell />
              <Tradehistory />
            </Tradebox>
          </Boxgroup>
        </Leftbox>
        <Rightbox>
          <Searchcoin>
            <Searchandlist />
          </Searchcoin>
          <Myasset>
            <Aseetlist></Aseetlist>
          </Myasset>
          <ChatWrapper>
            <Chat />
          </ChatWrapper>
        </Rightbox>
      </Inner>
    </ExchangeLayout>
  );
};

export default Index;

const box = css`
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
  background-color: white;
`;

const Inner = styled.div`
  display: flex;
`;
/* 왼쪽 박스 */
const Leftbox = styled.div`
  width: 950px;
  margin-right: 30px;
`;
const SummaryWrapper = styled.div`
  ${box}
  position: relative;
  margin-bottom: 20px;
  height: 130px;
  padding: 19px;
`;
const Graph = styled.div`
  ${box}
  height: 430px;
  margin-bottom: 20px;
`;
const Boxgroup = styled.div`
  display: flex;
  justify-content: space-between;
  height: 830px;
`;
const Dealtime = styled.div`
  ${box}
  width:300px;
  height: 100%;
`;
const Amountbox = styled.div`
  width: 330px;
`;
const AmountWrapper = styled.div`
  ${box}
  height: 92%;
`;
const OrderWrapper = styled.div`
  ${box}
  height: 8%;
`;

const Tradebox = styled.div`
  width: 280px;
`;
/*  오른쪽 박스 */
const Rightbox = styled.div`
  width: 390px;
`;
const Searchcoin = styled.div`
  ${box}
  height: 780px;
  margin-bottom: 34px;
`;
const Myasset = styled.div`
  ${box}
  height: 330px;
  margin-bottom: 20px;
`;
const ChatWrapper = styled.div`
  ${box}
  height: 260px;
`;
