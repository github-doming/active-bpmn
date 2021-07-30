import BpmnElemet from "./BpmnElement";

// region  BPMN文件

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
    '</bpmn2:definitions>';
const CompleteBpmn = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="123" isExecutable="true">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:startEvent id="StartEvent_150xhye" name="开始">\n' +
    '      <bpmn2:outgoing>SequenceFlow_1vrscp7</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="UserTask_19969hx" name="123">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_1vrscp7</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0bv6z76</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_1vrscp7" sourceRef="StartEvent_150xhye" targetRef="UserTask_19969hx" />\n' +
    '    <bpmn2:endEvent id="EndEvent_01kz8pq" name="结束">\n' +
    '      <bpmn2:incoming>SequenceFlow_0bv6z76</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0bv6z76" sourceRef="UserTask_19969hx" targetRef="EndEvent_01kz8pq" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNShape id="StartEvent_150xhye_di" bpmnElement="StartEvent_150xhye">\n' +
    '        <dc:Bounds x="322" y="126" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="329" y="165" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="UserTask_19969hx_di" bpmnElement="UserTask_19969hx">\n' +
    '        <dc:Bounds x="410" y="120" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_1vrscp7_di" bpmnElement="SequenceFlow_1vrscp7">\n' +
    '        <di:waypoint x="358" y="144" />\n' +
    '        <di:waypoint x="410" y="144" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="EndEvent_01kz8pq_di" bpmnElement="EndEvent_01kz8pq">\n' +
    '        <dc:Bounds x="522" y="126" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="529" y="165" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0bv6z76_di" bpmnElement="SequenceFlow_0bv6z76">\n' +
    '        <di:waypoint x="470" y="144" />\n' +
    '        <di:waypoint x="522" y="144" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>';

const CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="试验试制流程" isExecutable="true">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:startEvent id="Event_0e6satq" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_0yh7c9u</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="Activity_0z0swe4" name="编制" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_126agv1" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0yh7c9u</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_09fa08m</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0tdevqp</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1u2zmmp</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:endEvent id="Event_0gz649e" name="结束">\n' +
    '      <bpmn2:incoming>Flow_0yi43sz</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0yh7c9u" sourceRef="Event_0e6satq" targetRef="Activity_0z0swe4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1u2zmmp" name="提交" sourceRef="Activity_0z0swe4" targetRef="Activity_126agv1" />\n' +
    '    <bpmn2:userTask id="Activity_126agv1" name="项目经理确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1u2zmmp</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0qihbq0</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_09fa08m</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1wbi4t0" name="试验部门确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant />\n' +
    '        <activiti:voteSelect />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_126agv1" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0qihbq0</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0yi43sz</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0tdevqp</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0qihbq0" name="通过" sourceRef="Activity_126agv1" targetRef="Activity_1wbi4t0" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0yi43sz" name="通过" sourceRef="Activity_1wbi4t0" targetRef="Event_0gz649e" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_09fa08m" name="驳回" sourceRef="Activity_126agv1" targetRef="Activity_0z0swe4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0tdevqp" name="驳回" sourceRef="Activity_1wbi4t0" targetRef="Activity_0z0swe4" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNEdge id="Flow_0tdevqp_di" bpmnElement="Flow_0tdevqp">\n' +
    '        <di:waypoint x="580" y="284" />\n' +
    '        <di:waypoint x="580" y="320" />\n' +
    '        <di:waypoint x="330" y="320" />\n' +
    '        <di:waypoint x="330" y="284" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="445" y="302" width="21" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_09fa08m_di" bpmnElement="Flow_09fa08m">\n' +
    '        <di:waypoint x="460" y="236" />\n' +
    '        <di:waypoint x="460" y="190" />\n' +
    '        <di:waypoint x="330" y="190" />\n' +
    '        <di:waypoint x="330" y="236" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="385" y="172" width="21" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0yi43sz_di" bpmnElement="Flow_0yi43sz">\n' +
    '        <di:waypoint x="610" y="260" />\n' +
    '        <di:waypoint x="672" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="630" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0qihbq0_di" bpmnElement="Flow_0qihbq0">\n' +
    '        <di:waypoint x="490" y="260" />\n' +
    '        <di:waypoint x="550" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="509" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1u2zmmp_di" bpmnElement="Flow_1u2zmmp">\n' +
    '        <di:waypoint x="360" y="260" />\n' +
    '        <di:waypoint x="430" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="384" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0yh7c9u_di" bpmnElement="Flow_0yh7c9u">\n' +
    '        <di:waypoint x="228" y="260" />\n' +
    '        <di:waypoint x="300" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="Event_0e6satq_di" bpmnElement="Event_0e6satq">\n' +
    '        <dc:Bounds x="192" y="242" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="199" y="281" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0z0swe4_di" bpmnElement="Activity_0z0swe4">\n' +
    '        <dc:Bounds x="300" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_0gz649e_di" bpmnElement="Event_0gz649e">\n' +
    '        <dc:Bounds x="672" y="242" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="679" y="281" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_126agv1_di" bpmnElement="Activity_126agv1">\n' +
    '        <dc:Bounds x="430" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1wbi4t0_di" bpmnElement="Activity_1wbi4t0">\n' +
    '        <dc:Bounds x="550" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\n';
