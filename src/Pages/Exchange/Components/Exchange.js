import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import "./Exchange.scss";

highchartsMore(Highcharts);

class Exchange extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        chart: {
          styleMode: true,
          zoomType: "xy",
          height: 400,
          width: 950,
          marginRight: 60,
          marginLeft: 60,
          marginTop: 50,
          scrollablePlotArea: {
            scrollPositionX: 0
          }
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        series: [
          {
            showInLegend: false,
            name: "BTC",
            type: "candlestick",
            data: [],
            color: "#006388",
            lineColor: "#006388",
            upColor: "#d73232",
            upLineColor: "#d73232",
            credits: {
              enabled: false
            }
          },
          {
            name: "Moving Average (5Day)",
            type: "spline",
            data: [],
            marker: { enabled: false },
            color: "green",
            credits: {
              enabled: false
            }
          },
          {
            name: "Bollinger Band",
            type: "arearange",
            data: [],
            pointStart: Date.UTC(2019, 11, 13),
            pointInterval: 24 * 3600,
            marker: { enabled: false },
            color: "black",
            fillOpacity: 0.2,
            plotOptions: {
              fillOpacity: 0.3
            },
            credits: {
              enabled: false
            }
          }
        ],

        xAxis: {
          lineColor: "#000000",
          lineWidth: 1,
          type: "datetime",
          dateTimeLabelFormats: {
            week: "%Y. %b. %e"
          },
          title: {
            text: "",
            enabeld: false
          }
        },
        yAxis: {
          tickAmount: 6,
          lineColor: "#000000",
          lineWidth: 1,
          opposite: true,
          title: {
            enabled: false,
            text: ""
          },
          labels: { enabled: true },
          min: 5000000,
          max: 13000000
        }
      }
    };
  }

  componentDidMount() {
    const component = this;
    this.interval = setInterval(function() {
      fetch(
        "https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-BTC&count=100&"
      )
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(csvReceive => {
          // CandleChart 그리기
          const CandleStick = [];
          for (let i = 99; i >= 0; i--) {
            CandleStick.push([
              csvReceive[i].timestamp,
              csvReceive[i].openingPrice,
              csvReceive[i].highPrice,
              csvReceive[i].lowPrice,
              csvReceive[i].tradePrice
            ]);
          }

          console.log(csvReceive[0].timestamp);

          //Moving Average 그릴때 i의 배열.length 조건 설정 주의!
          const MovAvg5 = [];
          for (let i = 99; i >= 4; i--) {
            MovAvg5.push([
              parseInt(csvReceive[i - 4].timestamp),
              (parseInt(csvReceive[i].tradePrice) +
                parseInt(csvReceive[i - 1].tradePrice) +
                parseInt(csvReceive[i - 2].tradePrice) +
                parseInt(csvReceive[i - 3].tradePrice) +
                parseInt(csvReceive[i - 4].tradePrice)) /
                5
            ]);
          }
          // Bollinger Band 계산에 필요한 Array 설정
          let sum = [];
          let std = [];

          let closewTime = [];
          for (let i = 99; i >= 0; i--) {
            closewTime.push([
              csvReceive[i].timestamp,
              parseInt(csvReceive[i].tradePrice)
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
              csvReceive[-i + 95].timestamp,
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

export default Exchange;
