// 引入默认的renderer
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {BpmnConfig} from "../BpmnHelper";
import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';
import setStatus from '../util/set-status.svg';
import email from '../util/e-mail.svg';

const CustomTypes = ['bpmn:UserTask', 'bpmn:ServiceTask', 'bpmn:SendTask'];

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
      element.width = 62.5;
      element.height = 50;
    }
    if (element.type === 'bpmn:ServiceTask' && element.businessObject.$attrs['activiti:class'] === BpmnConfig.statusAutoClass) {
      return this.drawSetStatus(visuals,element);
    }
    if(element.type === 'bpmn:ServiceTask' && element.businessObject.$attrs['activiti:type'] === BpmnConfig.mailAutoType)
    {
      return this.drawSetMail(visuals, element);
    }
      return this.bpmnRenderer.drawShape(visuals, element);
  }

  drawSetStatus(parentNode, element) {
    const attr = { x: 0, y: 0, width: 50, height: 50 };
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

  drawSetMail(parentNode, element) {
    const attr = {x: 0, y: 0, width: 50, height: 50};
    const customIcon = svgCreate('image', {
      ...attr,
      href: email,
    });
    element['width'] = attr.width;
    element['height'] = attr.height;
    svgAppend(parentNode, customIcon);
    const name = element.businessObject.name;
    const text = svgCreate('text', {
      x: attr.x,
      y: attr.y + attr.height + 20,
      "font-size": "14",
      "fill": "#000"
    });
    text.innerHTML = name;
    svgAppend(parentNode, text);
    return customIcon
  }

  }

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
