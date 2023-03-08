<template>
  <div class="general-context">
    <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.taskFormTemplate" prop="taskFormTemplate">
        <a-select v-model="activity.taskFormTemplate" :placeholder="local.selectTemplate" :allow-clear="true">
          <a-select-option v-for="item in template" :key="item">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="local.signingRequired" prop="signingRequired">
        <a-switch v-model="activity.signingRequired"/>
      </a-form-model-item>
      <a-form-model-item :label="local.isSendNotification" prop="isSendNotification">
        <a-switch v-model="activity.isSendNotification"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  const propertiesType = ['name'];
  const propertiesMap = {async: 'activiti:async'};
  export default {
    name: "GeneralUserTask",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
      activity: {
        type: Object,
        default: () => ({})
      },
    },
    watch: {
      param(newValue) {
        this.mapping(this.form, newValue);
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      let form = {};
      this.mapping(form, this.param);
      return {
        local, template: JSON.parse(localStorage.getItem('activeTemplate')), form,
        rules: {
          name: [
            {required: true, message: local.enterName, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      updateProperty(type) {
        let properties = {};
        properties[type] = this.form[type];
        this.$emit('updateGeneral', properties);
      },
      updateAttrs(type) {
        this.$set(this.param.$attrs, propertiesMap[type], this.form[type]);
      },
      mapping(form, param) {
        Object.keys(propertiesMap).forEach(key => form[key] = param.$attrs[propertiesMap[key]] === 'true' ||
            (param.$attrs[propertiesMap[key]] === 'false' ? false : param.$attrs[propertiesMap[key]]));
        propertiesType.forEach(type => form[type] = param[type]);
      },
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
