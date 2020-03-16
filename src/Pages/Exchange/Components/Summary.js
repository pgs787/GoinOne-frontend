import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Summary = () => {
  const [coin, setCoin] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/mockdata/coin.json")
  //     .then(res => res.json())
  //     .then(res => setCoin(res.coin));
  // }, []);
  return (
    <SummarWrpper>
      <Coinname>
        <En>BTC</En>
        <Kr>비트코인</Kr>
        <Marketname>Main 마켓</Marketname>
      </Coinname>
      <Price>
        <Upper>7,137,000</Upper>
        <Percent>+12.23%</Percent>
        <Arrow>
          (
          <FontAwesomeIcon icon={faCaretUp} color="red" size="lg" />
          &nbsp; 777,000)
        </Arrow>
      </Price>
      <Detailinfo>
        <FontAwesomeIcon
          icon={faStar}
          color="#ffbb00"
          style={{ marginRight: "13px", cursor: "pointer" }}
        />
        <Bar /> 고가&nbsp;
        <Highprice>7,390,000</Highprice>
        저가&nbsp;
        <Lowprice>5,493,000</Lowprice>
        전일가&nbsp;
        <Yesterday>6,359,000</Yesterday>
        거래량&nbsp;
        <Tradeamount>23,628</Tradeamount>BTC&nbsp;&nbsp; 거래대금&nbsp;
        <Total>170,205,943,223</Total>
        KRW
      </Detailinfo>
    </SummarWrpper>
  );
};
export default Summary;

const SummarWrpper = styled.div`
  font-size: 15px;
`;
const Coinname = styled.div``;

const En = styled.span`
  font-weight: 700;
  margin-right: 5px;
`;
const Kr = styled.span`
  margin-right: 5px;
`;
const Marketname = styled.span`
  color: #c6c6c6;
  ::before {
    content: "|";
    margin-right: 7px;
  }
`;

const Price = styled.div`
  margin-top: 8px;
  color: #e12343;
`;
const Upper = styled.span`
  font-size: 26px;
  font-weight: bold;
  margin-right: 5px;
  vertical-align: top;
`;
const Percent = styled.span`
  font-size: 15px;
  vertical-align: top;
  margin-right: 5px;
`;
const Arrow = styled.span`
  font-size: 15px;
  vertical-align: top;
  margin-right: 5px;
`;
const Icon = styled.div`
  display: block;
  width: 500px;
  height: 500px;
  background: url("../../Img/stx-sprite-ui.svg") no-repeat;
  background-position: 700px 150px;
  background-size: cover;
`;

const Detailinfo = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 10px;
`;
const Bar = styled.span`
  ::after {
    content: "|";
    margin-right: 4px;
    color: #e0e0e0;
  }
`;
const Highprice = styled.span`
  color: #e12343;
  margin-right: 8px;
`;
const Lowprice = styled.span`
  color: #1763b6;
  margin-right: 8px;
`;
const Yesterday = styled.span`
  color: black;
  margin-right: 8px;
`;
const Tradeamount = styled.span`
  color: black;
  margin-right: 2px;
`;
const Total = styled.span`
  color: black;
  margin-right: 2px;
`;
