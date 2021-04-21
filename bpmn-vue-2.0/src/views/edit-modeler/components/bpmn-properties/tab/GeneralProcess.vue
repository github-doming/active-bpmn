<template>
  <div class="general-context">
    <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.description">
        <a-input :placeholder="local.enterDescription" v-model="form.description" @change="updateAttrs('description')"/>
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
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, form: {name: this.param.name, description: this.param.$attrs.description},
        rules: {name: [{required: true, message: local.enterName, trigger: 'blur'}]}
      }
    },
    methods: {
      updateProperty(type) {
        this.$set(this.param, type, this.form[type]);
        this.$emit('updateGeneral', this.form);

      },
      updateAttrs(type) {
        this.$set(this.param.$attrs, type, this.form[type]);
      },
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
