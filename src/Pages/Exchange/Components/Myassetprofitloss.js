import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import styled, { css } from "styled-components";
import "./Exchange.scss";
import MyassetLayout from "Components/Layout/MainLayout";
highchartsMore(Highcharts);

class Myassetprofitloss extends Component {
  constructor() {
    super();
    this.state = {
      coinliststate: [],
      totalasset: "",
      totalbuyprice: "",
      totalprofitloss: "",
      totalprofitrate: "",
      krwbalance: "",
      coinbalance: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    fetch("http://10.58.2.33:8000/account/balance", {
      Method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(csvReceive => {
        console.log("Total Data", csvReceive.balance.length);
        console.log("total_asset", csvReceive.total_asset);

        const coinlistfilter = csvReceive.balance;

        console.log(csvReceive.balance[0].amount);

        for (let i = 0; i < csvReceive.balance.length; i++) {
          coinlistfilter[i].name = csvReceive.balance[i].name;
          coinlistfilter[i].amount = Math.floor(
            parseInt(csvReceive.balance[i].amount)
          );

          coinlistfilter[i].avg_buy_price = Math.floor(
            parseInt(csvReceive.balance[i].avg_buy_price)
          );
          coinlistfilter[i].now_price = Math.floor(
            parseInt(csvReceive.balance[i].now_price)
          );
          coinlistfilter[i].buy_price = Math.floor(
            parseInt(csvReceive.balance[i].buy_price)
          );
          coinlistfilter[i].change_price = Math.floor(
            parseInt(csvReceive.balance[i].change_price)
          );
          coinlistfilter[i].change_rate = Math.floor(
            parseFloat(csvReceive.balance[i].change_rate)
          ).toFixed(1);
        }
        this.setState({
          coinliststate: coinlistfilter,
          totalasset: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.currency_balance)) +
              Math.floor(parseInt(csvReceive.total_asset.item_balance))
          ),
          totalbuyprice: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.total_buy_price))
          ),
          totalprofitloss: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.total_change_price))
          ),
          totalprofitrate: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.total_change_rate))
          ),
          krwbalance: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.currency_balance))
          ),
          coinbalance: this.numberWithCommas(
            Math.floor(parseInt(csvReceive.total_asset.item_balance))
          )
        });
      });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  coinlist = item => {
    console.log(this.state.BTC);
    return item.map((ele, idx) => (
      <tr>
        <TableTrTdLeft>{ele.name}</TableTrTdLeft>
        <TableTrTdRight>
          <p>{this.numberWithCommas(ele.amount)} 개</p>
          <p>≈ {this.numberWithCommas(ele.now_price)} 원</p>
        </TableTrTdRight>
        <TableTrTdRight>
          {this.numberWithCommas(ele.buy_price)} 원
        </TableTrTdRight>
        <TableTrTdRight>
          {this.numberWithCommas(ele.change_price)} 원
        </TableTrTdRight>
        <TableTrTdRight>
          {this.numberWithCommas(ele.change_rate)} %
        </TableTrTdRight>
        <TableTrTdRight>
          {this.numberWithCommas(ele.avg_buy_price)} 원
        </TableTrTdRight>
      </tr>
    ));
  };
  render() {
    return (
      <>
        <MyassetLayout>
          <MyassetBackground>
            <AssetPLwrap>
              <AssetPLwrap_left>
                <AssetPLwrap_left_div_wrap>
                  <AssetPLwrap_left_div_top>수익현황</AssetPLwrap_left_div_top>
                  <AssetPLwrap_left_div_mid>입출금</AssetPLwrap_left_div_mid>
                  <AssetPLwrap_left_div_btm>거래기록</AssetPLwrap_left_div_btm>
                </AssetPLwrap_left_div_wrap>
              </AssetPLwrap_left>
              <AssetPLwrap_right>
                <AssetPLwrap_right_div_wrap>
                  <AssetPLwrap_right_div_top>
                    수익현황
                  </AssetPLwrap_right_div_top>
                  <AssetPLwrap_right_div_mid1>
                    <AssetPLwrap_right_div_mid1_box1>
                      <AssetPLwrap_right_div_mid1_box1_total>
                        <AssetPLwrap_right_div_mid1_box1_inner1>
                          총보유자산 (원)
                        </AssetPLwrap_right_div_mid1_box1_inner1>

                        <AssetPLwrap_right_div_mid1_box1_inner2>
                          {this.state.totalasset}
                        </AssetPLwrap_right_div_mid1_box1_inner2>
                      </AssetPLwrap_right_div_mid1_box1_total>
                    </AssetPLwrap_right_div_mid1_box1>

                    <AssetPLwrap_right_div_mid1_box2>
                      <AssetPLwrap_right_div_mid1_box2_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box2_inner1>
                          보유 원화 (원)
                        </AssetPLwrap_right_div_mid1_box2_inner1>
                        <AssetPLwrap_right_div_mid1_box2_inner2>
                          {this.state.krwbalance}
                        </AssetPLwrap_right_div_mid1_box2_inner2>
                      </AssetPLwrap_right_div_mid1_box2_innerwrap1>
                      <AssetPLwrap_right_div_mid1_box2_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box2_inner1>
                          보유 암호화폐 (원)
                        </AssetPLwrap_right_div_mid1_box2_inner1>
                        <AssetPLwrap_right_div_mid1_box2_inner2>
                          {this.state.coinbalance}
                        </AssetPLwrap_right_div_mid1_box2_inner2>
                      </AssetPLwrap_right_div_mid1_box2_innerwrap1>
                    </AssetPLwrap_right_div_mid1_box2>

                    <AssetPLwrap_right_div_mid1_box3>
                      <AssetPLwrap_right_div_mid1_box3_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box3_inner1>
                          총 매수금액
                        </AssetPLwrap_right_div_mid1_box3_inner1>
                        <AssetPLwrap_right_div_mid1_box3_inner2>
                          {this.state.totalbuyprice}
                        </AssetPLwrap_right_div_mid1_box3_inner2>
                      </AssetPLwrap_right_div_mid1_box3_innerwrap1>
                      <AssetPLwrap_right_div_mid1_box3_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box3_inner1>
                          평가 손익
                        </AssetPLwrap_right_div_mid1_box3_inner1>
                        <AssetPLwrap_right_div_mid1_box3_inner2_pricechange>
                          {this.state.totalprofitloss}
                        </AssetPLwrap_right_div_mid1_box3_inner2_pricechange>
                      </AssetPLwrap_right_div_mid1_box3_innerwrap1>
                      <AssetPLwrap_right_div_mid1_box3_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box3_inner1>
                          수익률
                        </AssetPLwrap_right_div_mid1_box3_inner1>
                        <AssetPLwrap_right_div_mid1_box3_inner2_pctchange>
                          {this.state.totalprofitrate} %
                        </AssetPLwrap_right_div_mid1_box3_inner2_pctchange>
                      </AssetPLwrap_right_div_mid1_box3_innerwrap1>
                    </AssetPLwrap_right_div_mid1_box3>
                  </AssetPLwrap_right_div_mid1>
                  <AssetPLwrap_right_div_mid2>
                    매수평균가, 평가금액, 평가손익, 수익률은 모두 KRW로 환산한
                    추정 값으로 참고용입니다
                  </AssetPLwrap_right_div_mid2>

                  <Table>
                    <tr>
                      <TableTrThLeft>코인명</TableTrThLeft>
                      <TableTrThRight>보유 수량</TableTrThRight>
                      <TableTrThRight>매수 금액</TableTrThRight>
                      <TableTrThRight>평가 손익</TableTrThRight>
                      <TableTrThRight>수익률</TableTrThRight>
                      <TableTrThRight>매수 평균가</TableTrThRight>
                    </tr>
                    {this.coinlist(this.state.coinliststate)}
                  </Table>
                </AssetPLwrap_right_div_wrap>
              </AssetPLwrap_right>
            </AssetPLwrap>
          </MyassetBackground>
        </MyassetLayout>
      </>
    );
  }
}

