<template>
  <div class="properties">
    <a-tabs type="card" v-model="activeTab">
      <a-tab-pane key="general" :tab="local.general">
        <general-user-task :param="param" :activity="activity"></general-user-task>
      </a-tab-pane>
      <a-tab-pane key="variable" :tab="local.variable">
        <variable :variables="variables" :globalVariables="globalVariables"></variable>
      </a-tab-pane>
      <a-tab-pane key="roleSet" :tab="local.roleSet">
        <role-set :param="param" :roleSetInfos="roleSetInfos"></role-set>
      </a-tab-pane>
      <a-tab-pane key="participant" :tab="local.participant">
        <participant :participant="participant"></participant>
      </a-tab-pane>
      <a-tab-pane key="resourceLibrary" :tab="local.resourceLibrary">
        <resource-library :roleSets="roleSetInfos"></resource-library>
      </a-tab-pane>
      <a-tab-pane key="taskListener" :tab="local.taskListener">
        <task-listener :transform="transform" :taskListeners="taskListeners"></task-listener>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

  import Variable from "./tab/Variable";
  import GeneralUserTask from "./tab/GeneralUserTask";
  import RoleSet from "./tab/RoleSet";
  import Participant from "./tab/Participant";
  import ResourceLibrary from "./tab/ResourceLibrary";
  import TaskListener from "./tab/TaskListener";
  import {BpmnComputed, BpmnMethod, BpmnTag} from "../js/BpmnHelper";

  export default {
    name: "UserTaskProperties",
    components: {GeneralUserTask, Variable, RoleSet, Participant, ResourceLibrary, TaskListener},
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
    computed: {
      activity() {
        let activities = this.extensionValues.filter(element => element['$type'] === BpmnTag.formTemplate);
        if (activities) {
          return activities[0];
        }
        return null;
      },
      variables: BpmnComputed.variables(),
      globalVariables() {
        let processKey = this.params.process.key;
        let extensionElements = this.params[processKey].extensionElements;
        if (extensionElements) {
          return extensionElements.get('values').filter(element => element['$type'] === BpmnTag.variable);
        }
        return [];
      },
      roleSetInfos() {
        return this.extensionValues.filter(element => element['$type'] === BpmnTag.roleSet);
      },
      participant() {
        let participants = this.extensionValues.filter(element => element['$type'] === BpmnTag.participant);
        if (participants) {
          return participants[0];
        }
        return {};
      },
      taskListeners() {
        return this.extensionValues.filter(element => element['$type'] === BpmnTag.taskListener);
      },
      transform() {
        const translation = {
          'taskCreate': this.local.create,
          'assignment': this.local.assignment,
          'complete': this.local.complete
        };
        this.element.outgoing.forEach(element => {
          translation[element.businessObject.id] = element.businessObject.name;
        });
        const transform = new Set();
        this.taskListeners.forEach(item => {
          let code = item.event;
          transform.add({code, name: translation[code]});
        });
        return transform;
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        param: this.params[this.element.id], extensionValues: [], activeTab: 'general',
      }
    },
    created() {
      this.extensionValues = this.getExtensionElements().get('values');
    },
    watch: {
      element(newValue) {
        this.activeTab = 'general';
        this.param = this.params[newValue.id];
        this.extensionValues = this.getExtensionElements().get('values');
      },
    },
    methods: {
      getExtensionElements: BpmnMethod.getExtensionElementsOnly(),
    }


  }
</script>

<style scoped>

</style>
