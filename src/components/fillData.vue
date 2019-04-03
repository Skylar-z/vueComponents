<template>
    <div>
        <i-form :model="validate" :rule="ruleValidate" ref="form">
            <i-form-item label="用户名" prop="name">
                <i-input v-model="validate.name"></i-input>
            </i-form-item>

            <i-form-item label="邮箱" prop="mail">
                <i-input v-model="validate.mail"></i-input>
            </i-form-item>
        </i-form>

        <button @click= "handleSubmit">提交</button>
    </div>
</template>

<script>
import iForm from '../components/form/form'
import iFormItem from '../components/form/form-item'
import iInput from '../components/list/input'

export default {
    data(){
        return{
            validate:{
                name:'',
                mail:''
            },
            ruleValidate:{
              name: [{ required: true, trigger:'blur',message:'用户名不能为空'} ],
              mail:[{ required: true, trigger:'blur',message:'邮箱不能为空'},
              {type: "email", trigger:'blur',message:'邮箱格式错误'}  ]
            }
        }
    },
    components:{iForm,iFormItem,iInput},
    methods:{
        handleSubmit(){
            this.$refs.form.validate((valid) =>{
                console.log(valid)
                if(valid){
                    window.alert('提交成功')
                }else{
                    window.alert('校验失败')
                }
            })
        }
    }    
}
</script>

<style lang="scss">

</style>
