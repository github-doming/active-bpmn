/**
 *bpmnjs的工具类
 */
import ElementCompantMap from '../const/ElementCompantMap'

const getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject
const BaseCreateBpmn = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
  'xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
  'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"' +
  ' xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
  'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" ' +
  'xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" ' +
  'id="sample-diagram" ' +
  'targetNamespace="http://activiti.org/bpmn">' +
  '<bpmn2:process id="Process_1" isExecutable="true">' +
  '</bpmn2:process>' +
  '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
  '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
  '</bpmndi:BPMNPlane>' +
  '</bpmndi:BPMNDiagram>' +
  '</bpmn2:definitions>'
// const oldBpmn = '<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://camunda.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">  <bpmn2:process id="Process_1" name="1234" isExecutable="true" process_namespace="" process_id="Process_1">    <bpmn2:startEvent id="Event_0kl3mck" name="开始">      <bpmn2:outgoing>Flow_1rx2jjw</bpmn2:outgoing>    </bpmn2:startEvent>    <bpmn2:endEvent id="Event_0487f1t" name="结束">      <bpmn2:incoming>Flow_1rx2jjw</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:sequenceFlow id="Flow_1rx2jjw" sourceRef="Event_0kl3mck" targetRef="Event_0487f1t" />  </bpmn2:process>  <bpmndi:BPMNDiagram id="BPMNDiagram_1">    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">      <bpmndi:BPMNEdge id="Flow_1rx2jjw_di" bpmnElement="Flow_1rx2jjw">        <di:waypoint x="498" y="110" />        <di:waypoint x="552" y="110" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="Event_0kl3mck_di" bpmnElement="Event_0kl3mck">        <dc:Bounds x="462" y="92" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="469" y="135" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Event_0487f1t_di" bpmnElement="Event_0487f1t">        <dc:Bounds x="552" y="92" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="559" y="135" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>    </bpmndi:BPMNPlane>  </bpmndi:BPMNDiagram></bpmn2:definitions>'
const oldBpmn = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
  '  <bpmn2:process id="Process_1" name="建库流程" isExecutable="true" process_namespace="" process_id="Process_1">\n' +
  '    <bpmn2:extensionElements>\n' +
  '      <activiti:variable wasVisible="true" isNecessary="true" isReadOnly="false" isResettable="true" defaultShowName="建库数量" zh_ch="建库数量" en_us="libcount" variableName="libcount" variableType="int" defaultValue="1" id="BOM01" />\n' +
  '      <activiti:variable wasVisible="true" isNecessary="true" isReadOnly="false" isResettable="true" defaultShowName="建库名称" zh_ch="建库名称" en_us="libName" variableName="libName" variableType="String" defaultValue="器件库" id="BOM11" />\n' +
  '    </bpmn2:extensionElements>\n' +
  '    <bpmn2:startEvent id="Event_1kq5rc0" name="开始">\n' +
  '      <bpmn2:outgoing>Flow_1up7nk4</bpmn2:outgoing>\n' +
  '    </bpmn2:startEvent>\n' +
  '    <bpmn2:userTask id="Activity_1nr5csw" name="提交">\n' +
  '      <bpmn2:extensionElements>\n' +
  '        <activiti:variable wasVisible="true" isNecessary="true" isReadOnly="false" isResettable="true" initFormVarKey="libcount" defaultShowName="建库数量" zh_ch="建库数量" en_us="libcount" variableName="libcount" variableType="int" defaultValue="1" id="BOM01" />\n' +
  '        <activiti:variable wasVisible="true" isNecessary="true" isReadOnly="false" isResettable="true" defaultShowName="建库人" zh_ch="建库人" en_us="libPerson" variableName="libPerson" variableType="String" defaultValue="jwzhao" id="BOM11" />\n' +
  '        <activiti:participant assign="jwzhao,user,5372;" group="" role="ALL.undefined,QA,role,QA,2559;" />\n' +
  '        <activiti:roleSet name="Project Manager" view="true" remove="true" add="true" sourceRef="Activity_0vt6bfp"/>\n' +
  '        <activiti:roleSet name="Process Engineer" view="true" remove="true" add="true" sourceRef="Activity_0vt6bfp"/>\n' +
  '      </bpmn2:extensionElements>\n' +
  '      <bpmn2:incoming>Flow_1up7nk4</bpmn2:incoming>\n' +
  '      <bpmn2:incoming>Flow_0p9qnv2</bpmn2:incoming>\n' +
  '      <bpmn2:outgoing>Flow_0iwniq1</bpmn2:outgoing>\n' +
  '      <bpmn2:outgoing>Flow_0c3y64a</bpmn2:outgoing>\n' +
  '    </bpmn2:userTask>\n' +
  '    <bpmn2:sequenceFlow id="Flow_1up7nk4" sourceRef="Event_1kq5rc0" targetRef="Activity_1nr5csw" />\n' +
  '    <bpmn2:userTask id="Activity_0vt6bfp" name="审批">\n' +
  '      <bpmn2:extensionElements>\n' +
  '        <activiti:participant assign="" group="NUMBER.2,pisx,group,383;" role="ANY.undefined,Project Manager,role,PM,2560;ALL.undefined,Process Engineer,role,Process Engineer,2558;" />\n' +
  '      </bpmn2:extensionElements>\n' +
  '      <bpmn2:incoming>Flow_0iwniq1</bpmn2:incoming>\n' +
  '      <bpmn2:outgoing>Flow_1fflblk</bpmn2:outgoing>\n' +
  '      <bpmn2:outgoing>Flow_0p9qnv2</bpmn2:outgoing>\n' +
  '    </bpmn2:userTask>\n' +
  '    <bpmn2:sequenceFlow id="Flow_0iwniq1" name="通过" sourceRef="Activity_1nr5csw" targetRef="Activity_0vt6bfp" process_namespace="" process_id="Flow_0iwniq1" />\n' +
  '    <bpmn2:endEvent id="Event_0lehwsb" name="结束">\n' +
  '      <bpmn2:incoming>Flow_1fflblk</bpmn2:incoming>\n' +
  '    </bpmn2:endEvent>\n' +
  '    <bpmn2:sequenceFlow id="Flow_1fflblk" name="通过" sourceRef="Activity_0vt6bfp" targetRef="Event_0lehwsb" />\n' +
  '    <bpmn2:sequenceFlow id="Flow_0p9qnv2" name="驳回" sourceRef="Activity_0vt6bfp" targetRef="Activity_1nr5csw" process_namespace="" process_id="Flow_0p9qnv2" />\n' +
  '    <bpmn2:endEvent id="Event_06p0dip" name="结束">\n' +
  '      <bpmn2:incoming>Flow_0c3y64a</bpmn2:incoming>\n' +
  '    </bpmn2:endEvent>\n' +
  '    <bpmn2:sequenceFlow id="Flow_0c3y64a" name="取消" sourceRef="Activity_1nr5csw" targetRef="Event_06p0dip" process_namespace="" process_id="Flow_0c3y64a" />\n' +
  '  </bpmn2:process>\n' +
  '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
  '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
  '      <bpmndi:BPMNEdge id="Flow_0c3y64a_di" bpmnElement="Flow_0c3y64a">\n' +
  '        <di:waypoint x="460" y="254" />\n' +
  '        <di:waypoint x="460" y="340" />\n' +
  '        <di:waypoint x="612" y="340" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="464" y="293" width="22" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNEdge id="Flow_0p9qnv2_di" bpmnElement="Flow_0p9qnv2">\n' +
  '        <di:waypoint x="640" y="206" />\n' +
  '        <di:waypoint x="640" y="160" />\n' +
  '        <di:waypoint x="460" y="160" />\n' +
  '        <di:waypoint x="460" y="206" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="539" y="142" width="22" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNEdge id="Flow_1fflblk_di" bpmnElement="Flow_1fflblk">\n' +
  '        <di:waypoint x="670" y="230" />\n' +
  '        <di:waypoint x="792" y="230" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="720" y="212" width="23" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNEdge id="Flow_0iwniq1_di" bpmnElement="Flow_0iwniq1">\n' +
  '        <di:waypoint x="490" y="230" />\n' +
  '        <di:waypoint x="610" y="230" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="539" y="212" width="23" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNEdge id="Flow_1up7nk4_di" bpmnElement="Flow_1up7nk4">\n' +
  '        <di:waypoint x="318" y="230" />\n' +
  '        <di:waypoint x="430" y="230" />\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNShape id="Event_1kq5rc0_di" bpmnElement="Event_1kq5rc0">\n' +
  '        <dc:Bounds x="282" y="212" width="36" height="36" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="289" y="255" width="23" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Activity_1nr5csw_di" bpmnElement="Activity_1nr5csw">\n' +
  '        <dc:Bounds x="430" y="206" width="60" height="48" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Activity_0vt6bfp_di" bpmnElement="Activity_0vt6bfp">\n' +
  '        <dc:Bounds x="610" y="206" width="60" height="48" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Event_0lehwsb_di" bpmnElement="Event_0lehwsb">\n' +
  '        <dc:Bounds x="792" y="212" width="36" height="36" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="799" y="255" width="23" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Event_06p0dip_di" bpmnElement="Event_06p0dip">\n' +
  '        <dc:Bounds x="612" y="322" width="36" height="36" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <dc:Bounds x="619" y="365" width="23" height="14" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNShape>\n' +
  '    </bpmndi:BPMNPlane>\n' +
  '  </bpmndi:BPMNDiagram>\n' +
  '</bpmn2:definitions>\n'
