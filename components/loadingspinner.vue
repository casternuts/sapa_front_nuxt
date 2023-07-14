<template>
  <div id="loading" v-if="(isLoading==null)?false:isLoading">
    <div class="spinner">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       
        <circle cx="12" cy="12" r="3"/><g class="spinner_HIK5"><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/></g></svg></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: Boolean

})

</script>

<style>
.spinner_HIK5{
  transform-origin:center;
  animation:spinner_XVY9 1s cubic-bezier(0.36,.6,.31,1) infinite;
  
}
  @keyframes spinner_XVY9{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}
#loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner {
  position:absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
 
 
  top:50%;
  left:50%;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>