import {BpmnConfig} from "../BpmnHelper";

const contextPadTypes = ['bpmn:UserTask', 'bpmn:CallActivity', 'bpmn:ServiceTask', 'bpmn:StartEvent',
  'bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway', 'bpmn:ParallelGateway', 'bpmn:IntermediateCatchEvent'];

export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate, modeling, connect) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling = modeling;
    this.connect = connect;
    //自动摆放位置
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }
    //注册工具
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate,
      modeling,
      connect
    } = this;


    function appendAction(type, className, group, title, options) {
      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', {type: type.replace(/^bpmn:/, '')});
      }

      function appendStart(event, element) {
        let shape = elementFactory.createShape(Object.assign({type: type}, options));
        create.start(event, shape, {
          source: element
        })
      }

      let append = autoPlace ? (event, element) => {
        let shape = elementFactory.createShape(Object.assign({type: type}, options));
        if (BpmnConfig.asyncTypes.includes(type)){
          shape.businessObject.$attrs['activiti:async'] = true;
        }
        autoPlace.append(element, shape)
      } : appendStart;

      return {
        group: group, className: className, title: title,
        action: {dragstart: appendStart, click: append}
      }
    }

    function startConnect(event, element) {
      connect.start(event, element)
    }

    // 点击的时候实现删除功能
    function removeElement(e) {
      modeling.removeElements([element])
    }


    let actions = {};

    if (element.type === 'label') {
      return actions
    }
    if (contextPadTypes.includes(element.type)) {
      actions = {
        'append.end-event': appendAction('bpmn:EndEvent', 'bpmn-icon-end-event-none', 'event', translate('Append End Event')),
        'append.exclusive-gateway': appendAction('bpmn:ExclusiveGateway', 'bpmn-icon-gateway-xor', 'event', translate('Append Exclusive Gateway')),
        'append.user-task': appendAction('bpmn:UserTask', 'bpmn-icon-user-task', 'model', translate('Append User Task')),
        'append.service-task': appendAction('bpmn:ServiceTask', 'bpmn-icon-service-task', 'model', translate('Append Service Task')),
        'append.connect': {
          group: 'edit', className: 'bpmn-icon-connection-multi',
          title: translate('Connect'),
          action: {click: startConnect, dragstart: startConnect}
        }
      };
    } else {
      actions = {}
    }

    // 所有节点都有删除
    Object.assign(actions, {
      'delete': {
        group: 'edit', className: 'bpmn-icon-trash', title: translate('Remove'),
        action: {click: removeElement}
      }
    });
    return actions
  }
}

CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'modeling',
  'connect'
];
