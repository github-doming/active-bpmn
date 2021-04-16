<template>
	<div class="properties">
		<a-tabs type="card" v-model="activeTab">
			<a-tab-pane key="general" :tab="local.general">
				<general-user-task :param="param" :activity="activity()" @updateGeneral="updateGeneral"></general-user-task>
			</a-tab-pane>
			<a-tab-pane key="variable" :tab="local.variable">
				<variable :variables="variables" :globalVariables="globalVariables" @updateVariable="updateVariable"></variable>
			</a-tab-pane>
			<a-tab-pane key="roleSet" :tab="local.roleSet">
				<role-set :param="param" :roleSetInfos="roleSetInfos"></role-set>
			</a-tab-pane>
			<a-tab-pane key="participant" :tab="local.participant">
				<participant :participant="participant()" @updateParticipant="updateParticipant"></participant>
			</a-tab-pane>
			<a-tab-pane key="resourceLibrary" :tab="local.resourceLibrary">
				<resource-library :roleSets="roleSetInfos" @updateRepository="updateRepository"></resource-library>
			</a-tab-pane>
			<a-tab-pane key="taskListener" :tab="local.taskListener">
				<task-listener :transform="transform" :taskListeners="taskListeners"
											 @updateTaskListener="updateTaskListener"></task-listener>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
  import {BpmnComputed, BpmnFunction, BpmnMethod, BpmnTag} from "../../js/new/BpmnHelper";

  import Variable from "./tab/Variable";
  import RoleSet from "./tab/RoleSet";
  import Participant from "./tab/Participant";
  import ResourceLibrary from "./tab/ResourceLibrary";
  import TaskListener from "./tab/TaskListener";
  import GeneralUserTask from "./tab/GeneralUserTask";

  export default {
    name: "UserTaskProperties",
    components: {GeneralUserTask, TaskListener, ResourceLibrary, Participant, RoleSet, Variable},
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
      transform() {
        let transform = [{code: 'taskCreate', name: this.local.create}, {code: 'assignment', name: this.local.assignment},
          {code: 'complete', name: this.local.complete},];
        this.element.outgoing.forEach(element => {
          transform.push({code: element.businessObject.id, name: element.businessObject.name});
        });
        return transform;
      },
      taskListeners() {
        return this.extensionValues.filter(element => element['$type'] === BpmnTag.taskListener);
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
      getExtensionElements: BpmnMethod.getExtensionElements(),
      participant() {
        let participant;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.participant) {
            participant = this.extensionValues[i];
            break;
          }
        }
        if (!participant) {
          participant = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.participant);
          this.extensionValues.push(participant);
          let tagElement = BpmnFunction.createElementTag(this.modeler, participant, BpmnTag.role);
          participant.roles = [tagElement];
          Object.assign(tagElement, {
            'id': 'item.id', 'name': '操作者', 'roleCode': 'item.roleCode',
          	'hover': false, 'type': 'role', 'need': 'NO', 'number': ''
          });
          const rolesOption = [{'name': '操作者', 'id': 'item.id', 'code': 'item.roleCode'}];
          this.editRoleSet4Role(rolesOption, 'add');
        }
        return participant;
      },
      activity() {
        let activity;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.activity) {
            activity = this.extensionValues[i];
            break;
          }
        }
        if (!activity) {
          activity = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.activity);
          this.extensionValues.push(activity);
        }
        return activity;
      },
      updateGeneral: BpmnMethod.updateGeneral(),
      updateVariable: BpmnMethod.updateVariable(),
      updateParticipant(type, participant, participantKey, participantData) {
        const that = this;
        const rolesOption = [];
        if ('add' === type) {
          participantData.forEach(item => {
            let tagElement = BpmnFunction.createElementTag(that.modeler, participant, BpmnTag.getParticipant(participantKey));
            Object.assign(tagElement, {
              'hover': false, 'type': BpmnTag.getParticipantType(participantKey), 'id': item.id, 'name': item.name
            });
            if (participantKey === 'assigns') {
              Object.assign(tagElement, {'userName': item.userName,});
            } else if (participantKey === 'groups') {
              Object.assign(tagElement, {'need': 'NO', 'number': ''});
            } else if (participantKey === 'roles') {
              Object.assign(tagElement, {'need': 'NO', 'number': '', 'roleCode': item.roleCode});
              rolesOption.push({'name': item.name, 'id': item.id, 'code': item.roleCode})
            }
            participant[participantKey].push(tagElement);
          });
        } else if ('remove' === type) {
          if (participantKey === 'roles') {
            participantData.forEach(item => {
              rolesOption.push(item.id);
            });
          }
        }
        if (rolesOption.length > 0) {
          this.editRoleSet4Role(rolesOption, type);
        }

      },
      updateRepository(roleSet, repositoryData) {
        const that = this;
        repositoryData.forEach(item => {
          let tagElement = BpmnFunction.createElementTag(that.modeler, roleSet, BpmnTag.repository);
          Object.assign(tagElement, {'id': item.id, 'name': item.name, 'type': item.type});
          roleSet.repositories.push(tagElement);
        });
      },
      updateTaskListener(type, listenerData) {
        if ('add' === type) {
          let tagElement = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.taskListener);
          for (let key in listenerData) {
            if (listenerData.hasOwnProperty(key)) {
              tagElement[key] = listenerData[key];
            }
          }
          this.extensionValues.push(tagElement);
        } else if ('remove' === type) {
          for (let i = 0; i < this.extensionValues.length; i++) {
            let value = this.extensionValues[i];
            if (value['$type'] === BpmnTag.taskListener && value.event === listenerData.event) {
              if ((listenerData.typeKey === 'class' && value.class === listenerData.value) || (listenerData.typeKey === 'field' && value.field === listenerData.value)) {
                this.extensionValues.splice(i, 1);
                return;
              }
            }
          }
        }
      },
      editRoleSet4Role(rolesOption, type) {
        const that = this;
        if ('add' === type) {
          let roleSet;
          Object.keys(this.params).forEach(key => {
            let extensionElements = that.params[key].extensionElements;
            if (key === that.element.id || !extensionElements || that.params[key]['$type'] !== 'bpmn:UserTask') {
              return;
            }
            rolesOption.forEach(item => {
              roleSet = BpmnFunction.createElementTag(that.modeler, extensionElements, BpmnTag.roleSet);
              Object.assign(roleSet, {view: false, add: false, remove: false, sourceRef: that.element.id});
              Object.assign(roleSet, {...item, repositories: []});
              extensionElements.get('values').push(roleSet);
            });
          });
        } else {
          Object.keys(this.params).forEach(key => {
            if (that.params[key].extensionElements) {
              let extensionValues = that.params[key].extensionElements.get('values');
              for (let i = 0; i < extensionValues.length; i++) {
                if (extensionValues[i]['$type'] === BpmnTag.roleSet && rolesOption.indexOf(extensionValues[i].id) !== -1) {
                  extensionValues.splice(i, 1);
                  i = 0;
                }
              }
            }
          });
        }
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
