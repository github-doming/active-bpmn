<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-inclusive-gateway :threshold="threshold"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import { BpmnMethod, BpmnTag} from "../js/BpmnHelper";
  import GeneralInclusiveGateway from "./tab/GeneralInclusiveGateway";

  export default {
    name: "InclusiveGatewayProperties",
    components: {GeneralInclusiveGateway},
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
      threshold() {
        let thresholds = this.extensionValues.filter(element => element['$type'] === BpmnTag.threshold);
        if (thresholds.length > 0) {
          return thresholds[0];
        }
        return {};
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        param: this.params[this.element.id], extensionValues: [],
      }
    },
    created() {
      this.extensionValues = this.getExtensionElements().get('values');
    },
    methods: {
      getExtensionElements: BpmnMethod.getExtensionElementsOnly(),
    },
  }
</script>

<style scoped>
  .properties {
    padding: 8px 12px;
    margin: 2px 3px;
  }
</style>
