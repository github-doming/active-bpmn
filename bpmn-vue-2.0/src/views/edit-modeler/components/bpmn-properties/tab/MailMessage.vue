<template>
  <div class="general-context">
    <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.subject" prop="name">
        <a-input />
      </a-form-model-item>
      <a-form-model-item :label="local.subjectSelect">
        <a-radio-group >
          <a-radio value="pboSubject">
            {{local.pboSubject}}
          </a-radio>
          <a-radio value="templateSubject">
            {{local.templateSubject}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :label="local.selectTemplate" >
        <a-select >
          <a-select-option v-for="item in mailTemplates" :key="item.name">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="local.messageBody">
        <a-textarea style="height: 100px"></a-textarea>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralMailAuto",
    props: {
      param: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {

    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      let form = {};
      return {
        local, mailTemplates: JSON.parse(localStorage.getItem('activeMailTemplates')), form,
      }
    },
    methods: {
      updateProperty(type) {
        let properties = {};
        properties[type] = this.form[type];
        this.$emit('updateGeneral', properties);
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
