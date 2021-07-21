<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-timer-event v-show="showTimerEvent" :timerEvent="timerEvent()"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import GeneralTimerEvent from "./tab/GeneralTimerEvent";
  import BpmnElemet from "../js/BpmnElement";

  export default {
    name: "IntermediateCatchEventProperties",
    components: {GeneralTimerEvent},
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
        param: this.params[this.element.id],
      }
    },

    watch: {
      element(val) {
        this.param = this.params[val.id];
      },
    },
    computed: {
      showTimerEvent() {
        return this.param.eventDefinitions[0]['$type'] === 'bpmn:TimerEventDefinition';
      }
    },
    methods: {
      timerEvent() {
        let timerEventDefinition = this.param.eventDefinitions[0];
        if (timerEventDefinition.timeDuration) {
          return timerEventDefinition;
        }
        timerEventDefinition.timeDuration =
            BpmnElemet.createElement('bpmn:Expression', null, timerEventDefinition, this.modeler.get('bpmnFactory'));
        return timerEventDefinition;
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
