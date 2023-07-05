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
  { text: "code", value: "code" },
  { text: "itemname", value: "itemname"},

];

const showRow = (item: ClickRowArgument) => {
  console.log(JSON.stringify(item)) 
};


      


</script>