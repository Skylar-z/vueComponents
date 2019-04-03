<template>
    <div>
        <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
    </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js'

export default {
    mixins:[Emitter],
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            currentValue:this.value
        }
    },
    methods:{
        handleInput(event){
            var value = event.target.value;
            this.currentValue = value;
            //将用户的输入值传入props:value
            this.$emit('input',value)
            this.dispatch('iFormItem','on-form-change',value)
            console.log(this.currentValue);
            console.log(this.value)
        },
        handleBlur(){
            this.dispatch('iFormItem','on-form-blur',this.currentValue)
        }
    },
  /*  watch:{
        value(val){
            this.currentValue = val;
        }
    }*/
}
</script>

<style lang="scss">

</style>
