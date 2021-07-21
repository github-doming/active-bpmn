// 引入默认的renderer
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {BpmnConfig} from "../BpmnHelper";
import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';
import setStatus from '../util/set-status.svg';

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
      return this.drawSetStatus(visuals,element);
    }
    if (BpmnConfig.asyncTypes.includes(element.type)){
      element.businessObject.$attrs['activiti:async'] = true;
    }
    return this.bpmnRenderer.drawShape(visuals, element);
  }

  drawSetStatus(parentNode, element) {
    const attr = { x: 0, y: 0, width: 48, height: 48 };
    const customIcon = svgCreate('image', {
      ...attr,
      href:setStatus,
    });
    element['width'] = attr.width;
    element['height'] = attr.height;
    svgAppend(parentNode, customIcon);
    const  name = element.businessObject.name;
    const text = svgCreate('text', {
      x: attr.x,
      y: attr.y + attr.height + 20,
      "font-size": "14",
      "fill": "#000"
    });
    text.innerHTML =name;
    svgAppend(parentNode, text);
    return customIcon
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }

}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
