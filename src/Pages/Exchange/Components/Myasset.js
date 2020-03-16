import React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Myasset = ({ status }) => {
  const mapOfItems = () => {};
  return (
    <Wrapper>
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
        <Text>2,080원</Text>
        <Text two>-42.85%</Text>
      </Price>
      <ListWrapper status={status}>
        <ListHeader>
          <Name one>자산명</Name>
          <Name two>보유 수량</Name>
          <Name three>수익률</Name>
        </ListHeader>
        <List></List>
        <MainList>
          <Main one>VANTA</Main>
          <Main two>
            <Span two lefttop>
              9,990,0000
            </Span>
            <Span two bottomleft>
              1,198원
            </Span>
          </Main>
          <Main three>
            <Span three righttop>
              -42.85%
            </Span>
            <Span three bottomright>
              899원
            </Span>
          </Main>
        </MainList>
      </ListWrapper>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return { status: state.ChatOption.status };
};
export default connect(mapStateToProps, {})(Myasset);

const Wrapper = styled.div`
  padding: 20px 15px;
  overflow: auto;
  height: 100%;
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
  color: ${props => {
    if (props.bottomleft) return "#C8C8C8";
    else if (props.bottomright) return "#9BBCE0";
    else if (props.lefttop) return "black";
    else if (props.righttop) return "#3B7BC1";
  }};
  margin-bottom: ${props => (props.lefttop || props.righttop) && "5px"};
`;
