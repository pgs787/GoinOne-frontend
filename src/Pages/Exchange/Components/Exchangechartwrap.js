import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import styled, { css } from "styled-components";
import "./Exchange.scss";
import Exchange from "./Exchange";
import Exchangevolume from "./Exchangevolume";

highchartsMore(Highcharts);

class Exchangechartwrap extends Component {
  constructor() {
    super();
    this.state = {
      chartleft: true
    };
  }

  chartselectorLeft = () => {
    this.state.chartleft
      ? this.setState({ chartleft: true })
      : this.setState({ chartleft: true });
  };
  chartselectorRight = () => {
    this.state.chartleft
      ? this.setState({ chartleft: false })
      : this.setState({ chartleft: false });
  };

  render() {
    return (
      <>
        {this.state.chartleft ? (
          <Chartwrap>
            <Chartselectorwrap>
              <Chartselectorbtn_left_true onClick={this.chartselectorLeft}>
                캔들 차트
              </Chartselectorbtn_left_true>
              <Chartselectorbtn_right onClick={this.chartselectorRight}>
                거래액 & 거래수량
              </Chartselectorbtn_right>
            </Chartselectorwrap>
            <Exchange></Exchange>
          </Chartwrap>
        ) : (
          <Chartwrap>
            <Chartselectorwrap>
              <Chartselectorbtn_left onClick={this.chartselectorLeft}>
                캔들 차트
              </Chartselectorbtn_left>
              <Chartselectorbtn_right_true onClick={this.chartselectorRight}>
                거래액 & 거래수량
              </Chartselectorbtn_right_true>
            </Chartselectorwrap>
            <Exchangevolume></Exchangevolume>
          </Chartwrap>
        )}
      </>
    );
  }
}

export default Exchangechartwrap;

const Chartwrap = styled.div``;

const Chartselectorwrap = styled.div`
  display: flex;
`;

const Chartselectorbtn_left = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 10px;
  text-align: center;
  // border: 1px solid #9f9f9f;
  background-color: #e9e9e9;
  color: #b0afaf;
  border-radius: 2%;
  font-size: 14px;
  font-weight: 600;
`;

const Chartselectorbtn_left_true = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 10px;
  text-align: center;
  // border: 1px solid #9f9f9f;
  background-color: white;
  border-radius: 2%;
  font-size: 14px;
  font-weight: 600;
`;

const Chartselectorbtn_right = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 10px;
  text-align: center;
  // border: 1px solid #9f9f9f;
  background-color: #e9e9e9;
  color: #b0afaf;
  border-radius: 2%;
  font-size: 14px;
  font-weight: 600;
`;

const Chartselectorbtn_right_true = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 10px;
  text-align: center;
  // border: 1px solid #9f9f9f;
  background-color: white;
  border-radius: 2%;
  font-size: 14px;
  font-weight: 600;
`;
