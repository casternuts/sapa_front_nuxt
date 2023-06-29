<template>
  
  <Line
  v-if="analysis.getloaded"
    id="my-chart-id"
    :options="option"
    :data="analysis.getchartData"
  />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement,LineElement,BarElement, CategoryScale, LinearScale } from 'chart.js'

import { useAnalysis } from '~/stores/analysis'
const analysis = useAnalysis();
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const option ={

       responsive: true,
       maintainAspectRatio: false,
       onClick: function(point, event){
         console.log('event : ', event);
         console.log('point : ', point);
         //event[0].datasetIndex
         console.log(analysis.getchartData[event[0].datasetIndex])
        
         console.log( analysis.chartData.datasets[event[0].datasetIndex])
       }}
      


</script>