import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

const Buyandsell = () => {
  const [select, setSelect] = useState(1);
  const [price, setPrice] = useState("");
  const [focus, setFocus] = useState(false);

  console.log(price);
  return (
    <Wrapper>
      <Header>
        <Category1
          status={select}
          onClick={() => {
            setSelect(1);
          }}
        >
          매수
        </Category1>
        <Category2
          status={select}
          onClick={() => {
            setSelect(2);
          }}
        >
          매도
        </Category2>
      </Header>
      <Main>
        <Possetion>
          <Left>보유</Left>
          <Right>
            0.0000 <Currency>BTC</Currency>
          </Right>
        </Possetion>
        <Possible>
          <Left>매도 가능</Left>
          <Right>
            0.0000 <Currency>BTC</Currency>
          </Right>
        </Possible>
        <PriceTotal>
          <PriceWrapper htmlfor="price" />
          <Price>가격(KRW)</Price>
          <PriceBtn
            type="text"
            onFocus={() => {
              console.log(focus);
              setFocus(true);
            }}
            value={parseInt(price).toLocaleString()}
            onBlur={() => {
              console.log(focus);
              setFocus(false);
            }}
            onChange={e => {
              let s = "1231231231233";
              console.log(parseInt(s).toLocaleString());
              setPrice(e.target.value);
            }}
          />
          <BtnWrapper>
            <PriceBtnLeft>
              <FontAwesomeIcon style={{ width: "10px" }} icon={faPlus} />
            </PriceBtnLeft>
            <PriceBtnRight>
              <FontAwesomeIcon style={{ width: "10px" }} icon={faMinus} />
            </PriceBtnRight>
          </BtnWrapper>
        </PriceTotal>
        <AmBtnTotal>
          <AmBtnWrapper htmlfor="amount" />
          <Amount>수량(BTC)</Amount>
          <AmountBtn type="amount" name="price" />
          <BtnWrapper>
            <UpdownBtn one>
              <FontAwesomeIcon style={{ width: "10px" }} icon={faPlus} />
            </UpdownBtn>
            <UpdownBtn>
              <FontAwesomeIcon style={{ width: "10px" }} icon={faMinus} />
            </UpdownBtn>
          </BtnWrapper>
        </AmBtnTotal>
        <Percent>
          <PercentName one>10%</PercentName>
          <PercentName>25%</PercentName>
          <PercentName>50%</PercentName>
          <PercentName>100%</PercentName>
        </Percent>
        <OrderPrice>
          <Left>주문 금액</Left>
          <Right>
            - <Currency>KRW</Currency>
          </Right>
        </OrderPrice>
        <OrderAmount>
          <Left>매도 금액</Left>
          <Right>
            - <Currency>KRW</Currency>
          </Right>
        </OrderAmount>
        <OrderBtn status={select}>{select === 1 ? "매수" : "매도"}</OrderBtn>
        <Bottom>
          <BottomLeft>단축키</BottomLeft>
          <BottomRight>
            수수료 - KRW &nbsp;
            <FontAwesomeIcon style={{ width: "10px" }} icon={faInfoCircle} />
          </BottomRight>
        </Bottom>
      </Main>
    </Wrapper>
  );
};

export default Buyandsell;
const Wrapper = styled.div``;
const Header = styled.div`
  flex: 0 0 40px;
  display: flex;
`;
const category = css`
  flex: auto;
  display: flex;
  color: #fff;
  border: 1px solid #eee;
  border-bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 16px;
  justify-content: center;
  padding: 7px 0;
  cursor: pointer;
`;
const Category1 = styled.div`
  ${category};
  background-color: ${props => (props.status === 1 ? "#E12343" : "#EEEEEE")};
  color: ${props => (props.status === 1 ? "white" : "#9e9e9e")};
  &:hover {
    background-color: ${props => props.status !== 1 && "#E4E4E4"};
  }
`;
const Category2 = styled.div`
  ${category};
  background-color: ${props => (props.status === 2 ? "#1763B6" : "#EEEEEE")};
  color: ${props => (props.status === 2 ? "white" : "#9e9e9e")};
  &:hover {
    background-color: ${props => props.status !== 2 && "#E4E4E4"};
  }
`;

