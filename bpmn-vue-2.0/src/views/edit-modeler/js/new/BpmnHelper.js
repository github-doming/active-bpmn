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
    '  <bpmn2:process id="Process_1" name="建库流程" isExecutable="true" process_namespace="" process_id="Process_1">\n' +
    '    <bpmn2:extensionElements>\n' +
    '      <activiti:variable id="BOM01" name="libcount" defaultDisplay="建库数量" displayZhCn="建库数量" displayEnUs="libcount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
    '      <activiti:variable id="BOM11" name="libName" defaultDisplay="建库名称" displayZhCn="建库名称" displayEnUs="libName" type="String" defaultValue="器件库" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
    '    </bpmn2:extensionElements>\n' +
    '    <bpmn2:startEvent id="Event_1kq5rc0" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_1up7nk4</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="Activity_1nr5csw" name="提交">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:variable id="BOM01" name="libcount" defaultDisplay="建库数量" displayZhCn="建库数量" displayEnUs="libcount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
    '        <activiti:variable id="BOM11" name="libPerson" defaultDisplay="建库人" displayZhCn="建库人" displayEnUs="libPerson" type="String" defaultValue="jwzhao" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
    '        <activiti:participant assign="jwzhao,user,5372;" group="" role="ALL.undefined,QA,role,QA,2559;" />\n' +
    '        <activiti:roleSet id="2256" name="Project Manager" view="true" add="true" remove="true" sourceRef="Activity_0vt6bfp" repository="zhangsan,group,000"/>\n' +
    '        <activiti:roleSet id="2258" name="Process Engineer" view="true" add="true" remove="true" sourceRef="Activity_0vt6bfp" />\n' +
    '        <activiti:taskListener event="create" class="java.lang.String"/>\n' +
    '        <activiti:taskListener event="assignment" field="name"/>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1up7nk4</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0p9qnv2</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0iwniq1</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0c3y64a</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1up7nk4" sourceRef="Event_1kq5rc0" targetRef="Activity_1nr5csw" />\n' +
    '    <bpmn2:userTask id="Activity_0vt6bfp" name="审批">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:participant assign="" group="NUMBER.2,pisx,group,383;" role="ANY.undefined,Project Manager,role,PM,2560;ALL.undefined,Process Engineer,role,Process Engineer,2558;" >\n' +
    '           <activiti:group need="NUMBER" number="2" name="pisx" type="group" id="382"/>\n' +
    '        </activiti:participant>\n' +
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
    '</bpmn2:definitions>';

const CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
'<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
'  <bpmn2:process id="Process_1" name="请假申请流程" isExecutable="true">\n' +
'    <bpmn2:extensionElements>\n' +
'      <activiti:variable id="BOM01" name="leaveCount" defaultDisplay="请假天数" displayZhCn="请假天数" displayEnUs="leaveCount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
'    </bpmn2:extensionElements>\n' +
'    <bpmn2:startEvent id="Event_19h0jyz" name="开始">\n' +
'      <bpmn2:extensionElements />\n' +
'      <bpmn2:outgoing>Flow_1ib0cgg</bpmn2:outgoing>\n' +
'    </bpmn2:startEvent>\n' +
'    <bpmn2:userTask id="Activity_0nevzrh" name="申请提交">\n' +
'      <bpmn2:extensionElements>\n' +
'        <activiti:participant>\n' +
'          <activiti:assign userName="jwzhao" type="user" id="5372" />\n' +
'        </activiti:participant>\n' +
'        <activiti:variable id="BOM01" name="leaveCount" defaultDisplay="请假天数" displayZhCn="请假天数" displayEnUs="leaveCount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" initFormVarKey="leaveCount" />\n' +
'        <activiti:roleSet id="2560" name="Project Manager" code="PM" view="true" add="true" remove="true" sourceRef="Activity_18kenek">\n' +
'          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
'        </activiti:roleSet>\n' +
'        <activiti:activity />\n' +
'        <activiti:taskListener event="Flow_18p7hy3" class="TestCompletedTaskListener1" />\n' +
'        <activiti:taskListener event="assignment" class="TestCompletedTaskListener2" />\n' +
'        <activiti:taskListener event="Flow_1up0h2v" class="TestCompletedTaskListener3" />\n' +
'      </bpmn2:extensionElements>\n' +
'      <bpmn2:incoming>Flow_1ib0cgg</bpmn2:incoming>\n' +
'      <bpmn2:incoming>Flow_1sk7fdv</bpmn2:incoming>\n' +
'      <bpmn2:outgoing>Flow_18p7hy3</bpmn2:outgoing>\n' +
'      <bpmn2:outgoing>Flow_1up0h2v</bpmn2:outgoing>\n' +
'    </bpmn2:userTask>\n' +
'    <bpmn2:sequenceFlow id="Flow_1ib0cgg" sourceRef="Event_19h0jyz" targetRef="Activity_0nevzrh" />\n' +
'    <bpmn2:userTask id="Activity_18kenek" name="主管审批">\n' +
'      <bpmn2:extensionElements>\n' +
'        <activiti:participant>\n' +
'          <activiti:role need="ANY" number="" name="Project Manager" type="role" roleCode="PM" id="2560" />\n' +
'        </activiti:participant>\n' +
'        <activiti:activity />\n' +
'      </bpmn2:extensionElements>\n' +
'      <bpmn2:incoming>Flow_0zeq6ls</bpmn2:incoming>\n' +
'      <bpmn2:outgoing>Flow_1jutiu7</bpmn2:outgoing>\n' +
'      <bpmn2:outgoing>Flow_1sk7fdv</bpmn2:outgoing>\n' +
'    </bpmn2:userTask>\n' +
'    <bpmn2:endEvent id="Event_1xb93ro" name="结束">\n' +
'      <bpmn2:extensionElements />\n' +
'      <bpmn2:incoming>Flow_1jutiu7</bpmn2:incoming>\n' +
'    </bpmn2:endEvent>\n' +
'    <bpmn2:sequenceFlow id="Flow_1jutiu7" name="通过" sourceRef="Activity_18kenek" targetRef="Event_1xb93ro" />\n' +
'    <bpmn2:sequenceFlow id="Flow_1sk7fdv" name="驳回" sourceRef="Activity_18kenek" targetRef="Activity_0nevzrh" />\n' +
'    <bpmn2:endEvent id="Event_18r89i0" name="结束">\n' +
'      <bpmn2:extensionElements>\n' +
'        <activiti:participant />\n' +
'      </bpmn2:extensionElements>\n' +
'      <bpmn2:incoming>Flow_18p7hy3</bpmn2:incoming>\n' +
'    </bpmn2:endEvent>\n' +
'    <bpmn2:sequenceFlow id="Flow_18p7hy3" name="取消" sourceRef="Activity_0nevzrh" targetRef="Event_18r89i0" />\n' +
'    <bpmn2:serviceTask id="Activity_0cotr7l" name="执行发放" type="1" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.TestServiceTaskListener">\n' +
'      <bpmn2:incoming>Flow_1up0h2v</bpmn2:incoming>\n' +
'      <bpmn2:outgoing>Flow_0zeq6ls</bpmn2:outgoing>\n' +
'    </bpmn2:serviceTask>\n' +
'    <bpmn2:sequenceFlow id="Flow_1up0h2v" name="通过" sourceRef="Activity_0nevzrh" targetRef="Activity_0cotr7l" />\n' +
'    <bpmn2:sequenceFlow id="Flow_0zeq6ls" sourceRef="Activity_0cotr7l" targetRef="Activity_18kenek" />\n' +
'  </bpmn2:process>\n' +
'  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
'    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
'      <bpmndi:BPMNEdge id="Flow_0zeq6ls_di" bpmnElement="Flow_0zeq6ls">\n' +
'        <di:waypoint x="510" y="340" />\n' +
'        <di:waypoint x="560" y="340" />\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNEdge id="Flow_1up0h2v_di" bpmnElement="Flow_1up0h2v">\n' +
'        <di:waypoint x="380" y="340" />\n' +
'        <di:waypoint x="450" y="340" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="404" y="322" width="23" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNEdge id="Flow_18p7hy3_di" bpmnElement="Flow_18p7hy3">\n' +
'        <di:waypoint x="350" y="364" />\n' +
'        <di:waypoint x="350" y="432" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="354" y="395" width="22" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNEdge id="Flow_1sk7fdv_di" bpmnElement="Flow_1sk7fdv">\n' +
'        <di:waypoint x="590" y="316" />\n' +
'        <di:waypoint x="590" y="250" />\n' +
'        <di:waypoint x="350" y="250" />\n' +
'        <di:waypoint x="350" y="316" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="459" y="232" width="22" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNEdge id="Flow_1jutiu7_di" bpmnElement="Flow_1jutiu7">\n' +
'        <di:waypoint x="620" y="340" />\n' +
'        <di:waypoint x="712" y="340" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="655" y="322" width="23" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNEdge id="Flow_1ib0cgg_di" bpmnElement="Flow_1ib0cgg">\n' +
'        <di:waypoint x="248" y="340" />\n' +
'        <di:waypoint x="320" y="340" />\n' +
'      </bpmndi:BPMNEdge>\n' +
'      <bpmndi:BPMNShape id="Event_19h0jyz_di" bpmnElement="Event_19h0jyz">\n' +
'        <dc:Bounds x="212" y="322" width="36" height="36" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="218" y="361" width="23" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNShape>\n' +
'      <bpmndi:BPMNShape id="Activity_0nevzrh_di" bpmnElement="Activity_0nevzrh">\n' +
'        <dc:Bounds x="320" y="316" width="60" height="48" />\n' +
'      </bpmndi:BPMNShape>\n' +
'      <bpmndi:BPMNShape id="Activity_18kenek_di" bpmnElement="Activity_18kenek">\n' +
'        <dc:Bounds x="560" y="316" width="60" height="48" />\n' +
'      </bpmndi:BPMNShape>\n' +
'      <bpmndi:BPMNShape id="Event_1xb93ro_di" bpmnElement="Event_1xb93ro">\n' +
'        <dc:Bounds x="712" y="322" width="36" height="36" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="718" y="361" width="23" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNShape>\n' +
'      <bpmndi:BPMNShape id="Event_18r89i0_di" bpmnElement="Event_18r89i0">\n' +
'        <dc:Bounds x="332" y="432" width="36" height="36" />\n' +
'        <bpmndi:BPMNLabel>\n' +
'          <dc:Bounds x="338" y="471" width="23" height="14" />\n' +
'        </bpmndi:BPMNLabel>\n' +
'      </bpmndi:BPMNShape>\n' +
'      <bpmndi:BPMNShape id="Activity_0cotr7l_di" bpmnElement="Activity_0cotr7l">\n' +
'        <dc:Bounds x="450" y="316" width="60" height="48" />\n' +
'      </bpmndi:BPMNShape>\n' +
'    </bpmndi:BPMNPlane>\n' +
'  </bpmndi:BPMNDiagram>\n' +
'</bpmn2:definitions>\n';
// endregion

export const BpmnTag = {
  activity: 'activiti:Activity',
  variable: 'activiti:Variable',
  roleSet: 'activiti:RoleSet',
  taskListener: 'activiti:TaskListener',
  participant: 'activiti:Participant',

  assign: 'activiti:Assign',
  group: 'activiti:Group',
  role: 'activiti:Role',

  repository: 'activiti:Repository',

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
    // return BaseCreateBpmn;
    return CompleteBpmn2;
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

  errorMessage: function (_this,err) {
    _this.$notification.error({
      message: '提示:',
      description: err,
    });
  },
};

