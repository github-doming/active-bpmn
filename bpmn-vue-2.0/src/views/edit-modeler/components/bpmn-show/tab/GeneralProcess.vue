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
        this.form.name = newValue.name;
        this.form.description = newValue.$attrs.description;
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        form: {name: this.param.name, description: this.param.$attrs.description},
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
