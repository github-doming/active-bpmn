<template>
  <div class="properties">
    <general-service-task-mail-auto v-if="mailAuto" :params="params" :param="param" :element="element" :mailRecipient="mailRecipient()"
                                    :mailGeneral="mailGeneral()" :mailMessage="mailMessage()" :mailAttachment="mailAttachment()"/>
    <general-service-task-sub-process v-else-if="subProcessAuto" :field="subProcessField"/>
    <general-service-task-synch-robot v-else-if="synchRobotAuto" :param="param" :expression = "classExpression()" />
    <ground v-else-if="ground" :param="param"/>
    <a-tabs type="card" v-else>
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
  import GeneralServiceTaskMailAuto from "./tab/GeneralServiceTaskMailAuto";
  import {BpmnConfig, BpmnFunction, BpmnMethod, BpmnTag} from "../js/BpmnHelper";
  import GeneralServiceTaskSubProcess from "./tab/GeneralServiceTaskSubProcess.vue";
  import GeneralServiceTaskSynchRobot from "./tab/GeneralServiceTaskSynchRobot.vue";
  import Ground from "./tab/Ground.vue";


  export default {
    name: "ServiceTaskProperties",
    components: {
      GeneralServiceTaskSynchRobot,
      GeneralServiceTaskSubProcess,
      GeneralServiceTask,GeneralServiceTaskStatusAuto,GeneralServiceTaskMailAuto,Ground},
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
      mailAuto() {
        return this.element.businessObject.$attrs['activiti:type'] === BpmnConfig.mailAutoType;
      },
      subProcessAuto(){
        return this.element.businessObject.$attrs['activiti:class'] === BpmnConfig.subProcessAutoClass;
      },
      synchRobotAuto(){
        return this.element.businessObject.$attrs['activiti:type'] === BpmnConfig.synchRobotType;
      },
      ground(){
        return this.element.businessObject.$attrs['activiti:type'] === BpmnConfig.ground;
      },
      field() {
        let fields = this.extensionValues.filter(element => element['$type'] === BpmnTag.field);
        if (fields.length > 0) {
          return fields[0];
        }
        return {};
      },
      subProcessField() {
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
      mailGeneral() {
        let general;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.responsibleRole) {
            general = this.extensionValues[i];
            break;
          }
        }
        return general;
      },
      mailRecipient() {
        let participant;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.recipient) {
            participant = this.extensionValues[i];
            break;
          }
        }
        return participant;
      },
      mailMessage() {
        let message;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.message) {
            message = this.extensionValues[i];
            break;
          }
        }
        return message;
      },
      mailAttachment() {
        let attachment;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.attachment) {
            attachment = this.extensionValues[i];
            break;
          }
        }
        return attachment;
      },
      classExpression() {
        let classExpression = this.extensionValues.filter(element => element['$type'] === BpmnTag.expression);
        if (classExpression.length > 0) {
          return classExpression[0];
        }
      }
    }
  }
</script>

<style scoped>

  .properties {
    padding: 8px 12px;
    margin: 2px 3px;
  }
</style>
