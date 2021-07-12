<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.specificState" prop="specificState">
        <a-select v-model="field.value" :open="false">
          <a-select-option v-for="item in template" :key="item"> {{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralServiceTaskStatusAuto",
    props: {
      field: {
        type: Object,
        default: () => ({})
      },
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      const template = JSON.parse(localStorage.getItem('activeStatus'));
      return {
        local, template,
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
