import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { KwangHoon } from "config";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { sell, buy, changeMyasset } from "Redux/Actions";
import { numberFormat, removeComma } from "util/regexp";

const Buyandsell = ({
  coinstatus,
  money,
  sell,
  buy,
  sellToggle,
  buyToggle
}) => {
  const [asset, setAsset] = useState(0);
  const [select, setSelect] = useState(1);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [pricefocus, setPricefocus] = useState(false);
  const [amountfocus, setAmountfocus] = useState(false);
  const [balanceCoin, setBalanceCoin] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const valueUp = useRef(null);

  useEffect(() => {
    fetch(`${KwangHoon}/account/balance`, {
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndlY29kZTFAZ2dnLmdnZyJ9.6Q_zrgqGPOCWmkGvMfeV2ewQBYUWEOqs1LDGF5o5PCU"
      }
    })
      .then(res => res.json())
      .then(res => {
        setBalanceCoin(res.balance);
      });
  }, []);
  const getCoinInfo = useCallback(() => {
    fetch(`${KwangHoon}/exchange/${coinstatus}`)
      .then(res => res.json())
      .then(res => {
        setPrice(
          Math.floor(
            res.item_data[coinstatus === null ? 0 : coinstatus].now_price
          )
        );
        setAmount(
          res.item_data[coinstatus === null ? 1 : coinstatus].amount_unit
        );
        setCoinInfo(res.item_data[coinstatus === null ? 1 : coinstatus]);
      });
  }, [coinstatus]);

  useEffect(() => {
    getCoinInfo();
    changeMyasset(money);
  }, [getCoinInfo, money, sell, buy]);

  const buyAct = () => {
    fetch(`${KwangHoon}/exchange/trade/buy`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndlY29kZTFAZ2dnLmdnZyJ9.6Q_zrgqGPOCWmkGvMfeV2ewQBYUWEOqs1LDGF5o5PCU"
      },
      body: JSON.stringify({
        item: coinstatus + 1,
        amount: Number(amount).toFixed(4),
        price: Number(removeComma(price))
      })
    })
      .then(sell(sellToggle))
      .then(changeMyasset(money));
  };

  const sellAct = () => {
    fetch(`${KwangHoon}/exchange/trade/sell`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndlY29kZTFAZ2dnLmdnZyJ9.6Q_zrgqGPOCWmkGvMfeV2ewQBYUWEOqs1LDGF5o5PCU"
      },
      body: JSON.stringify({
        item: coinstatus === null ? 0 : coinstatus + 1,
        amount: parseInt(removeComma(String(amount))),
        price: parseInt(removeComma(String(price)))
      })
    })
      .then(buy(buyToggle))
      .then(changeMyasset(money));
  };

  const amountDivide = num => {
    console.log(asset, price);
    if (num === 1) {
      setAmount((Number(money) / Number(price)) * 0.1);
    } else if (num === 2) {
      setAmount((Number(money) / Number(price)) * 0.25);
    } else if (num === 3) {
      setAmount((Number(money) / Number(price)) * 0.5);
    } else {
      setAmount(Number(money) / Number(price));
    }
  };

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
            {select === 1 ? Math.floor(money).toLocaleString() : "0.0000"}
            <Currency>{select === 1 ? "KRW" : coinInfo.code}</Currency>
          </Right>
        </Possetion>
        <Possible>
          <Left>{select === 1 ? "매수 가능" : "매도 가능"}</Left>
          <Right>
            {select === 1 ? Math.floor(money).toLocaleString() : "0.0000"}
            <Currency>{select === 1 ? "KRW" : coinInfo.code}</Currency>
          </Right>
        </Possible>
        <PriceTotal status={pricefocus}>
          <PriceWrapper htmlfor="price">
            <Price>가격(KRW)</Price>
            <PriceBtn
              name="price"
              onFocus={() => {
                setPricefocus(true);
              }}
              onBlur={() => {
                setPricefocus(false);
              }}
              value={numberFormat(String(price)).toLocaleString()}
              onChange={e => {
                setPrice(e.target.value);
              }}
              ref={valueUp}
            />
          </PriceWrapper>

          <BtnWrapper>
            <PriceBtnLeft
              onClick={() => {
                console.log(price);
                setPrice(
                  Number(removeComma(String(price))) +
                    Number(coinInfo.price_unit)
                );
              }}
            >
              <FontAwesomeIcon style={{ width: "10px" }} icon={faPlus} />
            </PriceBtnLeft>
            <PriceBtnRight
              onClick={() => {
                console.log(price);

                setPrice(
                  Number(removeComma(String(price))) -
                    Number(coinInfo.price_unit)
                );
              }}
            >
              <FontAwesomeIcon style={{ width: "10px" }} icon={faMinus} />
            </PriceBtnRight>
          </BtnWrapper>
        </PriceTotal>
        <AmBtnTotal status={amountfocus}>
          <AmBtnWrapper htmlfor="amount">
            <Amount>수량({coinInfo.code})</Amount>
            <AmountBtn
              name="amount"
              onFocus={() => {
                setAmountfocus(true);
              }}
              onBlur={() => {
                setAmountfocus(false);
              }}
              value={Number(amount).toFixed(4)}
              onChange={e => {
                setAmount(e.target.value);
              }}
            />
          </AmBtnWrapper>
          <BtnWrapper two>
            <UpdownBtn
              one
              onClick={() => {
                setAmount(Number(amount) + Number(coinInfo.amount_unit));
              }}
            >
              <FontAwesomeIcon
                style={{ width: "10px" }}
                icon={faPlus}
                color="black"
              />
            </UpdownBtn>
            <UpdownBtn
              onClick={() => {
                setAmount(Number(amount) - Number(coinInfo.amount_unit));
              }}
            >
              <FontAwesomeIcon
                style={{ width: "10px" }}
                icon={faMinus}
                color="black"
              />
            </UpdownBtn>
          </BtnWrapper>
        </AmBtnTotal>
        <Percent>
          <PercentName
            one
            onClick={() => {
              amountDivide(1);
            }}
          >
            10%
          </PercentName>
          <PercentName
            onClick={() => {
              amountDivide(2);
            }}
          >
            25%
          </PercentName>
          <PercentName
            onClick={() => {
              amountDivide(3);
            }}
          >
            50%
          </PercentName>
          <PercentName
            onClick={() => {
              amountDivide(4);
            }}
          >
            100%
          </PercentName>
        </Percent>
        <OrderPrice>
          <Left>주문 금액</Left>
          <Right>
            {numberFormat(
              String(removeComma(String(price)) * removeComma(String(amount)))
            ).toLocaleString()}
            <Currency>KRW</Currency>
          </Right>
        </OrderPrice>
        <OrderAmount>
          <Left>{select === 1 ? "매수 수량" : "매도 금액"}</Left>
          <Right>
            {Number(amount).toFixed(4)}
            <Currency>{coinInfo.code}</Currency>
          </Right>
        </OrderAmount>
        <OrderBtn
          status={select}
          onClick={() => {
            select === 1 ? buyAct() : sellAct();
          }}
        >
          {select === 1 ? "매수" : "매도"}
        </OrderBtn>
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
const mapStatetoProps = state => {
  return {
    coinstatus: state.coinSelect.coin,
    money: state.coinSelect.myasset,
    sellData: state.setData.sellData,
    buyData: state.setData.buyData,
    sellToggle: state.setData.sellToggle,
    buyToggle: state.setData.buyToggle
  };
};
export default connect(mapStatetoProps, { sell, buy, changeMyasset })(
  Buyandsell
);
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
const Right = styled.div`
  width: 75%;
  overflow: hidden;
  text-align: right;
`;

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
  height: 58px;
  padding: 20px 8px 6px;
  border-radius: 3px;
  background-color: #fafafa;
  border: ${props => props.status && "1px solid #1772F8 "};
`;
const PriceWrapper = styled.label`
  position: absolute;
  top: 0;
  right: 63px;
  bottom: 0;
  left: 0;
  flex: none;
  padding: 4px 0 0 8px;
  vertical-align: top;
  text-align: left;
  color: #9e9e9e;
  font-size: 12px;
  cursor: pointer;
`;
const Price = styled.span`
  ${priceandamount}
  padding: 0;
  top: 5px;
  position: absolute;
  left: 5px;
`;
const Amount = styled.div`
  ${priceandamount}

  padding: 0;
  top: 5px;
  position: absolute;
  left: 5px;
`;
const PriceBtn = styled.input`
  flex: auto;
  width: 90%;
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
  position: absolute;
  top: 18px;
  right: 8px;

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

  ${props =>
    props.two &&
    css`
      position: absolute;
      right: 9px;
      top: 15px;
    `}
`;
const pricebtn = css`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
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
  cursor: pointer;
  border: ${props => props.status && "1px solid #1772F8 "};
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
  width: 90%;
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
  right: 5px;
  top: 13px;
  position: absolute;
  background-color: transparent;
`;

const UpdownBtn = styled.div`
  z-index: 1000;
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
  margin-top: 2px;
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
