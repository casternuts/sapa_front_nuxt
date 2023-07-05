<template>
  
  <data-table :rows="rows" @rowClicked="rowClickHandler" ></data-table>
</template>

<script setup>
 import { DataTable } from "@jobinsjp/vue3-datatable"
  import "@jobinsjp/vue3-datatable/dist/style.css"

import { useAnalysis } from '~/stores/analysis'
const analysis = useAnalysis();
defineProps({
  rows: Object
  
})

const rowClickHandler = (row) => {
                console.log("Row Clicked", row)
            }
// const data = [
//         {
//             "id": 1,
//             "review": "Misti",
           
//         },
       
//     ]

      


</script>