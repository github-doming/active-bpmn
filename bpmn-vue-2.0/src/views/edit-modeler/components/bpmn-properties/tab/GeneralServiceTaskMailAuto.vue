<template>
  <div class="properties">
    <a-tabs type="card" v-model="activeTab">
      <a-tab-pane key="general" :tab="local.general">
        <general-mail-auto :param="param" :general="mailGeneral()" @updateGeneral="updateGeneral"/>
      </a-tab-pane>
        <a-tab-pane  key="Recipient" :tab="local.recipient">
            <recipient />
        </a-tab-pane>
      <a-tab-pane key="MailMessage" :tab="local.message">
        <MailMessage />
      </a-tab-pane>
      <a-tab-pane key="attachment" :tab="local.attachment">
        <MailAttachment />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {BpmnComputed, BpmnFunction, BpmnMethod, BpmnTag} from "../../js/BpmnHelper";
  import GeneralMailAuto from "./GeneralMailAuto";
  import Recipient from "./Recipient";
  import MailMessage from "./MailMessage";
  import MailAttachment from "./MailAttachment";

  export default {
    name: "GeneralServiceTaskMailAuto",
    components: {GeneralMailAuto,Recipient,MailMessage,MailAttachment},
    props: {
      modeler: {
        type: Object,
        default: () => ({})
      }, param: {
      type: Object,
      default: () => ({})
    }, element: {
      type: Object,
      default: () => ({})
    }
    },
    data() {
        const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
          local,activeTab: 'general',extensionValues: []
      }
    },
    watch: {
      element(newValue) {
        this.activeTab = 'general';
        this.param = this.params[newValue.id];
        this.extensionValues = this.getExtensionElements().get('values');
      },
    },
    created() {
      this.extensionValues = this.getExtensionElements().get('values');
    },
    methods: {
      updateGeneral: BpmnMethod.updateGeneral(),
      getExtensionElements: BpmnMethod.getExtensionElements(),

      // participant() {
      //   let participant;
      //   for (let i = 0; i < this.extensionValues.length; i++) {
      //     if (this.extensionValues[i]['$type'] === BpmnTag.participant) {
      //       participant = this.extensionValues[i];
      //       break;
      //     }
      //   }
      //   if (!participant) {
      //     const that = this;
      //     //新建用户节点 -
      //     // 1.默认给与参与者角色,
      //     participant = BpmnFunction.createElementTag(that.modeler, that.param.extensionElements, BpmnTag.participant);
      //     this.extensionValues.push(participant);
      //     let tagElement = BpmnFunction.createElementTag(that.modeler, participant, BpmnTag.role);
      //     participant.roles = [tagElement];
      //     Object.assign(tagElement, {
      //       'id': 'operator_code', 'name': that.local.operator, 'roleCode': 'operator_code',
      //       'hover': false, 'type': 'role', 'need': 'ALL', 'number': ''
      //     });
      //     //2.添加之前节点的角色设置
      //     const rolesOption = {};
      //     Object.keys(that.params).forEach(key => {
      //       let extensionElements = that.params[key].extensionElements;
      //       if (key === that.element.id || !extensionElements || that.params[key]['$type'] !== 'bpmn:UserTask') {
      //         return;
      //       }
      //       extensionElements.get('values').filter(item => item.$type === BpmnTag.participant).forEach(participant => {
      //         if (participant.roles) {
      //           participant.roles.forEach(item => {
      //             if (item.id !== 'operator_code') {
      //               rolesOption[item.id] = {'name': item.name, 'id': item.id, 'code': item.roleCode, sourceRef: key};
      //             }
      //           })
      //         }
      //       });
      //     });
      //     Object.values(rolesOption).forEach(item => {
      //       let roleSet = BpmnFunction.createElementTag(that.modeler, that.getExtensionElements(), BpmnTag.roleSet);
      //       Object.assign(roleSet, {view: false, add: false, remove: false, repositories: []});
      //       Object.assign(roleSet, {...item});
      //       that.extensionValues.push(roleSet);
      //     });
      //   }
      //   return participant;
      // },
      // updateParticipant(participant, participantKey, participantData) {
      //   const that = this;
      //   participantData.forEach(item => {
      //     let tagElement = BpmnFunction.createElementTag(that.modeler, participant, BpmnTag.getRecipient(participantKey));
      //     Object.assign(tagElement, {
      //       'hover': false, 'type': BpmnTag.getRecipientType(participantKey), 'id': item.id, 'name': item.name
      //     });
      //     if (participantKey === 'assigns') {
      //       Object.assign(tagElement, {'userName': item.userName,});
      //     } else if (participantKey === 'groups') {
      //       Object.assign(tagElement, {'need': 'NO', 'number': ''});
      //     } else if (participantKey === 'roles') {
      //       Object.assign(tagElement, {'need': 'NO', 'number': '', 'roleCode': item.roleCode});
      //     }
      //     participant[participantKey].push(tagElement);
      //   });
      // },
      mailGeneral(){
        let general;
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.responsibleRole) {
            general = this.extensionValues[i];
            break;
          }
        }
        if (!general) {
          general = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.responsibleRole);
          this.extensionValues.push(general);
        }
        return general;
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
