<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <slot name="title"></slot>
  </button>
</template>


<style lang="scss">
.i-button-sizesmall{
    width: 50px;
    height: 50px;
    background-color: green
}    

.i-button-sizelarge{
    width: 100px;
    height: 100px;
    background-color: goldenrod
}

.i-button-sizedefault{
    width: 200px;
    height: 100px;
    background-color: grey;
}
</style>


<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  export default {
    props: {
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>