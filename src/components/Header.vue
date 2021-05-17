<template>
  <div class="header">
    <slot></slot>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  background-color: #f5f5f5;
  /* height: 50px; */
  width: 100%;
  position: fixed;
  top: 0;
  justify-content: center;
}
</style>
