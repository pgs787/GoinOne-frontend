import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { KwangHoon } from "config";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeMyasset } from "Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Myasset = props => {
  let token = localStorage.getItem("token");
  const [result, setResult] = useState({});
  const [balanceCoin, setBalanceCoin] = useState([]);
  const { status, asset } = props;
  useEffect(() => {
    const refresh = setInterval(() => {
      fetch(`${KwangHoon}/account/balance`, {
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndlY29kZTFAZ2dnLmdnZyJ9.6Q_zrgqGPOCWmkGvMfeV2ewQBYUWEOqs1LDGF5o5PCU"
        }
      })
        .then(res => res.json())
        .then(res => {
          props.changeMyasset(res.total_asset.currency_balance);
          setResult(res.total_asset);
          setBalanceCoin(res.balance);
        });
    }, [1000]);
    return () => {
      clearInterval(refresh);
    };
  }, [props]);

  const mapOfItem = item => {
    return item.map((ele, idx) => (
      <>
        <List key={idx}>
          <MainList>
            <Main one>{ele.name}</Main>
            <Main two>
              <Span two lefttop>
                {Number(ele.amount)
                  .toFixed(4)
                  .toLocaleString()}
              </Span>
              <Span two bottomleft>
                {Math.ceil(Number(ele.now_price)).toLocaleString()}원
              </Span>
            </Main>
            <Main three>
              <Span
                three
                righttop
                select={String(ele.change_rate).includes("-") ? 1 : 0}
              >
                {(Number(ele.change_rate) * 100).toFixed(2)}%
              </Span>
              <Span
                three
                bottomright
                select={
                  String(Number(ele.change_price) * 100).includes("-") ? 1 : 0
                }
              >
                {Math.ceil(Number(ele.change_price)).toLocaleString()}원
              </Span>
            </Main>
          </MainList>
        </List>
      </>
    ));
  };

  return (
    <Wrapper status={localStorage.getItem("token")}>
      {token ? (
        <>
          <Header>
            <Left>자산 평가금액</Left>
            <Right>더보기 ></Right>
          </Header>
          <Price>
            <FontAwesomeIcon
              icon={faEye}
              color="#71A9FB"
              style={{ backgroundColor: "#e7f1fe" }}
            />
            <Text> {Number(Math.ceil(asset)).toLocaleString()}원</Text>
            <Text two>+{Number(result.total_change_rate).toFixed(2)}%</Text>
          </Price>
          <ListWrapper status={status}>
            <ListHeader>
              <Name one>자산명</Name>
              <Name two>보유 수량</Name>
              <Name three>수익률</Name>
            </ListHeader>
            {mapOfItem(balanceCoin)}
          </ListWrapper>
        </>
      ) : (
        <>
          <LoginCheckText>로그인하고 자산을 확인하세요</LoginCheckText>
          <CheckBtn
            onClick={() => {
              props.history.push("/login");
            }}
          >
            로그인
          </CheckBtn>
        </>
      )}
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return { status: state.ChatOption.status, asset: state.coinSelect.myasset };
};
export default withRouter(connect(mapStateToProps, { changeMyasset })(Myasset));

const Wrapper = styled.div`
  padding: 20px 15px;
  overflow: auto;
  height: 100%;
  display: ${props => !props.status && "flex"};
  align-content: ${props => !props.status && "center"};
  justify-content: ${props => !props.status && "center"};
  position: ${props => !props.status && "relative"};
`;

const Header = styled.div`
  position: relative;
`;

const Left = styled.div`
  color: #9e9e9e;
  font-size: 14px;
`;
const Right = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  color: #9e9e9e;
  font-size: 14px;
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Text = styled.span`
  font-weight: bold;
  color: ${props => (props.two ? "#1763b6" : "black")};
  font-size: ${props => (props.two ? "12px" : "18px")};
  vertical-align: ${props => props.two && "top"};
  margin-left: 5px;
`;

const ListWrapper = styled.div``;
const ListHeader = styled.div`
  display: flex;
  margin: 0 10px;
  padding: 0 10px;
  line-height: 1;
  flex: 0 0 auto;
  height: 38px;
  border: 1px solid #e0e0e0;
  border-width: 1px 0;
  color: #9e9e9e;
  font-size: 14px;
`;
const List = styled.div``;

const Name = styled.div`
display:flex;
align-items:center;
  ${props =>
    props.one &&
    css`
      flex: 1 1 auto;
      width: 58px;
      justify-content: flex-start;
    `}
      ${props =>
        props.two &&
        css`
          flex: 1 1 auto;
          width: 147px;
          justify-content: flex-end;
          padding-left: 4px;
        `}
      ${props =>
        props.three &&
        css`
          flex: 1 1 auto;
          width: 123px;
          justify-content: flex-end;
          padding-left: 4px;
        `}
`;

const MainList = styled.div`
  display: flex;
  margin: 0 10px;
  padding: 0 10px;
  line-height: 1;
  padding-top: 5px;
  margin-top: 10px;
  padding-bottom: 6px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;
const Main = styled.div`
  display:block;
  align-items:center;
  flex: 1 1 auto;
  justify-content: flex-start;
  ${props =>
    props.one &&
    css`
      width: 58px;
      color: #424242;
      font-size: 13px;
      font-weight: 700;
    `}
      ${props =>
        props.two &&
        css`
          width: 147px;
          padding-left: 4px;
        `}
      ${props =>
        props.three &&
        css`
          width: 123px;
          padding-left: 4px;
        `}
`;

const Span = styled.span`
  display: block;
  text-align: end;
  font-size: ${props => (props.lefttop || props.righttop ? "15px" : "12px")};
  margin-bottom: ${props => props.lefttop && props.righttop && "5px"};
  color: ${props =>
    props.select === 1 && (props.righttop || props.bottomright)
      ? "#9BBCE0"
      : "#EA657C"};
  color: ${props => props.lefttop && "black"};
  color: ${props => props.bottomleft && "gray"};
`;

const LoginCheckText = styled.div`
  top: 100px;
  position: absolute;
  color: #9e9e9e;
  font-size: 14px;
`;
const CheckBtn = styled.div`
  top: 150px;
  position: absolute;
  padding: 6px 32px;
  background-color: #1772f8;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  min-width: 120px;
  cursor: pointer;
`;
