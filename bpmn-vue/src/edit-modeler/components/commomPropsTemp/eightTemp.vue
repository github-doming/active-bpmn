<template>
	<div>
		<a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="执行属性">
            <a-checkbox-group v-model="form.property" class='box-block'>
              <a-checkbox value="1" name="property">如果出错，通知负责角色</a-checkbox>
              <a-checkbox value="2" name="property">如果有错误，则中止</a-checkbox>
              <a-checkbox value="3" name="property">记录变量的更改</a-checkbox>
              <a-checkbox value="4" name="property">记录投票</a-checkbox>
              <a-checkbox value="5" name="property">中止时通知负责角色</a-checkbox>
              <a-checkbox value="6" name="property">中止时，中止父进程（如果有的话）</a-checkbox>
              <a-checkbox value="7" name="property">记录任务的重新分配</a-checkbox>
              <a-checkbox value="8" name="property">忽略未解析的角色</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 20, offset:2 }">
            <a-button @click="onSubmit" style="margin-left: 10px;">
              确认
            </a-button>
            <a-button style="margin-left: 10px;">
              取消
            </a-button>
            <a-button style="margin-left: 10px;">
              帮助
            </a-button>
          </a-form-item>
         </a-form>
	</div>
</template>
<script>
	export default {
		props: ['form'],
    methods: {
      getPopupContainer(triggerNode){
        return triggerNode.parentNode;
      },
      onSubmit(){
        
      }
    },
	}
</script>
<style scoped>
.box-block .ant-checkbox-wrapper{
  display: block;
  text-align: left;
  margin-left: 0;
  margin-bottom: 5px;
}
</style>
