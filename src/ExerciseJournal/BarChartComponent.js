import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const defaultChartConfig = {
  backgroundGradientFrom: "#f9f9f9",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#e9e9e9",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(34, 123, 212, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 0, // optional, defaults to 2dp
  style: {
    borderRadius: 16, 
    
  },
  propsForLabels: {
    fontSize: "16",
    fontFamily: "Verdana",
    color: "black"
  },
  propsForBackgroundLines: {
    strokeDasharray: "" // solid background lines with no dashes
  }
};

const defaultScreenWidth = "90%";

const BarChartComponent = ({dayCalories, screenWidth = defaultScreenWidth, chartConfig = defaultChartConfig}) => (
  <View style={{alignItems : 'center'}}>
      <BarChart
      width={Dimensions.get("window").width * (parseInt(screenWidth) / 100)}
      height={220}
      yAxisLabel="Cal"
      chartConfig={chartConfig}
      barRadius={5}

      data={{
      labels: Object.keys(dayCalories),
      datasets: [
        {
          data: Object.values(dayCalories),
        },
      ],
    }}
  />
  </View>

);

export default BarChartComponent;