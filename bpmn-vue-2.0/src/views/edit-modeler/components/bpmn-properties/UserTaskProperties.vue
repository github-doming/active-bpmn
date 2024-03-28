<template>
  <div class="properties">
    <a-tabs type="card" v-model="activeTab">
      <a-tab-pane key="general" :tab="local.general">
        <general-user-task :param="param" :activity="activity()" @updateGeneral="updateGeneral"/>
      </a-tab-pane>
      <a-tab-pane key="variable" :tab="local.variable">
        <variable :variables="variables" :globalVariables="globalVariables" @updateVariable="updateVariable"/>
      </a-tab-pane>
      <a-tab-pane key="roleSet" :tab="local.roleSet">
        <role-set :param="param" :roleSetInfos="roleSetInfos" @moveUpdateRoleSet="moveUpdateRoleSet"/>
      </a-tab-pane>
      <a-tab-pane key="participant" :tab="local.participant">
        <participant :participant="participant()" @updateParticipant="updateParticipant"/>
      </a-tab-pane>
      <a-tab-pane key="deadLine" :tab="local.deadLine" >
        <dead-line :deadLineNode="deadLineNode()" :voteSelect="voteSelect()" @updateDeadLine = "updateDeadLine" @updateMarkCompleteVote = "updateMarkCompleteVote"/>
      </a-tab-pane>
      <a-tab-pane key="resourceLibrary" :tab="local.resourceLibrary">
        <resource-library :roleSets="roleSetInfos" @updateRepository="updateRepository"/>
      </a-tab-pane>
      <a-tab-pane key="taskListener" :tab="local.taskListener">
        <task-listener :transform="transform" :taskListeners="taskListeners" @updateTaskListener="updateTaskListener"/>
      </a-tab-pane>
      <a-tab-pane key="voteSelect" :tab="local.vote">
        <vote-select :voteSelect="voteSelect()"/>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
  import {BpmnComputed, BpmnFunction, BpmnMethod, BpmnTag} from "../js/BpmnHelper";

  import Variable from "./tab/Variable";
  import RoleSet from "./tab/RoleSet";
  import Participant from "./tab/Participant";
  import ResourceLibrary from "./tab/ResourceLibrary";
  import TaskListener from "./tab/TaskListener";
  import GeneralUserTask from "./tab/GeneralUserTask";
  import VoteSelect from "./tab/VoteSelect";
  import DeadLine from "./tab/DeadLine";

  export default {
    name: "UserTaskProperties",
    components: {VoteSelect, GeneralUserTask, TaskListener, ResourceLibrary, Participant, RoleSet, Variable, DeadLine},
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
      outgoings() {
        const outgoings = [];
        this.element.outgoing.forEach(element => {
          if (element.businessObject.name) {
            outgoings.push({id: element.businessObject.id, name: element.businessObject.name});
          }
        });
        return outgoings;
      },
      transform() {
        let transform = [{code: 'taskCreate', name: this.local.create},
          {code: 'assignment', name: this.local.assignment}, {code: 'complete', name: this.local.complete},];
        this.outgoings.forEach(element => {
          transform.push({code: element.id, name: element.name});
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
          const that = this;
          //新建用户节点 -
          // 1.默认给与参与者角色,
          participant = BpmnFunction.createElementTag(that.modeler, that.param.extensionElements, BpmnTag.participant);
          this.extensionValues.push(participant);
          let tagElement = BpmnFunction.createElementTag(that.modeler, participant, BpmnTag.role);
          participant.roles = [tagElement];
          Object.assign(tagElement, {
            'id': 'operator_code', 'name': that.local.operator, 'roleCode': 'operator_code',
            'hover': false, 'type': 'role', 'need': 'ALL', 'number': ''
          });
          //2.添加之前节点的角色设置
          const rolesOption = {};
          Object.keys(that.params).forEach(key => {
            let extensionElements = that.params[key].extensionElements;
            if (key === that.element.id || !extensionElements || that.params[key]['$type'] !== 'bpmn:UserTask') {
              return;
            }
            extensionElements.get('values').filter(item => item.$type === BpmnTag.participant).forEach(participant => {
              if (participant.roles) {
                participant.roles.forEach(item => {
                  if (item.id !== 'operator_code') {
                    rolesOption[item.id] = {'name': item.name, 'id': item.id, 'code': item.roleCode, sourceRef: key};
                  }
                })
              }
            });
          });
          Object.values(rolesOption).forEach(item => {
            let roleSet = BpmnFunction.createElementTag(that.modeler, that.getExtensionElements(), BpmnTag.roleSet);
            Object.assign(roleSet, {view: false, add: false, remove: false, repositories: []});
            Object.assign(roleSet, {...item});
            that.extensionValues.push(roleSet);
          });
        }
        return participant;
      },
      activity() {
        let activity;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.formTemplate) {
            activity = this.extensionValues[i];
            break;
          }
        }
        if (!activity) {
          activity = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.formTemplate);
          this.extensionValues.push(activity);
        }
        return activity;
      },

      voteSelect() {
        const that = this;
        let data;
        const voteSelects = this.extensionValues.filter(element => element['$type'] === BpmnTag.voteSelect);
        if (voteSelects && voteSelects.length > 0) {
          data = voteSelects[0];
        } else {
          data = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.voteSelect);
          this.extensionValues.push(data);
        }
        if (!data.votes) {
          data.votes = [];
        }
        this.outgoings.forEach(element => {
          const votes = data.votes;
          for (let i = 0; i < votes.length; i++) {
            if (element.id === votes[i].id) {
              votes[i].name = element.name;
              return;
            }
          }
          let vote = BpmnFunction.createElementTag(that.modeler, data, BpmnTag.vote);
          Object.assign(vote, {name: element.name, id: element.id, priority: 1, requiredReason: false});
          data.votes.push(vote);
        });
        return data;
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
          for (let key of Object.keys(listenerData)) {
            tagElement[key] = listenerData[key];
          }
          this.extensionValues.push(tagElement);
        } else if ('remove' === type) {
          for (let i = 0; i < this.extensionValues.length; i++) {
            let value = this.extensionValues[i];
            if (value['$type'] === BpmnTag.taskListener && value.event === listenerData.event) {
              if (value[listenerData.typeKey] === listenerData.value) {
                this.extensionValues.splice(i, 1);
                return;
              }
            }
          }
        }
      },
      moveUpdateRoleSet(rolesOption){
        const that = this;
        rolesOption.forEach(item => {
          let index = this.extensionValues.findIndex(obj => obj.id === item.id);
          if(index !=-1 ){
            this.extensionValues.splice(index);
          }
        });
        let extensionElements = this.param.extensionElements;
        rolesOption.forEach(item => {
          let roleSet = BpmnFunction.createElementTag(that.modeler, extensionElements, BpmnTag.roleSet);
          Object.assign(roleSet, {view: item.view, add: item.add, remove: item.remove, sourceRef: item.sourceRef,code:item.code,id:item.id,name:item.name});
          extensionElements.get('values').push(roleSet);
        });
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
            let existedRoleSetId = [];
            extensionElements.get('values').filter(item => item.$type === BpmnTag.roleSet).forEach(item => {
              existedRoleSetId.push(item.id);
            });
            rolesOption.forEach(item => {
              if (existedRoleSetId.indexOf(item.id) < 0) {
                roleSet = BpmnFunction.createElementTag(that.modeler, extensionElements, BpmnTag.roleSet);
                Object.assign(roleSet, {view: false, add: false, remove: false, sourceRef: that.element.id});
                Object.assign(roleSet, {...item, repositories: []});
                extensionElements.get('values').push(roleSet);
              }
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
      deadLineNode(){
        let deadLineNode;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.deadline) {
            deadLineNode = this.extensionValues[i];
            break;
          }
        }
        if (!deadLineNode) {
          deadLineNode = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.deadline);
          this.extensionValues.push(deadLineNode);
        }
        return deadLineNode;
      },
      updateDeadLine(deadLineNode,selectData){
        const that = this;
        deadLineNode['noticeRoles'] = [];
        selectData.forEach(item => {
          let tagElement = BpmnFunction.createElementTag(that.modeler, deadLineNode, BpmnTag.role);
          var addRole = {
            'type': 'role',
            'id': item.key,
            'name':item.roleName,
            'roleCode':item.roleCode
          };
          Object.assign(tagElement, addRole);
          deadLineNode['noticeRoles'].push(tagElement);
        });
      },
      updateMarkCompleteVote(deadLineNode,selectVotes){
        const that = this;
        deadLineNode['markCompleteVotes'] = [];
        let allVotes = this.voteSelect().votes;
        selectVotes.forEach(item => {
          for (let i = 0; i < allVotes.length; i++) {
            if (item == allVotes[i].id) {
              let tagElement = BpmnFunction.createElementTag(that.modeler, deadLineNode, BpmnTag.vote);
              var addVote = {
                'id': allVotes[i].id,
                'name': allVotes[i].name
              };
              Object.assign(tagElement, addVote);
              deadLineNode['markCompleteVotes'].push(tagElement);
              break;
            }
          }
        });
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
