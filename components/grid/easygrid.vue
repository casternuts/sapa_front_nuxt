<template>
    <EasyDataTable
    :headers="headers"
    :items="analysis.getItemData"
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
  { text: "상품코드", value: "itemcode" },
  { text: "상품명", value: "itemname"},
  { text: "연관이유", value: "reason"},

];

const showRow = (item: ClickRowArgument) => {
  console.log(JSON.stringify(item)) 
  let itemName :String=item.itemname;
  analysis.searchReviewSelectGrid(itemName);
};


      


</script>