import React, { useEffect, useState, useCallback } from "react";
import { KwangHoon } from "config";
import { connect } from "react-redux";
import styled from "styled-components";
const Dealtime = ({ coinstatus }) => {
  const [list, setList] = useState([]);

  const getCoinInfo = useCallback(() => {
    fetch(`${KwangHoon}/exchange/${coinstatus + 1}`)
      .then(res => res.json())
      .then(res => {
        setList(res.trade_data);
      });
  }, [coinstatus]);

  useEffect(() => {
    getCoinInfo();
  }, [getCoinInfo]);
  const mapOfItems = useCallback(list => {
    return list.map((ele, idx) => (
      <List buy={ele.is_buy} key={idx}>
        <Listele title>
          {ele.time.toLocaleString("en-GB", { timeZone: "UTC" }).slice(11, 19)}
        </Listele>
        <Listele number>{Math.ceil(ele.price).toLocaleString()}</Listele>
        <Listele amount>{Number(ele.amount).toFixed(4)}</Listele>
      </List>
    ));
  }, []);
  return (
    <Wrapper>
      <Header>
        <Name>체결시간</Name>
        <Name>가격</Name>
        <Name>수량</Name>
      </Header>
      <ListWrapper>{list && mapOfItems(list)}</ListWrapper>
    </Wrapper>
  );
};
const mapStatetoProps = state => {
  return {
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStatetoProps, {})(Dealtime);
const Wrapper = styled.div`
  height: 93%;
`;
const Header = styled.div`
  display: flex;
  margin: 0 auto;
  font-size: 14px;
  width: 90%;
  border-bottom: 1px solid #e0e0e0;
`;
const Name = styled.div`
  padding: 10px 10px 8px 0;
  width: 83px;
  color: #9e9e9e;
  text-align: end;
`;
const List = styled.div`
  display: flex;
  margin: 0 auto;
  font-size: 15px;
  width: 90%;
  background-color: ${props => (props.buy ? "#FFF7F9" : "#f4f4f4")};
  color: black;
`;
const Listele = styled.div`
  padding: 5px 5px;
  padding-right: ${props => (props.amount || props.number) && "0"};
  width: 83px;
  font-size: ${props => props.title && "14px"};
  color: black;
  text-align: end;
`;

const ListWrapper = styled.div`
  height: 100%;
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
