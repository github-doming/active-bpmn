<template>
	<div class="properties">
		<a-tabs type="card">
			<a-tab-pane key="general" :tab="local.general">
				<general-service-task :param="param"/>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
  import GeneralServiceTask from "./tab/GeneralServiceTask";

  export default {
    name: "ServiceTaskProperties",
    components: {GeneralServiceTask},
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
      return {local: JSON.parse(localStorage.getItem('activeLocal')), param: this.params[this.element.id]}
    },
    watch: {
      element(val) {
        this.param = this.params[val.id];
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
