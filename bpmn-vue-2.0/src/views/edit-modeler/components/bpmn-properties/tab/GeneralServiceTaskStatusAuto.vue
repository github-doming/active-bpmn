<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.specificState" prop="specificState">
        <a-select v-model="field.string" @change="updateProperty">
          <a-select-option v-for="item in template" :key="item.code"> {{item.name}}</a-select-option>
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
      const status = {};
      template.forEach(item => {
        status[item.code] = item.name;
      });
      return {
        local, template, status,
      }
    },
    methods: {
      updateProperty() {
        const form = {name: this.status[this.field.string]};
        this.$emit('updateGeneral', form);
      },
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
