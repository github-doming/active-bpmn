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

    function createInternalMethodRobotTask(event) {
      const shape = elementFactory.createShape({type: 'bpmn:ServiceTask'});
      shape.businessObject['activiti:type'] = 'setState';
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
      'create.internal-method-robot-task': {
        group: 'activity', // 分组名
        className: 'icon-custom internal-method-robot-task', // 样式类名
        title: '创建方法自动机',
        action: {dragstart: createInternalMethodRobotTask, click: createInternalMethodRobotTask}
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