// endregion

export const BpmnConfig = {
  statusAutoClass: 'com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener',
  analyzeTypes: ['bpmn:Process', 'bpmn:StartEvent', 'bpmn:UserTask', 'bpmn:SequenceFlow', 'bpmn:ServiceTask', 'bpmn:EndEvent', 'bpmn:InclusiveGateway', 'bpmn:IntermediateCatchEvent'],
};

export const BpmnTag = {
  formTemplate: 'activiti:FormTemplate',
  variable: 'activiti:Variable',
  roleSet: 'activiti:RoleSet',
  taskListener: 'activiti:TaskListener',
  participant: 'activiti:Participant',
  voteSelect: 'activiti:VoteSelect',
  assign: 'activiti:Assign',
  group: 'activiti:Group',
  role: 'activiti:Role',
  repository: 'activiti:Repository',
  vote: 'activiti:Vote',

  threshold: 'activiti:Threshold',
  field: 'activiti:Field',

  getParticipant(participantKey) {
    if (participantKey === 'assigns') {
      return this.assign;
    } else if (participantKey === 'groups') {
      return this.group;
    } else if (participantKey === 'roles') {
      return this.role;
    }
    return undefined;
  },
  getParticipantType(participantKey) {
    if (participantKey === 'assigns') {
      return 'user';
    } else if (participantKey === 'groups') {
      return 'group';
    } else if (participantKey === 'roles') {
      return 'role';
    }
    return undefined;
  }
};

export const BpmnMethod = {
  getExtensionElements() {
    return function () {
      if (this.param.extensionElements) {
        return this.param.extensionElements;
      }
      const extensionElements = BpmnElemet.createElement('bpmn:ExtensionElements', null, this.element, this.modeler.get('bpmnFactory'));
      this.modeler.get('modeling').updateProperties(this.element, {
        extensionElements: extensionElements
      });
      return extensionElements;
    }
  },
  getExtensionElementsOnly() {
    return function () {
      if (this.param.extensionElements) {
        return this.param.extensionElements;
      }
      return null;
    }
  },
  updateGeneral() {
    return function (newVal) {
      this.modeler.get('modeling').updateProperties(this.element, newVal);
    }
  },
  updateVariable() {
    return function (type, variable) {
      if ('add' === type) {
        let tagElement = BpmnFunction.createElementTag(this.modeler, this.param.extensionElements, BpmnTag.variable);
        for (let key in variable) {
          if (variable.hasOwnProperty(key)) {
            tagElement[key] = variable[key];
          }
        }
        this.extensionValues.push(tagElement);
      } else if ('remove' === type) {
        for (let i = 0; i < this.extensionValues.length; i++) {
          if (this.extensionValues[i]['$type'] === BpmnTag.variable && this.extensionValues[i].id === variable) {
            this.extensionValues.splice(i, 1);
            return;
          }
        }
      }
    }
  }
};

export const BpmnComputed = {
  variables() {
    return function () {
      return this.extensionValues.filter(element => element['$type'] === BpmnTag.variable);
    }
  },
};

import {postJson} from '@/common';

export const Http = {
  async getParticipant(key, data) {
    data.pageNo = 1;
    data.pageSize = 1000;
    let url = '/api/getAllPartinal';
    let result;
    await postJson(url, data).then(response => {
      result = response.data[key];
    });
    return result;
  },

};


export const BpmnFunction = {
  getBpmnTemplate() {
    return BaseCreateBpmn;
    // return CompleteBpmn2;
  },

  /**
   * 创建一个元素节点
   * @param modeler bpmn模板
   * @param parent 扩展元素挂靠的节点
   * @param elementName 节点名称
   * @param properties 配置属性
   * @returns {djs.model.Base} 创建出的元素
   */
  createElementTag(modeler, parent, elementName, properties) {
    let tag = modeler.get('bpmnFactory').create(elementName, properties);
    tag.$parent = parent;
    return tag
  },
  deleteSequence(bpmnParams, elementId) {
    for (let key of Object.keys(bpmnParams)) {
      const type = bpmnParams[key].$type;
      if (!type || type !== 'bpmn:UserTask') {
        continue;
      }
      let values = bpmnParams[key].extensionElements.get('values');
      values = values.filter(element => !(element['$type'] === BpmnTag.taskListener && element['event'] === elementId));
      values.forEach(value=>{
        if (value['$type'] === BpmnTag.voteSelect && value.votes){
          value.votes = value.votes.filter(element => !(element['$type'] === BpmnTag.vote && element['id'] === elementId));
        }
      });
      bpmnParams[key].extensionElements.set('values', values);
    }
  },
  errorMessage: function (_this, err) {
    _this.$notification.error({
      message: '提示:',
      description: err,
    });
  },
};