export default Myassetprofitloss;

const MyassetBackground = styled.div`
  width: 1903px;
`;
const AssetPLwrap = styled.div`
  padding-top: 16px;
  width: 1280px;
  height: 702px;
  display: flex;
  flex-direction: row;
`;
const AssetPLwrap_left = styled.div`
  width: 176px;
  height: 654px;
  border-right: 1px solid #d6d6d6;
`;

const AssetPLwrap_left_div_wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 170px;
  padding-top: 20px;
`;
const AssetPLwrap_left_div_top = styled.div`
  font-size: 20px;
  color: #1772f8;
  height: auto;
  font-weight: 700;
`;
const AssetPLwrap_left_div_mid = styled.div`
  font-size: 20px;
  color: #c9ccd2;
  height: auto;
  font-weight: 700;
`;
const AssetPLwrap_left_div_btm = styled.div`
  font-size: 20px;
  color: #c9ccd2;
  height: auto;
  font-weight: 700;
`;

const AssetPLwrap_right = styled.div`
  width: 1104px;
  height: 654px;
  padding: 22px 0px 72px 86px;
  font-weight: 700;
  font-size: 32px;
`;

const AssetPLwrap_right_div_wrap = styled.div`
  width: 1018px;
`;

const AssetPLwrap_right_div_top = styled.div`
  width: 1018px;
  height: 45px;
  margin-bottom: 40px;
