import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import styled, { css } from "styled-components";
import "./Exchange.scss";
import MyassetLayout from "Components/Layout/SignupLayout";
highchartsMore(Highcharts);

class Myassetprofitloss extends Component {
  constructor() {
    super();
    this.state = {
      coin: "",
      amount: "",
      buyprice: "",
      avgbuyprice: "",
      nowprice: "",
      krwbalance: "",
      coinbalance: "",
      totalasset: "",
      totalbuyprice: "",
      profitloss: "",
      profitrate: ""
    };
  }

  componentDidMount() {
    // const component = this;
    // this.interval = setInterval(function() {
    fetch("http://10.58.2.252:8000/account/balance", {
      Method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndlY29kZTFAZ2dnLmdnZyJ9.6Q_zrgqGPOCWmkGvMfeV2ewQBYUWEOqs1LDGF5o5PCU"
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(csvReceive => {
        console.log("Total Data", csvReceive);
        console.log("balance", csvReceive.balance); //데이터 들어오는지 확인
        console.log(
          "balance",
          typeof Math.floor(parseFloat(csvReceive.balance[0].buy_price))
        ); //데이터 들어오는지 확인
        console.log("total_asset", csvReceive.total_asset);

        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        this.setState({
          coin: csvReceive.balance[0].name,
          amount: numberWithCommas(Math.floor(csvReceive.balance[0].amount)),
          buyprice: numberWithCommas(
            Math.floor(csvReceive.balance[0].buy_price)
          ),
          nowprice: numberWithCommas(
            Math.floor(csvReceive.balance[0].now_price)
          ),
          avgbuyprice: numberWithCommas(
            Math.floor(csvReceive.balance[0].avg_buy_price)
          ),
          krwbalance: numberWithCommas(
            Math.floor(csvReceive.total_asset.currency_balance)
          ),
          coinbalance: numberWithCommas(
            Math.floor(csvReceive.total_asset.item_balance)
          ),
          totalasset: numberWithCommas(
            Math.floor(csvReceive.total_asset.currency_balance) +
              Math.floor(csvReceive.total_asset.item_balance)
          ),
          totalbuyprice: numberWithCommas(
            Math.floor(csvReceive.total_asset.total_buy_price)
          ),
          profitloss: numberWithCommas(
            Math.floor(csvReceive.total_asset.total_change_price)
          ),
          profitrate: numberWithCommas(
            Math.floor(csvReceive.total_asset.total_change_rate)
          )
        });
      });
  }

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
                          {this.state.profitloss}
                        </AssetPLwrap_right_div_mid1_box3_inner2_pricechange>
                      </AssetPLwrap_right_div_mid1_box3_innerwrap1>
                      <AssetPLwrap_right_div_mid1_box3_innerwrap1>
                        <AssetPLwrap_right_div_mid1_box3_inner1>
                          수익률
                        </AssetPLwrap_right_div_mid1_box3_inner1>
                        <AssetPLwrap_right_div_mid1_box3_inner2_pctchange>
                          {this.state.profitrate}
                        </AssetPLwrap_right_div_mid1_box3_inner2_pctchange>
                      </AssetPLwrap_right_div_mid1_box3_innerwrap1>
                    </AssetPLwrap_right_div_mid1_box3>
                  </AssetPLwrap_right_div_mid1>
                  <AssetPLwrap_right_div_mid2>
                    매수평균가, 평가금액, 평가손익, 수익률은 모두 KRW로 환산한
                    추정 값으로 참고용입니다
                  </AssetPLwrap_right_div_mid2>
                  <AssetPLwrap_right_div_btm>
                    <AssetPLwrap_right_div_btm_head>
                      <AssetPLwrap_right_div_btm_head_ul>
                        <AssetPLwrap_right_div_btm_head_li>
                          <AssetPLwrap_right_div_btm_head_listdiv1>
                            코인명
                          </AssetPLwrap_right_div_btm_head_listdiv1>
                          <AssetPLwrap_right_div_btm_head_listdiv2>
                            보유 수량
                          </AssetPLwrap_right_div_btm_head_listdiv2>
                          <AssetPLwrap_right_div_btm_head_listdiv3>
                            매수 금액
                          </AssetPLwrap_right_div_btm_head_listdiv3>
                          <AssetPLwrap_right_div_btm_head_listdiv4>
                            평가 손익
                          </AssetPLwrap_right_div_btm_head_listdiv4>
                          <AssetPLwrap_right_div_btm_head_listdiv5>
                            수익률
                          </AssetPLwrap_right_div_btm_head_listdiv5>
                          <AssetPLwrap_right_div_btm_head_listdiv6>
                            매수 평균가
                          </AssetPLwrap_right_div_btm_head_listdiv6>
                        </AssetPLwrap_right_div_btm_head_li>
                      </AssetPLwrap_right_div_btm_head_ul>
                    </AssetPLwrap_right_div_btm_head>
                    <AssetPLwrap_right_div_btm_head_ul>
                      <AssetPLwrap_right_div_btm_list_li>
                        <AssetPLwrap_right_div_btm_list_listdiv1>
                          {this.state.coin}
                        </AssetPLwrap_right_div_btm_list_listdiv1>
                        <AssetPLwrap_right_div_btm_list_listdiv2>
                          {this.state.amount}
                        </AssetPLwrap_right_div_btm_list_listdiv2>
                        <AssetPLwrap_right_div_btm_list_listdiv3>
                          {this.state.buyprice}
                        </AssetPLwrap_right_div_btm_list_listdiv3>
                        <AssetPLwrap_right_div_btm_list_listdiv4>
                          {this.state.profitloss}
                        </AssetPLwrap_right_div_btm_list_listdiv4>
                        <AssetPLwrap_right_div_btm_list_listdiv5>
                          {this.state.profitrate}
                        </AssetPLwrap_right_div_btm_list_listdiv5>
                        <AssetPLwrap_right_div_btm_list_listdiv6>
                          {this.state.avgbuyprice}
                        </AssetPLwrap_right_div_btm_list_listdiv6>
                      </AssetPLwrap_right_div_btm_list_li>
                    </AssetPLwrap_right_div_btm_head_ul>
                  </AssetPLwrap_right_div_btm>
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
  margin: 0 auto;
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

const AssetPLwrap_right_div_mid1_box3_inner2_pctchange = styled.div`
  color: blue;
`;

const AssetPLwrap_right_div_mid2 = styled.div`
  width: 1018px;
  height: 18px;
  margin: 40px 0px 12px 0px;
  font-size: 12px;
  color: #aeb3bb;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm = styled.div`
  width: 1018px;
`;

const AssetPLwrap_right_div_btm_head = styled.div``;
const AssetPLwrap_right_div_btm_head_ul = styled.ul``;
const AssetPLwrap_right_div_btm_head_li = styled.li`
  width: 1029px;
  display: flex;
  flex-direction: row;
  background-color: #f4f4f4;
  height: 36px;
  align-items: center;
`;

const AssetPLwrap_right_div_btm_head_listdiv1 = styled.div`
  font-size: 12px;
  width: 155px;
  text-align: left;
  padding: 0px 8px 0px 16px;
  // color: #747474;
  font-weight: 700;
`;

const AssetPLwrap_right_div_btm_head_listdiv2 = styled.div`
  font-size: 12px;
  width: 209px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm_head_listdiv3 = styled.div`
  font-size: 12px;
  width: 162px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm_head_listdiv4 = styled.div`
  font-size: 12px;
  width: 171px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm_head_listdiv5 = styled.div`
  font-size: 12px;
  width: 119px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm_head_listdiv6 = styled.div`
  font-size: 12px;
  width: 213px;
  text-align: right;
  padding: 0px 8px 0px 16px;
  color: #747474;
  font-weight: 500;
`;

const AssetPLwrap_right_div_btm_list_li = styled.li`
  width: 1029px;
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 60px;
  align-items: center;
`;

const AssetPLwrap_right_div_btm_list_listdiv1 = styled.div`
  font-size: 14px;
  width: 155px;
  text-align: left;
  padding: 0px 8px 0px 16px;
  // color: #747474;
  font-weight: 700;
`;
const AssetPLwrap_right_div_btm_list_listdiv2 = styled.div`
  font-size: 14px;
  width: 209px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;
const AssetPLwrap_right_div_btm_list_listdiv3 = styled.div`
  font-size: 14px;
  width: 162px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;
const AssetPLwrap_right_div_btm_list_listdiv4 = styled.div`
  font-size: 14px;
  width: 171px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;
const AssetPLwrap_right_div_btm_list_listdiv5 = styled.div`
  font-size: 14px;
  width: 119px;
  text-align: right;
  color: #747474;
  font-weight: 500;
`;
const AssetPLwrap_right_div_btm_list_listdiv6 = styled.div`
  font-size: 14px;
  width: 213px;
  text-align: right;
  padding: 0px 8px 0px 16px;
  color: #747474;
  font-weight: 500;
`;
