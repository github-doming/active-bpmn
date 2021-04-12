// 引入默认的renderer
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

// 最高优先级
const HIGH_PRIORITY = 1500;
const customElements = ['bpmn:UserTask','bpmn:CallActivity',];
export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    if (customElements.includes(element.type)){
      element.width = 60;
      element.height = 48;
      return this.bpmnRenderer.drawShape(parentNode, element);
    }else {
      console.log('element.type',element.type);
    }
    return this.bpmnRenderer.drawShape(parentNode, element);
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }

}
CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
