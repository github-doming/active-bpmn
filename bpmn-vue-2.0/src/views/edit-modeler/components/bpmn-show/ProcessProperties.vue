<template>
	<div class="properties">
		<a-tabs type="card">
			<a-tab-pane key="general" :tab="local.general">
				<general-process :param="param"/>
			</a-tab-pane>
			<a-tab-pane key="globalVariable" :tab="local.globalVariable">
				<variable :variables="variables"/>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>

  import GeneralProcess from "./tab/GeneralProcess";
  import Variable from "./tab/Variable";

  import {BpmnComputed, BpmnMethod} from "../js/BpmnHelper";

  export default {
    name: "ProcessProperties",
    components: {Variable, GeneralProcess},
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
        param: this.params[this.element.id], extensionValues: []
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
      variables: BpmnComputed.variables(),
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
