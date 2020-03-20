import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import { KwangHoon } from "config";
import { connect } from "react-redux";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import "./Exchange.scss";
import ExchangeOptions from "./ChartOptions";

highchartsMore(Highcharts);

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ExchangeOptions.ExchangeOptions
    };
  }

  componentDidMount() {
    const component = this;
    this.interval = setInterval(() => {
      fetch(`${KwangHoon}/exchange/report/1/days`, {
        Method: "GET"
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(csvReceive => {
          console.log(csvReceive);
          // CandleChart 그리기
          const CandleStick = [];
          for (let i = 99; i >= 0; i--) {
            CandleStick.push([
              csvReceive.data && csvReceive.data[i].date * 1000,
              parseInt(csvReceive.data[i].opening_price),
              parseInt(csvReceive.data[i].high_price),
              parseInt(csvReceive.data[i].low_price),
              parseInt(csvReceive.data[i].trade_price)
            ]);
          }

          console.log(CandleStick);

          //Moving Average 그릴때 i의 배열.length 조건 설정 주의!
          const MovAvg5 = [];
          for (let i = 99; i >= 4; i--) {
            MovAvg5.push([
              parseInt(csvReceive.data[i - 4].date * 1000),
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
          let std = [];

          let closewTime = [];
          for (let i = 99; i >= 0; i--) {
            closewTime.push([
              csvReceive.data[i].date * 1000,
              parseInt(csvReceive.data[i].trade_price)
            ]);
          }

          // Bollinger Band Calc에 사용할 Dev Sum 및 Standard Deviation 계산
          for (let i = 99; i >= 4; i--) {
            sum.push([
              (parseInt(closewTime[i - 4][1]) - parseInt(MovAvg5[i - 4][1])) **
                2 +
                (parseInt(closewTime[i - 1][1]) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(closewTime[i - 2][1]) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(closewTime[i - 3][1]) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2 +
                (parseInt(closewTime[i - 4][1]) -
                  parseInt(MovAvg5[i - 4][1])) **
                  2
            ]);
          }
          for (let i = 99; i >= 4; i--) {
            std.push([Math.sqrt(sum[i - 4] / 5)]);
          }
          // Bollinger Band 계산
          const BollBand = [];
          for (let i = 0; i <= 95; i++) {
            BollBand.push([
              csvReceive.data[-i + 95].date * 1000,
              MovAvg5[i][1] - 2 * std[i],
              MovAvg5[i][1] + 2 * std[i]
            ]);
          }
          console.log(BollBand);
          const CopyOptions = { ...component.state.options }; //초기 state 객체 복사
          CopyOptions.series[0].data = CandleStick; // 복사된 state 의 data 만 업데이트
          CopyOptions.series[1].data = MovAvg5;
          CopyOptions.series[2].data = BollBand;
          component.setState({ options: CopyOptions }); // state update
        });
    }, 2000);
  }

  render() {
    return (
      <>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.options}
        ></HighchartsReact>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStateToProps, {})(Exchange);