`;

const AssetPLwrap_right_div_mid1 = styled.div`
  width: 1018px;
  height: 126px;
  padding: 24px 0px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

const AssetPLwrap_right_div_mid1_box1 = styled.div`
  font-size: 14px;
  width: 330px;
  display: flex;
  justify-content: center;
  align-content: center;
`;
const AssetPLwrap_right_div_mid1_box1_total = styled.div`
  font-weight: 500;
`;
const AssetPLwrap_right_div_mid1_box1_inner1 = styled.div`
  display: flex;
  justify-content: center;
`;
const AssetPLwrap_right_div_mid1_box1_inner2 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 34px;
`;

const AssetPLwrap_right_div_mid1_box2 = styled.div`
  font-size: 14px;
  width: 388px;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-content: center;
  border-left: 1px solid #e9e9e9;
`;

const AssetPLwrap_right_div_mid1_box2_inner1 = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const AssetPLwrap_right_div_mid1_box2_inner2 = styled.div`
  height: 29px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 500;
`;

const AssetPLwrap_right_div_mid1_box2_innerwrap1 = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetPLwrap_right_div_mid1_box3 = styled.div`
  font-size: 14px;
  width: 300px;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #898989;
`;

const AssetPLwrap_right_div_mid1_box3_inner1 = styled.div`
  height: 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const AssetPLwrap_right_div_mid1_box3_inner2 = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
`;

const AssetPLwrap_right_div_mid1_box3_innerwrap1 = styled.div`
  width: 276px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetPLwrap_right_div_mid1_box3_inner2_pricechange = styled.div`
  color: blue;
  font-weight: 500;
`;

const AssetPLwrap_right_div_mid1_box3_inner2_pctchange = styled.div``;

const AssetPLwrap_right_div_mid2 = styled.div`
  width: 1018px;
  height: 18px;
  margin: 40px 0px 12px 0px;
  font-size: 12px;
  color: #aeb3bb;
  font-weight: 500;
`;

const Table = styled.table`
  width: 1020px;
`;

const TableTrThRight = styled.th`
  font-size: 12px;
  height: 36px;
  text-align: right;
  background-color: #f4f4f4;
  padding-right: 16px;
`;

const TableTrThLeft = styled.th`
  font-size: 12px;
  height: 36px;
  text-align: left;
  background-color: #f4f4f4;
  padding-left: 16px;
`;

const TableTrTdRight = styled.td`
  font-size: 14px;
  height: 60px;
  text-align: right;
  padding-right: 16px;
`;

const TableTrTdLeft = styled.td`
  font-size: 14px;
  height: 60px;
  text-align: left;
  padding-left: 16px;
`;
