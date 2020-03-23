import React, { useEffect, useState, useCallback } from "react";
import { KwangHoon } from "config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changesell, changebuy } from "Redux/Actions";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";

const Amount = props => {
  const {
    coinstatus,
    changesell,
    changebuy,
    sellData,
    buyData,
    sellToggle,
    buyToggle
  } = props;
  const getCoinInfo = useCallback(() => {
    fetch(`${KwangHoon}/exchange/${coinstatus + 1}`)
      .then(res => res.json())
      .then(res => {
        changesell(res.offer_sell_data);
        changebuy(res.offer_buy_data);
      });
  }, [coinstatus, changesell, changebuy]);
  useEffect(() => {
    getCoinInfo();
  }, [getCoinInfo]);

  const mapOfItem = (item, num) => {
    const graphlen = [];

    if (num === 1) {
      for (let k = 0; k < sellData.length; k++) {
        graphlen.push(parseFloat(item[k].amount));
      }
    } else {
      for (let i = 0; i < buyData.length; i++) {
        graphlen.push(parseFloat(item[i].amount));
      }
    }
    const result = Math.max.apply(null, graphlen);

    return item.map(
      (ele, idx) =>
        ele.amount !== 0 && (
          <Main key={idx}>
            <Graph>
              <Action
                num={num}
                max={result}
                rate={(ele.amount / result) * 100}
              />
            </Graph>
            <Col1 num={num}>{Math.floor(ele.price).toLocaleString()}</Col1>
            <Col2 num={num} status={parseFloat(ele.price)}>
              {parseFloat(ele.amount).toFixed(4)}
            </Col2>
            <Col3 num={num}>{}</Col3>
          </Main>
        )
    );
  };

  console.log(sellToggle);
  return (
    <Wrapper>
      <Header>
        <Name one>
          <Content>
            <Icon>
              <FontAwesomeIcon
                style={{ width: "12px" }}
                icon={faMinusSquare}
                color="black"
                size="lg"
              />
            </Icon>
            <Number>1,000</Number>
            <Icon>
              <FontAwesomeIcon
                style={{ width: "12px" }}
                icon={faPlusSquare}
                size="lg"
              />
            </Icon>
          </Content>
        </Name>
        <Name two>
          <Content>수량</Content>
        </Name>
        <Name three>
          <Content>
            누적수량&nbsp;
            <FontAwesomeIcon
              style={{ width: "12px" }}
              icon={faCaretDown}
              size="lg"
            />
          </Content>
        </Name>
      </Header>
      <ListWrapper>
        {sellData && mapOfItem(sellData, 1)}
        {buyData && mapOfItem(buyData, 2)}
      </ListWrapper>
    </Wrapper>
  );
};
const mapStatetoProps = state => {
  return {
    coinstatus: state.coinSelect.coin,
    sellData: state.setData.sellData,
    buyData: state.setData.buyData,
    sellToggle: state.setData.sellToggle,
    buyToggle: state.setData.buyToggle
  };
};
export default withRouter(
  connect(mapStatetoProps, { changesell, changebuy })(Amount)
);

const Wrapper = styled.div`
  height: 41px;
`;

const Header = styled.div`
  margin: 0 10px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 14px;
  color: #9e9e9e;
  border-bottom: 1px solid #e0e0e0;
`;
const Name = styled.div`
  justify-content: center;
  cursor: ${props => props.three && "pointer"};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3px;
  text-align: end;
`;
const Icon = styled.span`
  cursor: pointer;
`;
const Number = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 14px;
  padding: 0 4px;
  color: #424242;
  font-size: 14px;
`;
const Main = styled.div`
  position: relative;
  height: 38px;
  border-bottom: 2px solid #fff;
  margin: 0 10px;
  display: flex;
  overflow: auto;
`;
const ListWrapper = styled.div`
  height: 720px;
  overflow: auto;
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c9ccd2;
    border-radius: 10px;
  }
`;
const Graph = styled.div`
  padding-left: 100px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 21px;
  cursor: pointer;
`;
const Action = styled.div`
  width: ${props => props.rate && `${props.rate}%`};
  background-color: ${props => (props.num === 1 ? "#e7eff8" : "#FCE9EC")};
  height: 100%;
`;
const col = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
`;
const Col1 = styled.div`
  ${col};
  color: ${props => (props.num === 1 ? "#1763b6" : "#E64460")};
  flex: 0 0 auto;
  width: 102px;
  font-weight: 700;
  background-color: ${props => (props.num === 1 ? "#f7fbff" : "#FFF7F9")};
  cursor: pointer;
`;

const Col2 = styled.div`
  ${col};
  z-index: 1;
  color: ${props => (props.num === 1 ? "#1763b6" : "#E64460")};
  flex: 0 0 auto;
  justify-content: flex-end;
  width: 80px;
  font-weight: none;
`;

const Col3 = styled.div`
  ${col};
  color: gray;
  flex: 1 0 auto;
  justify-content: flex-end;
  z-index: 100;
`;
