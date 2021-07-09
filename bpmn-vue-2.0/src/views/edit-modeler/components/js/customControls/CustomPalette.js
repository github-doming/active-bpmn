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

    function createUserTask(event) {
      const shape = elementFactory.createShape({type: 'bpmn:UserTask'});
      create.start(event, shape);
    }

    function createServiceTask(event) {
      const shape = elementFactory.createShape({type: 'bpmn:ServiceTask'});
      create.start(event, shape);
    }

    function createGateway(event) {
      const dataAction = event.delegateTarget.attributes['data-action'].value;
      let shape = null;
      if (dataAction === 'create.parallelGateway') {
        shape = elementFactory.createShape({type: 'bpmn:ParallelGateway'});
      } else if (dataAction === 'create.exclusiveGateway') {
        shape = elementFactory.createShape({type: 'bpmn:ExclusiveGateway'});
      } else if (dataAction === 'create.inclusiveGateway') {
        shape = elementFactory.createShape({type: 'bpmn:InclusiveGateway'});
      }
      create.start(event, shape);
    }

    function createStatusAuto(event) {
      const businessObject = bpmnFactory.create('bpmn:ServiceTask');
      businessObject['name'] = '状态机';
      businessObject.$attrs['activiti:class'] = BpmnConfig.statusAutoClass;
      const shape = elementFactory.createShape({type: 'bpmn:ServiceTask', businessObject});
      create.start(event, shape);
    }
    return {
      'create.user-task': {
        group: 'activity', className: 'bpmn-icon-user-task', title: translate('Create UserTask'),
        action: {dragstart: createUserTask, click: createUserTask}
      },
      'create.service-task': {
        group: 'activity', className: 'bpmn-icon-service-task', title: translate('Create ServiceTask'),
        action: {dragstart: createServiceTask, click: createServiceTask}
      },
      'create.parallelGateway': {
        group: 'activity', className: 'bpmn-icon-gateway-parallel', title: translate('Create Parallel Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      },
      'create.exclusiveGateway': {
        group: 'activity', className: 'bpmn-icon-gateway-xor', title: translate('Create Exclusive Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      },
      'create.inclusiveGateway': {
        group: 'activity', className: 'bpmn-icon-gateway-or', title: translate('Create Inclusive Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      },
      'create.statusAuto': {
        group: 'activity', className: 'bpmn-icon-service-task bpmn-icon-red', title: translate('状态自动机'),
        action: {dragstart: createStatusAuto, click: createStatusAuto}
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
