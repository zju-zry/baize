// 柱状图
import { useEffect} from "react";
import { View } from "@tarojs/components";
import { EChart } from "echarts-taro3-react";
import "./index.less";

export default ({data, name, subtext}) => {

    let barChart
    const refBarChart = (node) => (barChart = node);
    useEffect(()=>{
        const defautOption = {
            animation:false,
            title: {
                text:name, subtext, x: 'center'
            },
            xAxis: {
                type: 'category',
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                type: 'line', data: data
            }]
        };
        if (barChart) barChart.refresh(defautOption);
    },[ data, name, subtext]) 

    return (
      <View className='bar-chart'>
        {data&&<EChart ref={refBarChart} canvasId='bar-canvas' />}
      </View>
    );
  
}