import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import "./Exchange.scss";

highchartsMore(Highcharts);

class Exchangevolume extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        tooltip: { pointFormat: "", shared: true },
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
        plotOptions: {
          series: {
            pointWidth: 5
          }
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          tooltip: { pointFormat: "", shared: true },
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
        yAxis: [
          {
            opposite: true,
            name: "Acc Price",
            tickAmount: 4,
            resize: {
              enabled: true
            },
            lineColor: "#000000",
            lineWidth: 1,
            title: {
              enabled: false,
              text: "Acc Price"
            },
            labels: { enabled: true }
          },
          {
            name: "Acc Volume",
            tickAmount: 4,
            resize: {
              enabled: true
            },
            lineColor: "#000000",
            lineWidth: 1,
            title: {
              enabled: false,
              text: "Acc Volume"
            },
            labels: { enabled: true }
          }
        ],
        series: [
          {
            name: "Acc Price",
            type: "spline",
            data: [],
            lineColor: "#006388",
            tooltip: {
              pointFormat: "",
              valueSuffix: " 백만원"
            }
          },
          {
            name: "Acc Volume",
            type: "column",
            yAxis: 1, // 왼쪽에 고정시킬 축을 1 로 설정
            data: [],
            color: "green",
            tooltip: {
              valueSuffix: " 개"
            }
          }
        ]
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
          const AccPrice = [];
          for (let i = 99; i >= 0; i--) {
            AccPrice.push([
              csvReceive[i].timestamp,
              Math.floor(csvReceive[i].candleAccTradePrice / 1000000)
            ]);
          }
          //Moving Average 그릴때 i의 배열.length 조건 설정 주의!
          const AccVolume = [];
          for (let i = 99; i >= 0; i--) {
            AccVolume.push([
              csvReceive[i].timestamp,
              Math.floor(csvReceive[i].candleAccTradeVolume)
            ]);
          }

          const CopyOptions = { ...component.state.options }; //초기 state 객체 복사
          CopyOptions.series[0].data = AccPrice; // 복사된 state 의 data 만 업데이트
          CopyOptions.series[1].data = AccVolume;
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

export default Exchangevolume;
