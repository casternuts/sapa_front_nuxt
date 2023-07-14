<template>
  
  <EasyDataTable
  buttons-pagination
  :headers="headers"
  :items="analysis.getReviewSelectData"
  :body-row-class-name="bodyRowClassNameFunction"

  @click-row="showRow"
/>

</template>

<script lang="ts" setup>
import EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item, BodyRowClassNameFunction, ClickRowArgument  } from "vue3-easy-data-table";
import 'vue3-easy-data-table/dist/style.css';

import { useAnalysis } from '~/stores/analysis'
const analysis = useAnalysis();
defineProps({
rows: Object

})

const headers: Header[] = [
{ text: "상품", value: "item_name" ,fixed: true, width: 90},
{ text: "내용", value: "greating_review",fixed: true, width: 350},
{ text: "상태", value: "result",fixed: true, width: 50},
{ text: "퍼센트", value: "probability"},

];

const showRow = (item: ClickRowArgument) => {
console.log(JSON.stringify(item)) 

};
const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
console.log(item)
if (item.result ==="부정") return 'bad-row';
else if (item.result ==="중립") return 'mid-row';
return 'good-row';
};

</script>

<style>
.bad-row  {
--easy-table-body-row-background-color: #f56c6c;
--easy-table-body-row-font-color: #fff;
}
.good-row  {
--easy-table-body-row-background-color: #67c23a;
--easy-table-body-row-font-color: #fff;
}
.mid-row  {
--easy-table-body-row-background-color: #f79b60;
--easy-table-body-row-font-color: #fff;
}
</style>