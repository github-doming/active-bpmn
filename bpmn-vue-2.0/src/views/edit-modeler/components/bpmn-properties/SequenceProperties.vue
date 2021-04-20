<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-sequence :param="param" @updateGeneral="updateGeneral"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import GeneralSequence from "./tab/GeneralSequence";
  import {BpmnFunction} from "../../js/new/BpmnHelper";

  export default {
    name: "SequenceProperties",
    components: {GeneralSequence},
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
        this.param = this.params[val.id]
      },
    },
    methods: {
      updateGeneral(newVal) {
        this.modeler.get('modeling').updateProperties(this.element, newVal);
        if (!newVal.name) {
          BpmnFunction.deleteTaskListener(this.params, this.element.id);
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
