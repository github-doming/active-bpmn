<template>
  <div class="general-context">
    <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input v-model="form.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.taskFormTemplate">
        <a-select v-model="activity.taskFormTemplate" :open="false">
          <a-select-option v-for="item in template" :key="item">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="local.signingRequired">
        <a-switch :checked="activity.signingRequired"/>
      </a-form-model-item>
      <a-form-model-item :label="local.isSendNotification" prop="isSendNotification">
        <a-switch :checked="activity.isSendNotification"/>
      </a-form-model-item>
      <a-form-model-item :label="local.taskGuide" prop="taskGuide">
        <a-textarea
                v-model="activity.taskGuide"
                :auto-size="{ minRows: 5, maxRows: 7 }"
                read-only
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralUserTask",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
      activity: {
        type: Object,
        default: () => ({})
      },
    },
    watch: {
      param(newValue) {
        console.log(newValue);
        this.form.name = newValue.name;
        this.form.async = newValue.$attrs['activiti:async'];
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        template: JSON.parse(localStorage.getItem('activeTemplate')),
        form: {name: this.param.name, 'async': Boolean(this.param.$attrs['activiti:async'])},

      }
    },

  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
