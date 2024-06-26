<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-exclusive-gateway :param="param" :expression = "classExpression()"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import GeneralExclusiveGateway from "./tab/GeneralExclusiveGateway";
import {BpmnFunction, BpmnMethod, BpmnTag} from "@/views/edit-modeler/components/js/BpmnHelper";

export default {
  name: "ExclusiveGatewayProperties",
  components: {GeneralExclusiveGateway},
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
      param: this.params[this.element.id], extensionValues: [],
    }
  },
  created() {
    this.extensionValues = this.getExtensionElements().get('values');
  },
  watch: {
    element(val) {
      this.param = this.params[val.id];
      this.extensionValues = this.getExtensionElements().get('values');
    },
  },
  computed: {

  },
  methods: {
    getExtensionElements: BpmnMethod.getExtensionElements(),
    classExpression() {
      let classExpression = this.extensionValues.filter(element => element['$type'] === BpmnTag.expression);
      if (classExpression.length > 0) {
        return classExpression[0];
      }
    }
  },
}
</script>

<style scoped>
.properties {
  padding: 8px 12px;
  margin: 2px 3px;
}
</style>
