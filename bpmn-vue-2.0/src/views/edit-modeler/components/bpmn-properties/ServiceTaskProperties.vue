<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-service-task-status-auto v-if="statusAuto" :field="field()" @updateGeneral="updateGeneral"/>
        <general-service-task v-else :param="param" @updateGeneral="updateGeneral"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {BpmnConfig, BpmnFunction, BpmnMethod, BpmnTag} from "../js/BpmnHelper";
  import GeneralServiceTask from "./tab/GeneralServiceTask";
  import GeneralServiceTaskStatusAuto from "./tab/GeneralServiceTaskStatusAuto";

  export default {
    name: "ServiceTaskProperties",
    components: {GeneralServiceTaskStatusAuto, GeneralServiceTask},
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
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        extensionValues: [],
        param: this.params[this.element.id]
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
    },
    created() {
      this.extensionValues = this.getExtensionElements().get('values');
    },
    methods: {
      updateGeneral: BpmnMethod.updateGeneral(),
      getExtensionElements: BpmnMethod.getExtensionElements(),
      field() {
        if (!this.statusAuto) {
          return null;
        }
        let fields = this.extensionValues.filter(element => element['$type'] === BpmnTag.field);
        if (fields.length > 0) {
          return fields[0];
        }
        let elementTag = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.field);
        elementTag.name = 'stateKey';
        this.extensionValues.push(elementTag);
        return elementTag;
      },
    },
  }
</script>

<style scoped>
  .properties {
    padding: 8px 12px;
    margin: 2px 3px;
  }
</style>
