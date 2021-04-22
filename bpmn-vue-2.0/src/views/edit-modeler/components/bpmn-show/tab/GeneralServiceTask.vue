<template>
  <div class="general-context">
    <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name">
        <a-input v-model="form.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz" prop="class">
        <a-input v-model="form['activiti:class']" read-only/>
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
      console.log(this.param);
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        form: {name: this.param.name, 'activiti:class': this.param.$attrs['activiti:class']},
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
