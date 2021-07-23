<template>
  <div class="general-context">
    <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name">
        <a-input v-model="form.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz" prop="class">
        <a-input v-model="form.class" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.isAsync" prop="async">
        <a-switch :checked="form.async"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
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
        this.form.name = newValue.name;
        this.form['activiti:class'] = newValue.$attrs['activiti:class'];
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        form: {
          name: this.param.name,
          class: this.param.$attrs['activiti:class'],
          'async': Boolean(this.param.$attrs['activiti:async'])
        },
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
