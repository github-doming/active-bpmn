<template>
	<div>
		<a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="活动">
            <a-select v-model="form.active" :getPopupContainer='getPopupContainer'>
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="要求">
            <a-checkbox-group v-model="form.ask">
              <a-checkbox value="1" name="type">
                要求签名
              </a-checkbox>
              <a-checkbox value="2" name="type">
                发送通知
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item label="呈现为">
            <a-select v-model="form.show" :getPopupContainer='getPopupContainer'>
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="模版名称">
            <a-select v-model="form.temp" :getPopupContainer='getPopupContainer'>
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="指示">
            <a-input v-model="form.indicate" type="textarea" style='height:100px;' />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 20, offset:2 }">
            <a-button type="primary" @click="onSubmit">
              生成HTML
            </a-button>
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