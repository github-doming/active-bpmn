<template>
  <div class="general-context">
    <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz" prop="class">
        <a-input :placeholder="local.enterClass" v-model="form.class" @change="updateAttrs('class')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.isAsync" prop="async">
        <a-switch v-model="form.async" @change="updateAttrs('async')"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  const propertiesMap = {class: 'activiti:class', async: 'activiti:async'};
  const propertiesType = ['name'];
  export default {
    name: "GeneralServiceTask",
    props: {
      param: {
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
        local, form, rules: {
          name: [{required: true, message: local.enterName, trigger: 'blur'}],
          class: [{required: true, message: local.enterClass, trigger: 'blur'}],
        }
      }
    },
    methods: {
      updateProperty(type) {
        this.$set(this.param, type, this.form[type]);
        let temp = {};
        temp[type] = this.form[type];
        this.$emit('updateGeneral', temp);
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
