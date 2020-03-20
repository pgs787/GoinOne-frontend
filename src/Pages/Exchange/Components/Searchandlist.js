import React, { useState, useEffect, useCallback } from "react";
import { KwangHoon } from "config";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeCoin } from "Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faArrowDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const Searchandlist = ({ status, changeCoin, coinstatus }) => {
  const [search, Setsearch] = useState("");
  const [coin, setCoin] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const getCoin = () => {
    fetch(`${KwangHoon}/exchange/1`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => setCoin(res.item_data));
  };
  useEffect(() => {
    getCoin();
  }, []);
  const getCoinInfo = useCallback(() => {
    fetch(`${KwangHoon}/exchange/${coinstatus}`)
      .then(res => res.json())
      .then(res => {
        setCoinInfo(res.item_data[coinstatus === null ? 1 : coinstatus]);
      });
  }, [coinstatus]);

  useEffect(() => {
    getCoinInfo();
  }, [getCoinInfo]);

  const mapOfCoin = item => {
    return item.map(
      (ele, idx) =>
        ele.name.includes(search) && (
          <Coin
            key={idx}
            status={coinstatus}
            idx={idx}
            onClick={() => {
              changeCoin(idx);
            }}
          >
            <Coinname>
              <NameTop>{ele.code}</NameTop>
              <NameBottom>{ele.name}</NameBottom>
            </Coinname>
            <CoinPrice
              select={
                String(
                  Math.ceil(Number(ele.now_price)) -
                    Math.ceil(Number(ele.yesterday_max_price))
                ).includes("-")
                  ? 1
                  : 0
              }
            >
              {parseInt(ele.now_price).toLocaleString()}
            </CoinPrice>
            <Variance
              select={
                String(
                  Math.ceil(Number(ele.now_price)) -
                    Math.ceil(Number(ele.yesterday_max_price))
                ).includes("-")
                  ? 1
                  : 0
              }
            >
              {String(
                Number(
                  (ele.now_price / ele.yesterday_max_price - 1) * 100
                ).toFixed(2)
              )}
              %
            </Variance>
            <TradeAmount>
              {Number(
                String(Math.ceil(Number(ele["24_trade_volume"]))).slice(0, 4)
              ).toLocaleString()}
              백만
            </TradeAmount>
          </Coin>
        )
    );
  };

  return (
    <Wrapper>
      <Header>
        <FontAwesomeIcon
          icon={faStar}
          color="#ffbb00"
          style={{ cursor: "pointer" }}
        />
        <Search>
          <SearchInner>
            <Input
              type="text"
              placeholder="코인 검색"
              onChange={e => {
                Setsearch(e.target.value);
              }}
              value={search}
            ></Input>
            <FontAwesomeIcon
              icon={search ? faTimes : faSearch}
              color="gray"
              onClick={() => {
                search && Setsearch("");
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px"
              }}
            />
          </SearchInner>
        </Search>
      </Header>
      <Marketbox>
        <NameBox>
          <Name>Main 마켓</Name>
          <Name two>Growth 마켓</Name>
        </NameBox>
        <Price>
          <Text top>24시간 거래대금</Text>
          <Text>72.827백만</Text>
        </Price>
      </Marketbox>
      <Categorylist>
        <List one>코인명</List>
        <List two>가격</List>
        <List three>등락률</List>
        <List four>
          거래대금 &nbsp;
          <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faArrowDown} />
        </List>
      </Categorylist>
      <CoinList status={status}>{coin && mapOfCoin(coin)}</CoinList>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return {
    status: state.ChatOption.status,
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStateToProps, { changeCoin })(Searchandlist);
const Wrapper = styled.div`
  padding: 20px 8px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
`;

const Search = styled.div`
  flex: 1 1 auto;
  position: relative;
  padding-left: 10px;
`;
const SearchInner = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #fafafa;
  position: relative;
  :focus {
    border: 1px solid #1772f8;
    border-radius: 5px;
  }
`;

const Input = styled.input`
  width: 90%;
  height: 100%;
  vertical-align: top;
  color: #424242;
  outline: 0;
  padding-right: 24px;
  padding: 8px 10px;
  font-size: 12px;
  border: none;
  background-color: transparent;

  ::placeholder {
    color: gray;
  }
`;

const Marketbox = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  margin: 0 10px;
  padding: 0 10px;
  border-bottom: 1px solid #e0e0e0;
`;
const NameBox = styled.div`
  flex: 1 1 auto;
  width: 100%;
  min-width: 207px;
  display: flex;
  justify-content: flex-start;
`;
const Name = styled.div`
  user-select: none;
  touch-action: manipulation;
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 9px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  color: #9e9e9e;
  font-size: 12px;
  margin-left: ${props => props.two && "12px"};
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #9e9e9e;
  width: 100px;
`;
const Text = styled.span`
  font-weight: ${props => (props.top ? "" : "bold")};
  font-size: ${props => (props.top ? "11px" : "9px")};
`;

const Categorylist = styled.div`
  display: flex;
  position: relative;
  flex: 0 0 auto;
  height: 46px;
  margin: 0 10px;
  padding: 0 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const List = styled.div`
  font-size: 14px;
  ${props => {
    if (props.one) {
      return css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 300px;
        color: #9e9e9e;
      `;
    } else if (props.two) {
      return css`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 280px;
        color: #9e9e9e;
      `;
    } else if (props.three) {
      return css`
        user-select: none;
        touch-action: manipulation;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 250px;
        color: #9e9e9e;
      `;
    } else if (props.four) {
      return css`
        color: #424242;
        user-select: none;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
      `;
    }
  }}
`;
const CoinList = styled.div`
  height: ${props => (props.status ? "780px" : "610px")};
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

const Coin = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 56px;
  padding: 0 18px;
  font-size: 14px;
  cursor: pointer;
  border: ${props => props.status === props.idx && "1px solid #1873F8"};
  &:hover {
    background-color: #fafafa;
  }
  margin-top: 10px;
`;

const Coinname = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 120px;
`;
const CoinPrice = styled.div`
  flex: 1 0 auto;
  justify-content: flex-end;
  width: 87px;
  padding-right: 15px;
  text-align: right;
  align-items: center;
  position: relative;
  color: ${props => (props.select === 1 ? "#1763B6" : "#EA657C")};
`;

const Variance = styled.div`
  flex: 1 0 auto;
  justify-content: flex-end;
  width: 68px;
  padding-right: 6px;
  color: ${props => (props.select === 1 ? "#1763B6" : "#EA657C")};
`;
const TradeAmount = styled.div`
  flex: 1 1 auto;
  justify-content: flex-end;
  width: 81px;
  padding-left: 2px;
`;

const NameTop = styled.div`
  color: #424242;
  font-size: 14px;
  font-weight: 700;
`;
const NameBottom = styled.div`
  font-size: 12px;
  padding-top: 4px;
  color: #9e9e9e;
`;
