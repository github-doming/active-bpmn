<template>
	<div>
		<a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="名称" class='red-type'>
            <a-input placeholder="等待入库" v-model="form.name" />
          </a-form-item>

          <!--<a-form-item label="类别">
            <a-select v-model="form.type" :getPopupContainer='getPopupContainer'>
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-item>-->

          <a-form-item label="负责角色">
            <a-select v-model="form.role" :getPopupContainer='getPopupContainer'>
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
            </a-select>
          </a-form-item>

          <!--<a-form-item label="说明">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-item>-->

          <a-form-model-item :wrapper-col="{ span: 20, offset:6 }">
            <a-button @click="onSubmit">
              确认
            </a-button>
            <a-button style="margin-left: 10px;">
              取消
            </a-button>
            <a-button style="margin-left: 10px;">
              帮助
            </a-button>
          </a-form-model-item>
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
      onSubmit(){}
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
