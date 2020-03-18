import React, { useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";

const getData = () => {
  return fetch("http://localhost:3000/mockdata/amount.json").then(res =>
    res.json()
  );
};

const Amount = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getData().then(res => {
      setList(res.time);
    });
  }, []);

  const mapOfItem = item => {
    const graphlen = [];
    for (let i = 0; i < list.length; i++) {
      graphlen.push(list[i].price);
    }
    const result = Math.max.apply(null, graphlen);
    return item.map((ele, idx) => (
      <Main key={idx}>
        <Graph>
          <Action max={result} rate={(parseInt(ele.price) / result) * 100} />
        </Graph>
        <Col1>{ele.time}</Col1>
        <Col2 status={ele.price}>{ele.price}</Col2>
        <Col3>{ele.amount}</Col3>
      </Main>
    ));
  };

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
      <ListWrapper>{list && mapOfItem(list)}</ListWrapper>
    </Wrapper>
  );
};

export default Amount;

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
`;
const Action = styled.div`
  width: ${props => props.rate && `${props.rate}%`};
  background-color: #e7eff8;
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
  color: #1763b6;
  flex: 0 0 auto;
  width: 102px;
  font-weight: 700;
  background-color: #f7fbff;
`;

const Col2 = styled.div`
  ${col};
  z-index: 1;
  color: red;
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