export default {
  async getBpmnTemplate () {
    // 判断是不是创建
    if (false) {
    // if (false) {
      return BaseCreateBpmn
    } else {
      let bpmn
      await new Promise(resolve => {
        setTimeout(() => resolve(oldBpmn), 200)
      }).then(result => bpmn = result, err => {
        console.log('请求Bpmn文件失败', err)
        bpmn = BaseCreateBpmn
      })
      return bpmn
    }
  },
  //设置元素
  setElement (element, vm) {
    if (element === undefined) {
      element = vm.bpmnModeler.get('canvas').getRootElement()
    }
    vm.propsComponent = this.getComponentByEleType(element.type)
    vm.element = element
  },

  isImplicitRoot (element) {
    return element.id === '__implicitroot'
  },
  //更新模型属性
  updateProperties (element, properties) {
    let bo = getBusinessObject(element)
    Object.keys(properties).forEach(key => {
      bo.set(key, properties[key])
    })
  },
  //通过命令更新属性
  updatePropertiesByCmd (element, commandStack, properties) {
    commandStack.execute('element.updateProperties', {element: element, properties: properties})
  },
  //获取元素的属性
  getProperties (element, propNames) {
    let bo = this.getBo(element)
    let properties = {}
    for (let propName of propNames) {
      properties[propName] = bo.get(propName)
    }
    return properties
  },
  //获取单个元素属性
  getPropertie (element, propName) {
    let bo = this.getBo(element)
    return bo.get(propName)
  },

  //获取元素的模型对象
  getBo (element) {
    return getBusinessObject(element)
  },
  //通过元素类型获取相应的组件
  getComponentByEleType (type) {
    return ElementCompantMap[type]
  },
  //创建一个元素
  createElement (elementName, properties) {
    let bpmnFactory = vm.bpmn.bpmnFactory
    return bpmnFactory.create(elementName, properties)
  },
  //创建一个元素
  createElementTag (bpmnModeler, elementName, parent, properties) {
    const bpmnFactory = bpmnModeler.get('bpmnFactory')
    let tag = bpmnFactory.create(elementName, properties)
    tag.$parent = parent
    return tag
  },

  // 获取一个节点里面的特定数据
  getExtensionTypeValues (elements, type) {
    let extensionTypeValues = []
    elements.forEach(each => {
      let id = each.id
      let extensionElements = this.getBo(each).extensionElements
      if (extensionElements) {
        let values = extensionElements.values
        let types = values.filter(value => {
          return value.$type === type
        })
        extensionTypeValues.push({id, types})
      }
    })
    return extensionTypeValues
  },
}
