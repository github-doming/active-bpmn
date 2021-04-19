// 引入默认的renderer
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';import {
  append as svgAppend,  create as svgCreate} from 'tiny-svg';
import {customTaskConfig, rectFrame} from "../util/util";

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
    function customShape(parentNode, element, customType) {
      const {url, attr} = customTaskConfig[customType];
      const customIcon = svgCreate('image', {...attr, href: url});
      element['width'] = attr.width;
      element['height'] = attr.height;
      svgAppend(parentNode, customIcon);
      const text = svgCreate('text', {
        x: attr.x, y: attr.y + attr.height + 20, "font-size": "14", "fill": "#000",width: 60
      });
      text.innerHTML = element.businessObject.name;
      svgAppend(parentNode, text);


      return customIcon;
    }

    if (CustomTypes.includes(element.type)) {
      element.width = 60;
      element.height = 48;
    }
    let customType = element.businessObject['activiti:type'];

    if (customType) {
      console.log(customType);
      return customShape(visuals, element, customType);
    }
    return this.bpmnRenderer.drawShape(visuals, element);
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }

}
CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