const Main = styled.div`
  height: 370px;
  border: 1px solid #eee;
  border-top-width: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 16px 20px 0;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;
const Left = styled.div``;
const Right = styled.div``;

const Currency = styled.span`
  padding-left: 4px;
  color: #9e9e9e;
  text-transform: uppercase;
`;

const leftandright = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  line-height: 1;
  color: #424242;
  font-size: 14px;
`;
const Possetion = styled.div`
  ${leftandright}
  margin-bottom:8px;
`;

const Possible = styled.div`
  ${leftandright}
  margin-bottom:12px;
`;
const priceandamount = css`
  color: #9e9e9e;
  font-size: 12px;
  cursor: pointer;
`;

const PriceTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  height: 54px;
  padding: 20px 8px 6px;
  border-radius: 3px;
  background-color: #fafafa;
`;
const PriceWrapper = styled.label`
  position: absolute;
  top: 0;
  right: 63px;
  bottom: 0;
  left: 0;
  flex: none;
  padding: 4px 0 0 8px;
  color: #9e9e9e;
  font-size: 12px;
  cursor: pointer;
`;
const Price = styled.span`
  ${priceandamount}
  width:100%;
  padding: 0;
  top: 5px;
  position: absolute;
  left: 5px;
`;
const Amount = styled.div`
  ${priceandamount}
  width:100%;
  padding: 0;
  top: 5px;
  position: absolute;
  left: 5px;
`;
const PriceBtn = styled.input`
  flex: auto;
  width: 100%;
  position: inherit;
  overflow: hidden;
  text-align: right;
  color: #424242;
  font-size: 19px;
  font-weight: 700;
  outline: 0;
  caret-color: #1772f8;
  padding: 0;
  border: 0;
  border-radius: 0;
  background-color: transparent;
`;
const BtnWrapper = styled.div`
  flex: 0 0 auto;
  overflow: hidden;
  display: flex;
  width: 55px;
  height: 28px;
  margin-top: 5px;
  margin-left: 6px;
  border: 1px solid #e0e0e0;
  background-color: white;
`;
const pricebtn = css`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const PriceBtnLeft = styled.div`
  ${pricebtn}
`;
const PriceBtnRight = styled.div`
  ${pricebtn}
  border-left: 1px solid #e0e0e0;
`;
const AmBtnTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  height: 58px;
  padding: 20px 8px 6px;
  border-radius: 3px;
  background-color: #fafafa;
  margin-top: 12px;
`;
const AmBtnWrapper = styled.label`
  position: absolute;
  top: 0;
  right: 63px;
  bottom: 0;
  left: 0;
  flex: none;
  padding: 4px 0 0 8px;
  color: #9e9e9e;
  font-size: 12px;
  cursor: pointer;
`;

const AmountBtn = styled.input`
  flex: auto;
  width: 100%;
  position: inherit;
  overflow: hidden;
  text-align: right;
  color: #424242;
  font-size: 19px;
  font-weight: 700;
  outline: 0;
  caret-color: #1772f8;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
`;

const UpdownBtn = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: ${props => props.one && "1px solid #e0e0e0"};
  background-color: white;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const Percent = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;

  margin-bottom: 15px;
`;
const PercentName = styled.div`
  &:hover {
    background-color: #e0e0e0;
  }
  text-align: center;
  width: 100px;
  color: #424242;
  font-size: 13px;
  background-color: white;
  cursor: pointer;
  border-left: ${props => (props.one ? "" : "1px solid #e0e0e0")};
`;
const OrderPrice = styled.div`
  ${leftandright}
  color: #9e9e9e;
  margin-bottom: 8px;
`;
const OrderAmount = styled.div`
  ${leftandright}
  color: #9e9e9e;
  margin-bottom: 15px;
`;
const OrderBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.status === 1 ? "#E12343" : "#1763b6")};
  color: white;
  padding: 7px 0;
  border-radius: 5px;
  margin-bottom: 7px;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BottomLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  color: #9e9e9e;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;
const BottomRight = styled.div`
  font-size: 12px;
  color: #9e9e9e;
  cursor: pointer;
`;
