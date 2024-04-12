<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.subProcessTemplate" prop="subProcessTemplate">
        <a-select v-model="field.string" :open="false">
          <a-select-option v-for="item in template" :key="item.name"> {{item.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralServiceTaskSubProcess",
    props: {
      field: {
        type: Object,
        default: () => ({})
      },
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      const template = JSON.parse(localStorage.getItem('subProcesses'));
      const templateName = {};
      template.forEach(item => {
        templateName[item.name] = item.name;
      });
      return {
        local, template, templateName: templateName,
      }
    },
    methods: {
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
