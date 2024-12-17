<template>
	<div class="properties">
		<!--    邮件自动机-->
		<general-service-task-mail-auto :params="params" :param="param" :element="element"
																		v-if="mailAuto" :mailGeneral="mailGeneral()"
																		:mailRecipient="mailRecipient()"
																		:mailMessage="mailMessage()" :mailAttachment="mailAttachment()"
																		@updateGeneral="updateGeneral" @updateMailRecipient="updateMailRecipient"
																		@updateMailAttachment="updateMailAttachment"/>
		<!--    状态自动机,普通服务任务-->
		<a-tabs type="card" v-else>
			<a-tab-pane key="general" :tab="local.general">
				<general-service-task-status-auto v-if="statusAuto" :field="field()" @updateGeneral="updateGeneral"/>
        <general-service-task-sub-process v-else-if="subProcessAuto" :field="subProcessField()" @updateGeneral="updateGeneral"/>
        <general-service-task-synch-robot v-else-if="synchRobotAuto" :param="param" :expression = "classExpression()" @updateGeneral="updateGeneral" />
        <ground v-else-if="ground" :param="param"/>
				<general-service-task v-else :param="param" @updateGeneral="updateGeneral"/>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
    import {BpmnConfig, BpmnFunction, BpmnMethod, BpmnTag} from "../js/BpmnHelper";
    import GeneralServiceTask from "./tab/GeneralServiceTask";
    import GeneralServiceTaskStatusAuto from "./tab/GeneralServiceTaskStatusAuto";
    import GeneralServiceTaskMailAuto from "./tab/GeneralServiceTaskMailAuto";
    import GeneralServiceTaskSubProcess from "./tab/GeneralServiceTaskSubProcess.vue";
    import GeneralServiceTaskSynchRobot from "./tab/GeneralServiceTaskSynchRobot.vue";
    import Ground from "./tab/Ground.vue";

    export default {
        name: "ServiceTaskProperties",
        components: {
          GeneralServiceTaskSubProcess,
          GeneralServiceTaskStatusAuto, GeneralServiceTaskMailAuto, GeneralServiceTask,GeneralServiceTaskSynchRobot,Ground},
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
                extensionValues: [],
                param: this.params[this.element.id]
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
            }
        },
        created() {
            this.extensionValues = this.getExtensionElements().get('values');
        },
        methods: {
            updateGeneral: BpmnMethod.updateGeneral(),
            getExtensionElements: BpmnMethod.getExtensionElements(),
            field() {
                if (!this.statusAuto) {
                    return null;
                }
                let fields = this.extensionValues.filter(element => element['$type'] === BpmnTag.field);
                if (fields.length > 0) {
                    return fields[0];
                }
                let elementTag = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.field);
                elementTag.name = 'stateKey';
                this.extensionValues.push(elementTag);
                return elementTag;
            },
            subProcessField() {
              if (!this.subProcessAuto) {
                return null;
              }
              let fields = this.extensionValues.filter(element => element['$type'] === BpmnTag.field);
              if (fields.length > 0) {
                return fields[0];
              }
              let elementTag = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.field);
              elementTag.name = 'templateName';
              this.extensionValues.push(elementTag);
              return elementTag;
            },
            mailGeneral() {
                let general;
                for (let i = 0; i < this.extensionValues.length; i++) {
                    if (this.extensionValues[i]['$type'] === BpmnTag.responsibleRole) {
                        general = this.extensionValues[i];
                        break;
                    }
                }
                if (!general) {
                    general = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.responsibleRole);
                    this.extensionValues.push(general);
                }
                if (!general.roleCode) {
                    general.roleCode = 'operator_code';
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
                if (!participant) {
                    participant = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.recipient);
                    this.extensionValues.push(participant);
                }
                return participant;
            },
            updateMailRecipient(type, participant, participantKey, participantData) {
              const rolesOption = [];
                if ('add' === type) {
                    participantData.forEach(item => {
                        let tagElement = BpmnFunction.createElementTag(this.modeler, participant, BpmnTag.getRecipient(participantKey));
                        var addObject = {
                            'hover': false,
                            'type': BpmnTag.getRecipientType(participantKey),
                            'id': item.id
                        };
                        if ("assigns" === participantKey) {
                            Object.assign(addObject, {
                                'fullName': item.name,
                                'userName': item.userName
                            });
                        } else if ("groups" === participantKey || "variables" === participantKey) {
                            Object.assign(addObject, {
                                'name': item.name,
                            });
                        } else if("roles" === participantKey || "operators" === participantKey){
                            Object.assign(addObject, {
                                'name':item.name,
                                'roleCode': item.roleCode
                            });
                          rolesOption.push({'name': item.name, 'id': item.id, 'code': item.roleCode})
												} else if("emails" === participantKey){
                            Object.assign(addObject, {
                                'mail': item.mail
                            });
                        }
                        Object.assign(tagElement, addObject);
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
            mailMessage() {
                let message;
                for (let i = 0; i < this.extensionValues.length; i++) {
                    if (this.extensionValues[i]['$type'] === BpmnTag.message) {
                        message = this.extensionValues[i];
                        break;
                    }
                }
                if (!message) {
                    message = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.message);
                    this.extensionValues.push(message);
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
                if (!attachment) {
                    attachment = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.attachment);
                    this.extensionValues.push(attachment);
                }
                return attachment;
            },
            updateMailAttachment(attachmentModel, attachmentData) {
                attachmentModel['variables'] = [];
                attachmentData.forEach(item => {
                    let tagElement = BpmnFunction.createElementTag(this.modeler, attachmentModel, BpmnTag.getRecipient('variables'));
                    Object.assign(tagElement, {
                        'type': BpmnTag.getRecipientType('variables'),
                        'id': item.id,
                        'name': item.name
                    });
                    attachmentModel['variables'].push(tagElement);
                });
            },
            classExpression() {
              let classExpression = this.extensionValues.filter(element => element['$type'] === BpmnTag.expression);
              if (classExpression.length > 0) {
                return classExpression[0];
              }
              let elementTag = BpmnFunction.createElementTag(this.modeler, this.getExtensionElements(), BpmnTag.expression);
              this.extensionValues.push(elementTag);
              return elementTag;
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
