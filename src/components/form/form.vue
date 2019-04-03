<template>
    <div>
        <form>
            <slot></slot>
        </form>
    </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js';

export default {
    name:'iForm',
    mixins:[Emitter],
    props:{
        model:{
            type:Object,
        },
        rule:{
            type:Object
        }
    },
    provide(){
        return{
            form :this
        }
    },
    data(){
        return{
            fields:[]
        }
    },
    created(){
        this.$on('on-form-item-add',field=>{
            this.fields.push(field);
            console.log(this.fields);
        });
    },
    beforeDestroy(){
        this.$on('on-form-item-remove',field=>{
           this.fields.splice(this.fields.indexOf(field),1)
        });

    },
    methods:{
        resetFields(){
            this.fields.forEach(field=>{
                //form里缓存了form-item实例，所以可以直接拿里面的方法
                field.resetField()
            })
        },

        validate(callback){
            return new Promise(resolve=>
            {
                let valid = true;
                let count = 0;
                this.fields.forEach(field =>{
                    field.validate('',errors=>{
                        if(errors){
                            valid = false
                        }
                        if(++count === this.fields.length){
                            resolve(valid);
                            if(typeof callback === 'function'){
                                console.log('aaa')
                                callback(valid);
                            }
                        }
                    })
                })
            })
        }
    }
}
</script>

<style lang="scss">

</style>
