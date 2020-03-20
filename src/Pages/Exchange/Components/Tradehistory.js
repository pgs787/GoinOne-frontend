import React, { useState, useCallback, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { KwangHoon } from "config";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";

const Tradehistory = ({ coinstatus }) => {
  const [select, setSelect] = useState(1);
  const [allcoin, setAllcoin] = useState(false);
  const [coinInfo, setCoinInfo] = useState("");
  const [allcoinInfo, setAllcoinInfo] = useState([]);
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
    <Wrapper>
      <Header>
        <Category1
          one
          status={select}
          onClick={() => {
            setSelect(1);
          }}
        >
          미체결 주문
        </Category1>
        <Category2
          two
          status={select}
          onClick={() => {
            setSelect(2);
          }}
        >
          체결내역
        </Category2>
      </Header>
      <Main>
        <CoinCheck
          select={select}
          onClick={() => {
            select === 1 && setAllcoin(!allcoin);
          }}
        >
          {select !== 1 ? "더보기 >" : "모든 코인"}
          {select === 1 && (
            <SildeCircle status={allcoin}>
              <Circle status={allcoin}></Circle>
            </SildeCircle>
          )}
        </CoinCheck>
        <Bottom>
          <FontAwesomeIcon
            icon={faFileExcel}
            color="#eee"
            style={{ width: "100px", height: "100px", display: "block" }}
          />
          <Text>{allcoin ? "" : coinInfo.code} 미체결 주문 없음</Text>
        </Bottom>
      </Main>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return {
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStateToProps, {})(Tradehistory);

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  background-color: transparent;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;
const category = css`
  display: flex;
  width: 50%;
  border: 1px solid #eee;
  border-bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 14px;
  justify-content: center;
  padding: 7px 0;
  cursor: pointer;
`;
const Category1 = styled.div`
  ${category};
  color: ${props => (props.status === 1 ? "#424242" : "#9e9e9e")};
  background-color: ${props => (props.status !== 1 ? "#eee" : "#fff")};
`;
const Category2 = styled.div`
  ${category};
  color: ${props => (props.status === 2 ? "#424242" : "#9e9e9e")};
  background-color: ${props => (props.status !== 2 ? "#eee" : "#fff")};
`;
const Main = styled.div`
  height: 360px;
  border: 1px solid #eee;
  border-top-width: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px 10px;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;

const CoinCheck = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #9e9e9e;
  font-size: 12px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  padding-right: ${props => props.select === 2 && "20px"};
  cursor: pointer;
`;

const SildeCircle = styled.div`
  display: flex;
  align-items: center;
  width: 33px;
  height: 18px;
  margin-left: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  background-color: ${props => (props.status ? "#1772F8" : "#eee")};
  cursor: pointer;
  transition: all 0.5s ease;
`;
const Circle = styled.div`
  width: 16px;
  height: 14px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 10px;
  transform: ${props => (props.status ? "translateX(14px)" : "")};
  transition: transform 0.5s ease;
`;

const Text = styled.div`
  display: block;
  margin-top: 60px;
  color: #9e9e9e;
  font-size: 14px;
  font-weight: bold;
`;
const Bottom = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
