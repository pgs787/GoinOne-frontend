import React, { Component } from "react";
import styled, { css } from "styled-components";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import ExchangeOptions from "Pages/Exchange/Components/ChartOptions";

highchartsMore(Highcharts);

class MainETC extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      closeprice: "",
      chgrate: "",
      acctradeprice: "",
      acctradevolume: "",
      signedchangeprice: "",
      options: ExchangeOptions.MainOptions
    };
  }

  componentDidMount() {
    const component = this;
    this.interval = setInterval(function() {
      fetch("http://10.58.2.33:8000/exchange/report/4/days", {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(csvReceive => {
          console.log("code", csvReceive);
          console.log("date", csvReceive.data[0].date);
          console.log("open", parseInt(csvReceive.data[0].opening_price)); //데이터 들어오는지 확인
          console.log("high", parseInt(csvReceive.data[0].high_price));
          console.log("low", parseInt(csvReceive.data[0].low_price));
          console.log("close", parseInt(csvReceive.data[0].trade_price));
          console.log("length", parseInt(csvReceive.length));
          console.log(csvReceive);
          // CandleChart 그리기용
          const AreaChart = [];
          for (let i = 99; i >= 0; i--) {
            AreaChart.push([
              csvReceive.data[i].date,
              parseInt(csvReceive.data[i].trade_price)
            ]);
          }
          console.log(AreaChart);
          console.log(csvReceive.data[99].date);
          console.log(csvReceive.data[99].trade_price);

          const MovAvg5 = [];
          for (let i = 99; i >= 4; i--) {
            MovAvg5.push([
              parseInt(csvReceive.data[i - 4].date),
              (parseInt(csvReceive.data[i].trade_price) +
                parseInt(csvReceive.data[i - 1].trade_price) +
                parseInt(csvReceive.data[i - 2].trade_price) +
                parseInt(csvReceive.data[i - 3].trade_price) +
                parseInt(csvReceive.data[i - 4].trade_price)) /
                5
            ]);
          }
          // Bollinger Band 계산에 필요한 Array 설정
          let sum = [];
          let sumAvg = [];
          let std = [];
          // Bollinger Band plotting 에 사용할 Standard Deviation 계산
          console.log(MovAvg5.length);
          for (let i = 99; i >= 4; i--) {
            sum.push(
              (parseInt(csvReceive.data[i + 0].trade_price) -
                parseInt(MovAvg5[i - 4][1])) **
                2 +
                (parseInt(csvReceive.data[i - 1].trade_price) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(csvReceive.data[i - 2].trade_price) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(csvReceive.data[i - 3].trade_price) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(csvReceive.data[i - 4].trade_price) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2
            );
          }
          for (let i = 99; i >= 4; i--) {
            sumAvg.push(sum[i - 4] / 5);
          }

          for (let i = 99; i >= 4; i--) {
            std.push(Math.sqrt(sumAvg[i - 4]));
          }
          console.log(sum);

          console.log(std);

          const BollBand = [];
          for (let i = 99; i >= 4; i--) {
            BollBand.push([
              parseInt(csvReceive.data[i - 4].date),
              MovAvg5[i - 4][1] - 2 * std[i - 4],
              MovAvg5[i - 4][1] + 2 * std[i - 4]
            ]);
          }
          console.log(BollBand);
          //
          // let rate_temp_dec = []; rate_temp_dec =

          const CopyOptions = { ...component.state.options }; //초기 state 객체 복사
          CopyOptions.series[0].data = AreaChart; // 복사된 state 의 data 만 업데이트
          // CopyOptions.series[1].data = MovAvg5; // 복사된 state 의 data 만 업데이트
          // CopyOptions.series[2].data = BollBand; // 복사된 state 의 data 만 업데이트
          function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          component.setState({
            options: CopyOptions,
            name: csvReceive.data[0].item,
            closeprice: numberWithCommas(
              Math.floor(csvReceive.data[0].trade_price)
            ),

            chgrate:
              (
                ((csvReceive.data[0].trade_price -
                  csvReceive.data[1].trade_price) /
                  csvReceive.data[0].trade_price) *
                100
              ).toFixed(2) + "%",
            acctradevolume: numberWithCommas(
              Math.floor(csvReceive.data[0].candle_volume) + "개"
            ),
            acctradeprice: numberWithCommas(
              Math.floor(csvReceive.data[0].candle_price / 1000000) + "백만"
            )
          });
        });
    }, 2000);
  }

  toExchange = () => {
    this.props.history.push("/Exchange");
  };

  render() {
    return (
      <CoverArea>
        <CoverInner>
          <ChartMain>
            <ChartMainCard>
              <ChartMainCard_Left>
                <ChartMainCard_Left_inner_div_name>
                  {this.state.name}
                </ChartMainCard_Left_inner_div_name>
                <ChartMainCard_Left_inner_div>
                  Main Market
                </ChartMainCard_Left_inner_div>
              </ChartMainCard_Left>
              <ChartMainCard_Right>
                <ChartMainCard_Right_Price>
                  {this.state.closeprice}
                </ChartMainCard_Right_Price>
                <ChartMainCard_Right_PriceChange>
                  등락률: {this.state.chgrate}
                </ChartMainCard_Right_PriceChange>
                <ChartMainCard_Right_AmountChange>
                  거래대금: {this.state.acctradeprice}
                </ChartMainCard_Right_AmountChange>
              </ChartMainCard_Right>
            </ChartMainCard>
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
            ></HighchartsReact>
            <ToExchangeBtn onClick={this.toExchange}>
              거래소 바로가기
            </ToExchangeBtn>
          </ChartMain>
        </CoverInner>
      </CoverArea>
    );
  }
}

export default MainETC;

const LandingMain = styled.div`
  height: 600px;
  padding-bottom: 20px;
  width: 1903px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilterWarp = styled.div`
  width: 950px;
`;

const FilterInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // margin-right: 400px;
  width: 100%;
`;

const FilterSearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputSearchWarp = styled.div`
  width: 240px;
  height: 36px;
  display: flex;
  align-items: center;
  position: relative;
  // padding-right: 36px;
  box-sizing: border-box;
`;

const InputSearch = styled.input`
  width: 240px;
  background-color: rgba(209, 203, 203, 0.2);
  // font-weight: 700;
  font-size: 12px;
  // color: #9f9f9f;
  border: none;
  border-radius: 5%;
  height: 35px;
  padding-left: 16px;
  padding-right: 48px;
  position: relative;
`;

const InputSearchMagni = styled.span`
  width: 16px;
  height: 16px;
  position: absolute;
  margin-left: 205px;
`;

const InputSearchImg = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
`;

const FilterUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
  li {
    margin-right: 16px;
    cursor: pointer;
  }
`;

const FilterLi = styled.li`
  cursor: pointer;
`;

const Volume_label = styled.span`
  font-size: 10px;
  height: 18px;
  margin-left: 8px;
  color: #9f9f9f;
`;

const Volume_amount = styled.span`
  font-size: 12px;
  height: 20px;
  margin-left: 8px;
  color: rgba(108, 122, 137, 1);
`;

const CoverArea = styled.div`
  width: 1903px;
  height: 520px;
  // border-top: 1px solid rgba(232, 232, 232, 1);
  padding-top: 20px;
  margin-top: 5px;
`;

const CoverInner = styled.div`
  margin: 0 auto;
  width: 480px;
  display: flex;
  justify-content: space-around;
`;
const ChartMain = styled.div`
  width: 496px;
  height: 440px;
  border: 1px solid #cecdcd;
  border-radius: 1%;
  padding: 20px 20px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ChartMainCard = styled.div`
  width: 430px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ChartMainCard_Left = styled.div`
  width: 103px;
  height: 100px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  font-weight: 700;
`;

const ChartMainCard_Left_inner_div_name = styled.div`
  height: 30px;
  margin-left: 10px;
  font-size: 15px;
  padding-top: 5px;
`;

const ChartMainCard_Left_inner_div = styled.div`
  height: 30px;
  margin-top: 8px;
  padding-top: 5px;
  background-color: #f9f9f9;
  width: 80px;
  text-align: center;
  color: grey;
  border-radius: 2%;
  font-size: 12px;
`;
const ChartMainCard_Right = styled.div`
  width: 140px;
  height: 100px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-contents: flex-end;
`;

const ChartMainCard_Right_Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: red;
  height: 40px;
  margin-top: -6px;
  text-align: right;
`;

const ChartMainCard_Right_PriceChange = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 0px;
  text-align: right;
`;

const ChartMainCard_Right_AmountChange = styled.div`
  text-align: right;
  font-size: 12px;
  color: grey;
  margin-top: 5px;
`;

const ToExchangeBtn = styled.button`
  width: 430px;
  height: 41px;

  margin: 0 auto;
  background-color: #cecdcd1a;
  border: none;
  font-weight: 700;
`;

const TableMainWrap_div = styled.div`
  width: 496px;
  height: 440px;
  margin-left: 5px;
  border: 1px solid #cecdcd;
  border-radius: 1%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableMain_table = styled.table`
  width: 460px;
  height: 362px;
`;

const TableMain_th1 = styled.th`
  text-align: left;
  font-size: 12px;

  // background-color: rgba(192, 192, 192, 0.2);
`;

const TableMain_th = styled.th`
  font-size: 12px;
  text-align: right;
  display: table-cell;
  // background-color: rgba(192, 192, 192, 0.2);
`;

const TableMain_tr = styled.tr`
  height: 55px;
  // display: flex;
  // align-items: center;
  // background-color: grey;
`;

// const TableMain_td_left = styled.td``;

const TableMain_td_right = styled.td`
  text-align: right;
  font-size: 12px;
  color: grey;
`;

const TableMain_td_right_red = styled.td`
  text-align: right;
  font-size: 12px;
  color: red;
  font-weight: 700;
`;

const TableMain_td1_left = styled.td`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 12px;
  padding-top: 19px;
`;

const TableMain_td1_span = styled.span`
  padding: 20px 0px;
`;
