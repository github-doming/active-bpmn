<template>
  <div class="general-context">
    <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
      </a-form-model-item>
      <a-form-model-item label="任务类型" prop="type">
        <a-select v-model="form.type" placeholder="请选择任务类型" @change="updateAttrs('type')">
          <a-select-option key="class">类</a-select-option>
          <a-select-option key="setState">设置状态</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz" prop="class" v-if="true">
        <a-input :placeholder="local.enterClass" v-model="form.class" @change="updateAttrs('class')"/>
      </a-form-model-item>


    </a-form-model>
  </div>
</template>

<script>

  const propertiesMap = {type: 'activiti:type', class: 'activiti:class'};
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
        local, form,
        rules: {
          name: [{required: true, message: local.enterName, trigger: 'blur'}],
          type: [{required: true, message: '请选择任务类型', trigger: 'blur'}],
          class: [{required: true, message: local.enterClass, trigger: 'blur'}],
        }
      }
    },
    methods: {
      updateProperty(type) {
        let val = this.form[type];
        this.$set(this.param, type, val);
        this.$emit('updateGeneral',{type,val});

      },
      updateAttrs(type) {
        this.$set(this.param.$attrs, propertiesMap[type], this.form[type]);
      },
      mapping(form, param) {
        Object.keys(propertiesMap).forEach(key => form[key] = param.$attrs[propertiesMap[key]]);
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
