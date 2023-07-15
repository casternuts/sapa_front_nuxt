<template>
  <div class="modal" v-if="analysis.popupOpen">
 
    <div class="text-lg  content text-gray-700 dark:text-gray-100" v-html="analysis.getInsight">
    </div>
 
    <div class="close"  @click="analysis.openPopup(false)">
      <button><img src="/assets/gem/Close_icon-icons.com.png" style="width:40px;"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAnalysis } from '~/stores/analysis'
const analysis = useAnalysis();


</script>



<style>
.modal {  
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal .content {
  margin: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal .close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
