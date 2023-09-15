<template>
  <span class="app-label-header">
    <slot> </slot>
  </span>
</template>

<script>
export default {
  name: 'AppLabel'
};
</script>

<style lang="scss" scoped>
.app-label-header {
  color: #f99d1c;
  background: #f6f6f6;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  align-content: center;
  justify-content: center;
  text-align: center;
}
</style>
