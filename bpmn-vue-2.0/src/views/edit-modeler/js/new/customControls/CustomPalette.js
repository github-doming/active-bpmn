export default class CustomPalette {
  constructor(create, elementFactory, palette, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const {
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

    function createGateway(event){
      const dataAction = event.delegateTarget.attributes['data-action'].value;
      let shape = null;
      if(dataAction === 'create.parallelGateway'){
        shape = elementFactory.createShape({type: 'bpmn:ParallelGateway'});
      }else if(dataAction === 'create.exclusiveGateway'){
        shape = elementFactory.createShape({type: 'bpmn:ExclusiveGateway'});
      }else if(dataAction === 'create.inclusiveGateway'){
        shape = elementFactory.createShape({type: 'bpmn:InclusiveGateway'});
      }
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
      'create.parallelGateway':{
        group: 'activity', className: 'bpmn-icon-gateway-parallel', title: translate('Create Parallel Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      },
      'create.exclusiveGateway':{
        group: 'activity', className: 'bpmn-icon-gateway-xor', title: translate('Create Exclusive Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      },
      'create.inclusiveGateway':{
        group: 'activity', className: 'bpmn-icon-gateway-or', title: translate('Create Inclusive Gateway'),
        action: {dragstart: createGateway, click: createGateway}
      }
    }
  }

}
CustomPalette.$inject = [
  'create',
  'elementFactory',
  'palette',
  'translate'
];
