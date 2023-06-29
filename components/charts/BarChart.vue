<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      options:{
        onClick: function(point, event){
          console.log('event : ', event);
          console.log('point : ', point);
        },
      },
      chartOptions: {
        responsive: true,
        onClick: function(point, event){
          console.log('event : ', event);
          console.log('point : ', point);
        },
      //   on:{
      //     click: function(evt) {
      //   // get the x and y coordinates of the click event
      //   var x = evt.x;
      //   var y = evt.y;

      //   // get the data point at the click location
      //   var dataPoint = chart.getData()[0].datasets[0].data[x];

      //   // do something with the data point
      //   console.log(dataPoint);
      // }
      //   }
      }
    }
  }
}
</script>