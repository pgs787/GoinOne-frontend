import React, { useState, useEffect, useCallback } from "react";
import { KwangHoon } from "config";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Summary = ({ coinstatus }) => {
  const [coinInfo, setCoinInfo] = useState([]);

  const getCoinInfo = useCallback(() => {
    fetch(`${KwangHoon}/exchange/1`)
      .then(res => res.json())
      .then(res =>
        setCoinInfo(res.item_data[coinstatus === null ? 0 : coinstatus])
      );
  }, [coinstatus]);

  useEffect(() => {
    getCoinInfo();
  }, [getCoinInfo]);

  return (
    <SummarWrpper>
      <Coinname>
        <En>{coinInfo.code}</En>
        <Kr>{coinInfo.name}</Kr>
        <Marketname>Main 마켓</Marketname>
      </Coinname>
      <Price>
        <Upper
          select={
            String(
              Math.ceil(Number(coinInfo.now_price)) -
                Math.ceil(Number(coinInfo.yesterday_max_price))
            ).includes("-")
              ? 1
              : 0
          }
        >
          {parseInt(coinInfo.now_price).toLocaleString()}
        </Upper>
        <Percent
          select={
            String(
              Math.ceil(Number(coinInfo.now_price)) -
                Math.ceil(Number(coinInfo.yesterday_max_price))
            ).includes("-")
              ? 1
              : 0
          }
        >
          {String(
            Number(
              (coinInfo.now_price / coinInfo.yesterday_max_price - 1) * 100
            ).toFixed(2)
          )}
          %
        </Percent>
        <Arrow
          select={
            String(
              Math.ceil(Number(coinInfo.now_price)) -
                Math.ceil(Number(coinInfo.yesterday_max_price))
            ).includes("-")
              ? 1
              : 0
          }
        >
          (
          <FontAwesomeIcon
            icon={
              String(
                Math.ceil(Number(coinInfo.now_price)) -
                  Math.ceil(Number(coinInfo.yesterday_max_price))
              ).includes("-")
                ? faCaretDown
                : faCaretUp
            }
            size="lg"
          />
          &nbsp;
          {Number(
            Math.ceil(Number(coinInfo.now_price)) -
              Math.ceil(Number(coinInfo.yesterday_max_price))
          ).toLocaleString()}
          )
        </Arrow>
      </Price>
      <Detailinfo>
        <FontAwesomeIcon
          icon={faStar}
          color="#ffbb00"
          style={{ marginRight: "13px", cursor: "pointer" }}
        />
        <Bar /> 고가&nbsp;
        <Highprice>
          {Math.floor(Number(coinInfo.today_max_price)).toLocaleString()}
        </Highprice>
        저가&nbsp;
        <Lowprice>
          {Math.floor(Number(coinInfo.today_min_price)).toLocaleString()}
        </Lowprice>
        전일가&nbsp;
        <Yesterday>
          {Math.floor(Number(coinInfo.yesterday_max_price)).toLocaleString()}
        </Yesterday>
        거래량&nbsp;
        <Tradeamount>
          {Math.floor(Number(coinInfo["24_trade_volume"])).toLocaleString()}
        </Tradeamount>
        BTC&nbsp;&nbsp; 거래대금&nbsp;
        <Total>{parseInt(coinInfo["24_trade_volume"]).toLocaleString()}</Total>
        KRW
      </Detailinfo>
    </SummarWrpper>
  );
};
const mapStatetoProps = state => {
  return {
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStatetoProps, {})(Summary);

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
  color: ${props => (props.select === 1 ? "#1763b6" : "#e12343")};
`;
const Percent = styled.span`
  font-size: 15px;
  vertical-align: top;
  margin-right: 5px;
  color: ${props => (props.select === 1 ? "#1763b6" : "#e12343")};
`;
const Arrow = styled.span`
  font-size: 15px;
  vertical-align: top;
  margin-right: 5px;
  color: ${props => (props.select === 1 ? "#1763b6" : "#e12343")};
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
