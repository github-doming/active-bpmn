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
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="OR_com.pisx.tundra.foundation.workflow.model.WfProcessTemplateMaster_10298" name="EarlyBOM审批" isExecutable="true">\n' +
    '    <bpmn2:extensionElements>\n' +
    '      <activiti:variable xmlns:activiti="http://activiti.org/bpmn" id="BOM01" name="bomType" defaultDisplay="bomType" displayZhCn="BOM类型" displayEnUs="bomType" type="int" defaultValue="1" isVisible="false" isNecessary="false" isReadOnly="false" isReset="true" />\n' +
    '    </bpmn2:extensionElements>\n' +
    '    <bpmn2:startEvent id="Event_1amwz96" name="开始" />\n' +
    '    <bpmn2:userTask id="Activity_0xsikp7" name="BOM提交">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_role_id" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="Reviewer" name="审核者" code="Reviewer" view="true" add="true" remove="true" sourceRef="Activity_1wdc0wn">\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="Process Engineer" name="Process Engineer" code="Process Engineer" view="true" add="true" remove="true" sourceRef="Activity_06rkyj6">\n' +
    '          <activiti:repository id="6458" name="Reviewer" type="group" />\n' +
    '        </activiti:roleSet>\n' +
    '      </bpmn2:extensionElements>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_0yyr904" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_07azpq6" name="提交" sourceRef="Activity_0xsikp7" targetRef="Activity_17wm7nm" />\n' +
    '    <bpmn2:userTask id="Activity_06rkyj6" name="审核">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:group need="ALL" number="" name="Reviewer" type="group" id="6458" />\n' +
    '          <activiti:role need="ALL" number="" name="Process Engineer" type="role" roleCode="Process Engineer" id="Process Engineer" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="Reviewer" name="审核者" code="Reviewer" view="false" add="false" remove="false" sourceRef="Activity_1wdc0wn" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ebytto" name="采购物料" sourceRef="Gateway_0yyr904" targetRef="Activity_06rkyj6">\n' +
    '      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${bomType==1}</bpmn2:conditionExpression>\n' +
    '    </bpmn2:sequenceFlow>\n' +
    '    <bpmn2:userTask id="Activity_1wdc0wn" name="审批">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="审核者" type="role" roleCode="Reviewer" id="Reviewer" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="Process Engineer" name="Process Engineer" code="Process Engineer" view="false" add="false" remove="false" sourceRef="Activity_06rkyj6" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1y33o5p" name="自制BOM" sourceRef="Gateway_0yyr904" targetRef="Activity_1wdc0wn">\n' +
    '      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${bomType==2}</bpmn2:conditionExpression>\n' +
    '    </bpmn2:sequenceFlow>\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_0oc62o4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1a78dz0" name="通过" sourceRef="Activity_06rkyj6" targetRef="Gateway_0oc62o4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_10hxub2" name="通过" sourceRef="Activity_1wdc0wn" targetRef="Gateway_0oc62o4" />\n' +
    '    <bpmn2:endEvent id="Event_1kurwyq" name="结束" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_08vzxns" sourceRef="Gateway_0oc62o4" targetRef="Event_1kurwyq" />\n' +
    '    <bpmn2:endEvent id="Event_1qyvtf0" name="结束" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1mnsesm" name="取消" sourceRef="Activity_0xsikp7" targetRef="Event_1qyvtf0" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ol4z8x" name="驳回" sourceRef="Activity_06rkyj6" targetRef="Activity_0xsikp7" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0uqer0q" name="驳回" sourceRef="Activity_1wdc0wn" targetRef="Activity_0xsikp7" />\n' +
    '    <bpmn2:serviceTask id="Activity_1bcaeo2" name="角色初始化" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.WfServiceTaskTest" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0l36xx3" sourceRef="Event_1amwz96" targetRef="Activity_1bcaeo2" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1moyusb" sourceRef="Activity_1bcaeo2" targetRef="Activity_0xsikp7" />\n' +
    '    <bpmn2:serviceTask id="Activity_17wm7nm" name="状态发放" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.WfServiceTaskTest" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_11nw06h" sourceRef="Activity_17wm7nm" targetRef="Gateway_0yyr904" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_OR_com.pisx.tundra.foundation.workflow.model.WfProcessTemplateMaster_10298">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_OR_com.pisx.tundra.foundation.workflow.model.WfProcessTemplateMaster_10298" bpmnElement="OR_com.pisx.tundra.foundation.workflow.model.WfProcessTemplateMaster_10298">\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Event_1amwz96" bpmnElement="Event_1amwz96">\n' +
    '        <dc:Bounds x="62" y="322" width="36" height="36" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Activity_0xsikp7" bpmnElement="Activity_0xsikp7">\n' +
    '        <dc:Bounds x="270" y="316" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Gateway_0yyr904" bpmnElement="Gateway_0yyr904" isMarkerVisible="true">\n' +
    '        <dc:Bounds x="575" y="315" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Activity_06rkyj6" bpmnElement="Activity_06rkyj6">\n' +
    '        <dc:Bounds x="630" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Activity_1wdc0wn" bpmnElement="Activity_1wdc0wn">\n' +
    '        <dc:Bounds x="630" y="410" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Gateway_0oc62o4" bpmnElement="Gateway_0oc62o4">\n' +
    '        <dc:Bounds x="745" y="315" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Event_1kurwyq" bpmnElement="Event_1kurwyq">\n' +
    '        <dc:Bounds x="872" y="322" width="36" height="36" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Event_1qyvtf0" bpmnElement="Event_1qyvtf0">\n' +
    '        <dc:Bounds x="182" y="492" width="36" height="36" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Activity_1bcaeo2" bpmnElement="Activity_1bcaeo2">\n' +
    '        <dc:Bounds x="140" y="316" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_Activity_17wm7nm" bpmnElement="Activity_17wm7nm">\n' +
    '        <dc:Bounds x="430" y="316" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_11nw06h" bpmnElement="Flow_11nw06h">\n' +
    '        <di:waypoint x="490" y="340" />\n' +
    '        <di:waypoint x="575" y="340" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1moyusb" bpmnElement="Flow_1moyusb">\n' +
    '        <di:waypoint x="200" y="340" />\n' +
    '        <di:waypoint x="270" y="340" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_0l36xx3" bpmnElement="Flow_0l36xx3">\n' +
    '        <di:waypoint x="98" y="340" />\n' +
    '        <di:waypoint x="140" y="340" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_0uqer0q" bpmnElement="Flow_0uqer0q">\n' +
    '        <di:waypoint x="660" y="458" />\n' +
    '        <di:waypoint x="660" y="570" />\n' +
    '        <di:waypoint x="300" y="570" />\n' +
    '        <di:waypoint x="300" y="364" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="469" y="552" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_0ol4z8x" bpmnElement="Flow_0ol4z8x">\n' +
    '        <di:waypoint x="660" y="236" />\n' +
    '        <di:waypoint x="660" y="170" />\n' +
    '        <di:waypoint x="300" y="170" />\n' +
    '        <di:waypoint x="300" y="316" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="469" y="152" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1mnsesm" bpmnElement="Flow_1mnsesm">\n' +
    '        <di:waypoint x="287" y="364" />\n' +
    '        <di:waypoint x="210" y="495" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="251" y="374" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_08vzxns" bpmnElement="Flow_08vzxns">\n' +
    '        <di:waypoint x="795" y="340" />\n' +
    '        <di:waypoint x="872" y="340" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_10hxub2" bpmnElement="Flow_10hxub2">\n' +
    '        <di:waypoint x="690" y="434" />\n' +
    '        <di:waypoint x="770" y="434" />\n' +
    '        <di:waypoint x="770" y="365" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="719" y="416" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1a78dz0" bpmnElement="Flow_1a78dz0">\n' +
    '        <di:waypoint x="690" y="260" />\n' +
    '        <di:waypoint x="770" y="260" />\n' +
    '        <di:waypoint x="770" y="315" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="719" y="242" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1y33o5p" bpmnElement="Flow_1y33o5p">\n' +
    '        <di:waypoint x="600" y="365" />\n' +
    '        <di:waypoint x="600" y="434" />\n' +
    '        <di:waypoint x="630" y="434" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="589" y="413" width="48" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1ebytto" bpmnElement="Flow_1ebytto">\n' +
    '        <di:waypoint x="600" y="315" />\n' +
    '        <di:waypoint x="600" y="260" />\n' +
    '        <di:waypoint x="630" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="590" y="243" width="45" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="BPMNEdge_Flow_07azpq6" bpmnElement="Flow_07azpq6">\n' +
    '        <di:waypoint x="330" y="340" />\n' +
    '        <di:waypoint x="430" y="340" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="369" y="322" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\nd';

const CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="请假申请流程" isExecutable="true" description="description">\n' +
    '    <bpmn2:extensionElements>\n' +
    '      <activiti:variable id="BOM01" name="leaveCount" defaultDisplay="请假天数" displayZhCn="请假天数" displayEnUs="leaveCount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" />\n' +
    '    </bpmn2:extensionElements>\n' +
    '    <bpmn2:startEvent id="Event_19h0jyz" name="开始">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:outgoing>Flow_1ib0cgg</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="Activity_0nevzrh" name="替代申请">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:participant>\n' +
    '          <activiti:assign userName="jwzhao" type="user" id="5372" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:variable id="BOM01" name="leaveCount" defaultDisplay="请假天数" displayZhCn="请假天数" displayEnUs="leaveCount" type="int" defaultValue="1" isVisible="true" isNecessary="true" isReadOnly="false" isReset="true" initFormVarKey="leaveCount" />\n' +
    '        <activiti:roleSet id="2560" name="Project Manager" code="PM" view="true" add="true" remove="true" sourceRef="Activity_18kenek" />\n' +
    '        <activiti:formTemplate taskFormTemplate="Audit - Conduct Audit" />\n' +
    '        <activiti:taskListener event="assignment" class="TestCompletedTaskListener2" />\n' +
    '        <activiti:taskListener event="Flow_1up0h2v" class="TestCompletedTaskListener3" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1ib0cgg</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1up0h2v</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0x0l74k</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ib0cgg" sourceRef="Event_19h0jyz" targetRef="Activity_0nevzrh" />\n' +
    '    <bpmn2:userTask id="Activity_18kenek" name="主管审批">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ANY" number="" name="Project Manager" type="role" roleCode="PM" id="2560" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:formTemplate />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0zeq6ls</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>SequenceFlow_17elsky</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1jutiu7</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:endEvent id="Event_1xb93ro" name="结束">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_1jutiu7</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>SequenceFlow_1iug3rb</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1jutiu7" name="通过" sourceRef="Activity_18kenek" targetRef="Event_1xb93ro" />\n' +
    '    <bpmn2:endEvent id="Event_18r89i0" name="结束">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:participant />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_0x0l74k</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:serviceTask id="Activity_0cotr7l" name="执行发放" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.TestServiceTaskListener">\n' +
    '      <bpmn2:incoming>Flow_1up0h2v</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0zeq6ls</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0oseb0r</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1up0h2v" name="通过" sourceRef="Activity_0nevzrh" targetRef="Activity_0cotr7l" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0zeq6ls" sourceRef="Activity_0cotr7l" targetRef="Activity_18kenek" />\n' +
    '    <bpmn2:exclusiveGateway id="ExclusiveGateway_0x0zqz6">\n' +
    '      <bpmn2:incoming>SequenceFlow_0oseb0r</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>SequenceFlow_17elsky</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0m4qmim</bpmn2:outgoing>\n' +
    '    </bpmn2:exclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0oseb0r" sourceRef="Activity_0cotr7l" targetRef="ExclusiveGateway_0x0zqz6" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_17elsky" sourceRef="ExclusiveGateway_0x0zqz6" targetRef="Activity_18kenek" />\n' +
    '    <bpmn2:userTask id="UserTask_11teixm" name="经理审核">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_role_id" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="2560" name="Project Manager" code="PM" view="false" add="false" remove="false" sourceRef="Activity_18kenek" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_0m4qmim</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>SequenceFlow_1iug3rb</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0m4qmim" sourceRef="ExclusiveGateway_0x0zqz6" targetRef="UserTask_11teixm" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_1iug3rb" sourceRef="UserTask_11teixm" targetRef="Event_1xb93ro" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0x0l74k" name="驳回" sourceRef="Activity_0nevzrh" targetRef="Event_18r89i0" condition="" />\n' +
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
    '          <dc:Bounds x="718" y="298" width="23" height="14" />\n' +
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
    '      <bpmndi:BPMNShape id="ExclusiveGateway_0x0zqz6_di" bpmnElement="ExclusiveGateway_0x0zqz6" isMarkerVisible="true">\n' +
    '        <dc:Bounds x="455" y="425" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0oseb0r_di" bpmnElement="SequenceFlow_0oseb0r">\n' +
    '        <di:waypoint x="480" y="364" />\n' +
    '        <di:waypoint x="480" y="425" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_17elsky_di" bpmnElement="SequenceFlow_17elsky">\n' +
    '        <di:waypoint x="505" y="450" />\n' +
    '        <di:waypoint x="590" y="450" />\n' +
    '        <di:waypoint x="590" y="364" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="UserTask_11teixm_di" bpmnElement="UserTask_11teixm">\n' +
    '        <dc:Bounds x="450" y="536" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0m4qmim_di" bpmnElement="SequenceFlow_0m4qmim">\n' +
    '        <di:waypoint x="480" y="475" />\n' +
    '        <di:waypoint x="480" y="536" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_1iug3rb_di" bpmnElement="SequenceFlow_1iug3rb">\n' +
    '        <di:waypoint x="510" y="560" />\n' +
    '        <di:waypoint x="730" y="560" />\n' +
    '        <di:waypoint x="730" y="358" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0x0l74k_di" bpmnElement="SequenceFlow_0x0l74k">\n' +
    '        <di:waypoint x="350" y="364" />\n' +
    '        <di:waypoint x="350" y="432" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="354" y="395" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>';
// endregion

export const BpmnTag = {
  formTemplate: 'activiti:FormTemplate',
  variable: 'activiti:Variable',
  roleSet: 'activiti:RoleSet',
  taskListener: 'activiti:TaskListener',
  participant: 'activiti:Participant',

  assign: 'activiti:Assign',
  group: 'activiti:Group',
  role: 'activiti:Role',
  threshold: 'activiti:Threshold',
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
    return CompleteBpmn;
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
  deleteTaskListener(bpmnParams, elementId) {
    for (let key of Object.keys(bpmnParams)) {
      const type = bpmnParams[key].$type;
      if (!type || type !== 'bpmn:UserTask') {
        continue;
      }
      let values = bpmnParams[key].extensionElements.get('values');
      values = values.filter(element => !(element['$type'] === BpmnTag.taskListener && element['event'] === elementId));
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

