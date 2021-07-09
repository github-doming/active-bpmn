// 引入默认的renderer
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {BpmnConfig} from "../BpmnHelper";

const CustomTypes = ['bpmn:UserTask', 'bpmn:ServiceTask'];

// 最高优先级
const HIGH_PRIORITY = 1500;
export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    return !element.labelTarget;
  }

  drawShape(visuals, element) {
    if (CustomTypes.includes(element.type)) {
      element.width = 60;
      element.height = 48;
    }
    if (element.type === 'bpmn:ServiceTask' && element.businessObject.$attrs['activiti:class'] === BpmnConfig.statusAutoClass) {
      let shape = this.bpmnRenderer.drawShape(visuals, element);
      shape.style.setProperty('fill', '#fc7b07');
      return shape;
    }
    return this.bpmnRenderer.drawShape(visuals, element);
  }


  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }

}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
