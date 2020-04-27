import Highcharts from "highcharts";

export function setupOptions(data, currency) {
  if (!data) {
    return {
      title: {
        text: ""
      }
    };
  }
  let tooltipEnabled = true;
  return {
    title: {
      text: currency["value"] + ": Sentiment Volatility Index & Price history"
    },
    credits: {
      enabled: false
    },
    subtitle: {
      text: "Source: cryptoreview.ai"
    },
    xAxis: [
      {
        // type: 'datetime',
        categories: data.xdata,
        crosshair: true
        // type: 'datetime'
      }
    ],
    tooltip: {
      shared: true
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        allowPointSelect: true,
        point: {
          events: {
            click: function() {
              this.series.chart.update({
                tooltip: {
                  enabled: tooltipEnabled
                }
              });
              tooltipEnabled = tooltipEnabled ? false : true;
            }
          }
        }
      }
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value} USD",
          style: {
            color: "#000000"
          }
        },
        title: {
          text: "Price (closing) with range",
          style: {
            color: "#000000"
          }
        },
        opposite: true
      },
      {
        min: 0,
        gridLineWidth: 0,
        title: {
          text: "Sentiment Volatility Index",
          style: {
            color: "#111675"
          }
        },
        labels: {
          format: "{value:.2f}",
          style: {
            color: "#111675"
          }
        }
      },
      {
        // Tertiary yAxis
        // max: 100,
        min: 0,
        gridLineWidth: 0,
        title: {
          text: "Reddit Hype Index",
          style: {
            color: "#b30000"
          }
        },
        labels: {
          format: "{value:.2f}",
          style: {
            color: "#111675"
          }
        }
      }
    ],
    chart: {
      zoomType: "x",
      height: window.innerHeight * 0.7,
      backgroundColor: "#fbfbfb"
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 70,
      verticalAlign: "bottom",
      y: -55,
      floating: true,
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
        "rgba(255,255,255,0.25)"
    },

    series: [
      {
        name: "Sentiment Volatility Index(3-day SMA)",
        id: "sindex",
        color: "#111675",
        yAxis: 1,
        data: data.y2data_ma, //[9.31, 9.9, 8.69, 0.0],
        tooltip: {
          valueSuffix: " points"
        },
        marker: false
      },
      {
        name: "Closing price with range",
        id: "price",
        type: "spline",
        color: "#000000",
        data: data.y1data, //[100,200,150,200],
        dashStyle: "shortdot",
        tooltip: {
          valueSuffix: " USD"
        }
      },
      {
        name: "Range",
        id: "price_range",
        type: "arearange",
        lineWidth: 0,
        data: data.y1data_high_low,
        linkedTo: ":previous",
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false
        },
        tooltip: {
          valueSuffix: " USD"
        }
      },
      {
        name: "Reddit Hype Index",
        id: "rindex",
        color: "#b30000",
        yAxis: 2,
        data: data.y3data_social_js, //[9.31, 9.9, 8.69, 0.0],
        dashStyle: "Dash",
        tooltip: {
          valueSuffix: " points"
        },
        lineWidth: 1.5,
        marker: false
      }
    ]
  };
}
