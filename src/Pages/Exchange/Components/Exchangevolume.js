import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { KwangHoon } from "config";
import { connect } from "react-redux";
import "./Exchange.scss";
import ExchangeOptions from "./ChartOptions";
highchartsMore(Highcharts);

class Exchangevolume extends Component {
  constructor() {
    super();
    this.state = {
      options: ExchangeOptions.ExchangeVolumeOptions
    };
  }

  componentDidMount() {
    const component = this;
    this.interval = setInterval(function() {
      fetch(`${KwangHoon}/exchange/report/${this.props.coinstatus}/days`, {
        Method: "GET"
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(csvReceive => {
          console.log(csvReceive);
          const AccPrice = [];
          for (let i = 99; i >= 0; i--) {
            AccPrice.push([
              csvReceive.data[i].date * 1000,
              Math.floor(csvReceive.data[i].candle_price / 1000000)
            ]);
          }
          //Moving Average 그릴때 i의 배열.length 조건 설정 주의!
          const AccVolume = [];
          for (let i = 99; i >= 0; i--) {
            AccVolume.push([
              csvReceive.data[i].date * 1000,
              Math.floor(csvReceive.data[i].candle_volume)
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
const mapStateToProps = state => {
  return {
    coinstatus: state.coinSelect.coin
  };
};
export default connect(mapStateToProps, {})(Exchangevolume);
