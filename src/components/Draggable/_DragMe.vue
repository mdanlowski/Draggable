<template lang="pug">
.draggable_wrapper(:draggable="nativeDrag")
  slot
</template>

<script>
export default {
  props: {
    nativeDrag: { type: Boolean, default: false } // @customize
  },
  data(){
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.draggable_wrapper {


  &:hover {
    border: 1px solid red;

    &::before {
      content: "≡"; // @customize
      color: red;
      position: relative;
      display: block;
      text-align: left;
      width: 100%;
      padding-left: 4px;
    }
  }
}
</style>