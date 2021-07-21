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
    '    <bpmn2:userTask id="Activity_0xsikp7" name="BOM提交" activiti:async="true">\n' +
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
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_07azpq6" name="提交" priority="1" />\n' +
    '          <activiti:vote id="Flow_1mnsesm" name="取消" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_0yyr904" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_07azpq6" name="提交" sourceRef="Activity_0xsikp7" targetRef="Activity_17wm7nm" />\n' +
    '    <bpmn2:userTask id="Activity_06rkyj6" name="审核" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:group need="ALL" number="" name="Reviewer" type="group" id="6458" />\n' +
    '          <activiti:role need="ALL" number="" name="Process Engineer" type="role" roleCode="Process Engineer" id="Process Engineer" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="Reviewer" name="审核者" code="Reviewer" view="false" add="false" remove="false" sourceRef="Activity_1wdc0wn" />\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1a78dz0" name="通过" priority="4" />\n' +
    '          <activiti:vote id="Flow_0ol4z8x" name="驳回" priority="4" />\n' +
    '          <activiti:vote id="SequenceFlow_1q5s4n7" name="测试3" priority="4" />\n' +
    '          <activiti:vote id="SequenceFlow_0mwnlbw" name="测试4" priority="3" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:outgoing>SequenceFlow_1q5s4n7</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0mwnlbw</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ebytto" name="采购物料" sourceRef="Gateway_0yyr904" targetRef="Activity_06rkyj6">\n' +
    '      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${bomType==1}</bpmn2:conditionExpression>\n' +
    '    </bpmn2:sequenceFlow>\n' +
    '    <bpmn2:userTask id="Activity_1wdc0wn" name="审批" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="审核者" type="role" roleCode="Reviewer" id="Reviewer" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="Process Engineer" name="Process Engineer" code="Process Engineer" view="false" add="false" remove="false" sourceRef="Activity_06rkyj6" />\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_10hxub2" name="通过" priority="2" />\n' +
    '          <activiti:vote id="Flow_0uqer0q" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="SequenceFlow_15xz9wm" name="测试" priority="3" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:outgoing>SequenceFlow_15xz9wm</bpmn2:outgoing>\n' +
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
    '    <bpmn2:serviceTask id="Activity_1bcaeo2" name="角色初始化" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.WfServiceTaskTest" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_0mwnlbw</bpmn2:incoming>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0l36xx3" sourceRef="Event_1amwz96" targetRef="Activity_1bcaeo2" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1moyusb" sourceRef="Activity_1bcaeo2" targetRef="Activity_0xsikp7" />\n' +
    '    <bpmn2:serviceTask id="Activity_17wm7nm" name="状态发放" activiti:class="com.pisx.tundra.foundation.workflow.workflowtest.WfServiceTaskTest" activiti:async="true">\n' +
    '      <bpmn2:incoming>SequenceFlow_1q5s4n7</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>SequenceFlow_15xz9wm</bpmn2:incoming>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_11nw06h" sourceRef="Activity_17wm7nm" targetRef="Gateway_0yyr904" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_1q5s4n7" name="测试3" sourceRef="Activity_06rkyj6" targetRef="Activity_17wm7nm" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0mwnlbw" name="测试4" sourceRef="Activity_06rkyj6" targetRef="Activity_1bcaeo2" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_15xz9wm" name="测试" sourceRef="Activity_1wdc0wn" targetRef="Activity_17wm7nm" />\n' +
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
    '      <bpmndi:BPMNShape id="BPMNShape_Gateway_0oc62o4" bpmnElement="Gateway_0oc62o4" isMarkerVisible="true">\n' +
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
    '      <bpmndi:BPMNEdge id="SequenceFlow_1q5s4n7_di" bpmnElement="SequenceFlow_1q5s4n7">\n' +
    '        <di:waypoint x="660" y="236" />\n' +
    '        <di:waypoint x="660" y="210" />\n' +
    '        <di:waypoint x="460" y="210" />\n' +
    '        <di:waypoint x="460" y="316" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="546" y="192" width="28" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0mwnlbw_di" bpmnElement="SequenceFlow_0mwnlbw">\n' +
    '        <di:waypoint x="660" y="236" />\n' +
    '        <di:waypoint x="660" y="130" />\n' +
    '        <di:waypoint x="170" y="130" />\n' +
    '        <di:waypoint x="170" y="316" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="401" y="112" width="28" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_15xz9wm_di" bpmnElement="SequenceFlow_15xz9wm">\n' +
    '        <di:waypoint x="660" y="458" />\n' +
    '        <di:waypoint x="660" y="490" />\n' +
    '        <di:waypoint x="460" y="490" />\n' +
    '        <di:waypoint x="460" y="364" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="549" y="472" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\n';

const CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="234" isExecutable="true">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:serviceTask id="ServiceTask_01w5qhm" name="CLOSE" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>close</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '    </bpmn2:serviceTask>\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNShape id="ServiceTask_01w5qhm_di" bpmnElement="ServiceTask_01w5qhm">\n' +
    '        <dc:Bounds x="506" y="206" width="48" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>';
// endregion

export const BpmnConfig = {
  statusAutoClass: 'com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener',
  analyzeTypes: ['bpmn:Process', 'bpmn:StartEvent', 'bpmn:UserTask', 'bpmn:SequenceFlow', 'bpmn:ServiceTask', 'bpmn:EndEvent', 'bpmn:InclusiveGateway', 'bpmn:IntermediateCatchEvent'],
  asyncTypes: ['bpmn:UserTask', 'bpmn:ServiceTask'],
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
  deleteSequence(bpmnParams, elementId) {
    for (let key of Object.keys(bpmnParams)) {
      const type = bpmnParams[key].$type;
      if (!type || type !== 'bpmn:UserTask') {
        continue;
      }
      let values = bpmnParams[key].extensionElements.get('values');
      values = values.filter(element => !(element['$type'] === BpmnTag.taskListener && element['event'] === elementId));
      values.forEach(value=>{
        if (value['$type'] === BpmnTag.voteSelect){
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

