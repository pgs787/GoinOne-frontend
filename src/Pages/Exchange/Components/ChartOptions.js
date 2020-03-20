import Highcharts from "highcharts/highstock";

const ExchangeOptions = {
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
      marker: { enabled: false },
      color: "black",
      fillOpacity: 0.2,
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
    labels: { enabled: true }
  }
};

const MainOptions = {
  chart: {
    tooltip: {
      split: true
    },
    styleMode: true,
    zoomType: "xy",
    height: 260,
    width: 430,
    scrollablePlotArea: {
      scrollPositionX: 0
    }
  },
  credits: {
    enabled: false
  },
  series: [
    {
      showInLegend: false,
      name: "",
      type: "area",
      data: [],
      color: {
        linearGradient: {
          x1: 1,
          y1: 0,
          x2: 0,
          y2: 0
        },
        stops: [
          [
            0,
            Highcharts.Color("#FF5733")
              .setOpacity(1)
              .get("rgba")
          ],
          [
            1,
            Highcharts.Color("#FF5733")
              .setOpacity(0.05)
              .get("rgba")
          ]
        ]
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [
            0,
            Highcharts.Color("#FF5733")
              .setOpacity(0.05)
              .get("rgba")
          ],
          [
            1,
            Highcharts.Color("#FF5733")
              .setOpacity(0)
              .get("rgba")
          ]
        ]
      }
    }
  ],
  title: {
    enabled: false,
    text: ""
  },
  xAxis: {
    visible: false,
    type: "datetime",
    dateTimeLabelFormats: {
      hour: "%H + AM"
    },
    title: {
      enabled: false,
      text: ""
    },
    labels: { enabled: false }
  },
  yAxis: {
    visible: false,
    title: {
      enabled: false,
      text: ""
    },
    labels: { enabled: false }
    // min: 6000000,
    // max: 12000000
  }
};

const ExchangeVolumeOptions = {
  tooltip: { shared: true },
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
    tooltip: { shared: true },
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
      marker: { enabled: false },
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
      marker: { enabled: false },
      data: [],
      lineColor: "#006388",
      lineWidth: 4,
      tooltip: {
        valueSuffix: " 백만원"
      }
    },
    {
      name: "Acc Volume",
      type: "column",
      yAxis: 1, // 왼쪽에 고정시킬 축을 1 로 설정
      data: [],
      color: "rgba(255, 128, 0, 0.4)",
      borderColor: "rgba(255, 128, 0, 0.4)",

      tooltip: {
        valueSuffix: " 개"
      }
    }
  ]
};

export default { ExchangeOptions, ExchangeVolumeOptions, MainOptions };
