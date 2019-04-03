<template>
    <div>
        <label v-if="label" :class="{'i-form-item-label-require':isRequired}">{{label}}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
        </div>
    </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js';
import AsyncValidator from 'async-validator';

export default {
    name:"iFormItem",
     mixins:[Emitter],
    props:{
        label:{
            type:String
        },
        prop:{
            type:String
        }
    },
    inject:['form'],
    mounted(){
        this.dispatch('iForm','on-form-item-add',this);
        this.dispatch('iForm','on-form-item-remove',this);

        this.setRule()
        this.getRule();

        this.initialValue = this.fieldValue;
    },
    data(){
        return {
            isRequired:false,
            validateState:'',
            validateMessage:''
        }
    },
    methods:{
        setRule(){
            let rules = this.getRule();
            if(rules.length){
                rules.every((rule)=>{
                    this.isRequired = rule.required;
                })
            }

            //监听到输入时，触发校验
             this.$on('on-form-change',this.onFieldChange)
              this.$on('on-form-blur',this.onFieldBlur)
        },
        getRule(){
           let formRules = this.form.rule;
           formRules = formRules ? formRules[this.prop]: [];
           return [].concat(formRules || [])
        },
         getFilteredRule (trigger) {
            const rules = this.getRule();
            
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
         validate(trigger, callback = function () {}) {
             let rule= this.getFilteredRule(trigger);
             if(!rule || rule.length === 0){
                 return true;
             }

             this.validateState = 'validating';

           
            let descriptor = {};
            descriptor[this.prop] = rule;

            const validator = new AsyncValidator(descriptor);

            let model = {};
            //拿到要校验的数据
            model[this.prop] = this.fieldValue;

            validator.validate(model, { firstFields: true },(errors) => {
            
               this.validateState = !errors ? 'success' :'error';
               this.validateMessage = errors ? errors[0].message :''
               
               callback(this.validateMessage)
            
            // validation passed
            });
         },
        onFieldBlur(){
            this.validate('blur');
        },
        onFieldChange(){
            this.validate('change')
        },
        resetFidle(){
            this.validateState = '',
            this.validateMessage = '',
            this.form.model[this.prop]=this.initialValue;
        }

    },
    computed:{
        fieldValue(){
            var value = this.form.model[this.prop];
            //拿到fillData里设置的值
            console.log("value为"+value);
            return value
        }
    }
}
</script>

<style lang="scss">
.i-form-item-label-require{
    color:red
}

.i-form-item-message{
    color:red
}
</style>
