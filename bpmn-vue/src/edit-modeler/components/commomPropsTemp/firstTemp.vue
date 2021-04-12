<template>
	<div>
    <a-form-model ref="ruleForm"  :rules="rules" :model="form[0]" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      	<a-form-model-item label="名称" prop="name">
          <a-input placeholder="输入名称" v-model="form[0].name" @change="updateProperty" />
        </a-form-model-item>
    </a-form-model>
	</div>
</template>
<script>
	export default {
    props: ["userTaskName"],
    mounted(){
       // this.form[0].name = this.userTaskName;
    },
    data () {
      return {
        form: [{name: this.userTaskName}],
        rules:{
      		name:[
      			{required: true, message: '请输入名称', trigger: 'blur'}
      		]
      	}
      }
		},
    methods: {
      getPopupContainer(triggerNode){
        return triggerNode.parentNode;
      },
      updateProperty () {
        this.$emit('updateProperty',this.form);
      },
    },
	}
</script>
<style scoped>
.red-type::before {
  content: '*';
  position: absolute;
  font-size:14px;
  color: red;
  left: 10px;
  top: 12px;
}
textarea.ant-input{
  min-height: 140px;
}
</style>
