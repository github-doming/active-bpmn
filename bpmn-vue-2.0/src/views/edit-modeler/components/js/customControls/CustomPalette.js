import {BpmnConfig} from "../BpmnHelper";

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function createNode(event) {
      const dataAction = event.delegateTarget.attributes['data-action'].value;
      let bpmnType;
      if (dataAction === 'create.user-task') {
        bpmnType = 'bpmn:UserTask';
      } else if (dataAction === 'create.service-task') {
        bpmnType = 'bpmn:ServiceTask';
      } else if (dataAction === 'create.parallel-gateway') {
        bpmnType = 'bpmn:ParallelGateway';
      } else if (dataAction === 'create.xor-gateway') {
        bpmnType = 'bpmn:ExclusiveGateway';
      } else if (dataAction === 'create.inclusive-gateway') {
        bpmnType = 'bpmn:InclusiveGateway';
      }
      const shape = elementFactory.createShape({type: bpmnType});
      create.start(event, shape);
    }

    function createStatusAuto(event) {
      const businessObject = bpmnFactory.create('bpmn:ServiceTask');
      businessObject['name'] = '设置状态';
      businessObject.$attrs['activiti:class'] = BpmnConfig.statusAutoClass;
      const shape = elementFactory.createShape({type: 'bpmn:ServiceTask', businessObject});
      create.start(event, shape);
    }

    function createIntermediateCatchEvent(event) {
      const timerEvent = bpmnFactory.create('bpmn:TimerEventDefinition');
      const businessObject = bpmnFactory.create('bpmn:IntermediateCatchEvent');
      businessObject.eventDefinitions = [timerEvent];
      const shape = elementFactory.createShape({type: 'bpmn:IntermediateCatchEvent', businessObject});
      timerEvent.$parent = shape;
      create.start(event, shape);
    }

    return {
      'create.user-task': {
        group: 'activity', className: 'bpmn-icon-user-task', title: translate('Create UserTask'),
        action: {dragstart: createNode, click: createNode}
      },
      'create.service-task': {
        group: 'activity', className: 'bpmn-icon-service-task', title: translate('Create ServiceTask'),
        action: {dragstart: createNode, click: createNode}
      },
      'create.parallel-gateway': {
        group: 'activity', className: 'bpmn-icon-gateway-parallel', title: translate('Create Parallel Gateway'),
        action: {dragstart: createNode, click: createNode}
      },
      'create.xor-gateway': {
        group: 'activity', className: 'bpmn-icon-gateway-xor', title: translate('Create Exclusive Gateway'),
        action: {dragstart: createNode, click: createNode}
      },
      'create.inclusive-gateway': {
        group: 'activity', className: 'bpmn-icon-gateway-or', title: translate('Create Inclusive Gateway'),
        action: {dragstart: createNode, click: createNode}
      },
      'create.status-auto': {
        group: 'activity', className: 'icon-custom icon-custom-status-auto', title: translate('Create Status Auto'),
        action: {dragstart: createStatusAuto, click: createStatusAuto}
      },
      'create.intermediate-event-catch-timer': {
        group: 'activity', className: 'bpmn-icon-intermediate-event-catch-timer', title: translate('Create Timer'),
        action: {dragstart: createIntermediateCatchEvent, click: createIntermediateCatchEvent}
      }
    }
  }
}
CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];
