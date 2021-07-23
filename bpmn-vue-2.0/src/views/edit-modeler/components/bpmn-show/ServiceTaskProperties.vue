<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-service-task v-show="!statusAuto" :param="param"/>
        <general-service-task-status-auto v-show="statusAuto" :field="field"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import GeneralServiceTask from "./tab/GeneralServiceTask";
  import GeneralServiceTaskStatusAuto from "./tab/GeneralServiceTaskStatusAuto";
  import {BpmnConfig,  BpmnMethod, BpmnTag} from "../js/BpmnHelper";

  export default {
    name: "ServiceTaskProperties",
    components: {GeneralServiceTask,GeneralServiceTaskStatusAuto},
    props: {
      modeler: {
        type: Object,
        default: () => ({})
      }, params: {
        type: Object,
        default: () => ({})
      }, element: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      element(val) {
        this.param = this.params[val.id];
        this.extensionValues = this.getExtensionElements().get('values');
      },
    },
    computed: {
      statusAuto() {
        return this.element.businessObject.$attrs['activiti:class'] === BpmnConfig.statusAutoClass;
      },
      field() {
        let fields = this.extensionValues.filter(element => element['$type'] === BpmnTag.field);
        if (fields.length > 0) {
          return fields[0];
        }
        return {};
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        param: this.params[this.element.id],
        extensionValues: [],
      }
    },
    created() {
      if (this.getExtensionElements()) {
        this.extensionValues = this.getExtensionElements().get('values');
      } else {
        this.extensionValues = [];
      }
    },
    methods: {
      getExtensionElements: BpmnMethod.getExtensionElementsOnly(),
    }
  }
</script>

<style scoped>
  .properties {
    padding: 8px 12px;
    margin: 2px 3px;
  }
</style>
