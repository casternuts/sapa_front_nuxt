<template>
    <EasyDataTable
    :headers="headers"
    :items="analysis.getReviewSelectData"
    @click-row="showRow"
  />
  
</template>

<script lang="ts" setup>
import EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item,ClickRowArgument  } from "vue3-easy-data-table";
import 'vue3-easy-data-table/dist/style.css';

import { useAnalysis } from '~/stores/analysis'
const analysis = useAnalysis();
defineProps({
  rows: Object
  
})

const headers: Header[] = [
  { text: "상품", value: "item_name" },
  { text: "내용", value: "greating_review"},
  { text: "상태", value: "result"},
  { text: "퍼센트", value: "probability"},

];

const showRow = (item: ClickRowArgument) => {
  console.log(JSON.stringify(item)) 
  
};


      


</script>