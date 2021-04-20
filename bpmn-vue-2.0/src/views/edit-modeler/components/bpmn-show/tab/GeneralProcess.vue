<template>
  <div class="general-context">
    <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name">
        <a-input v-model="form.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.description">
        <a-input v-model="form.description" read-only/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  const propertiesType = ['name', 'description'];
  export default {
    name: "GeneralProcess",
    props: {
      param: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      param(newValue) {
        const that = this;
        propertiesType.forEach(type => that.form[type] = newValue[type]);
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, form: {name: this.param.name, description: this.param.description},
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
