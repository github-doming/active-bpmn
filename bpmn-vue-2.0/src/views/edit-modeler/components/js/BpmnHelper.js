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
    '  <bpmn2:process id="Process_1" name="原材料（RMS）生效流程" isExecutable="true" description="原材料（RMS）生效流程">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:startEvent id="Event_1q1a1p8" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_1fap0wu</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1fap0wu" sourceRef="Event_1q1a1p8" targetRef="Activity_1n4xmuu" />\n' +
    '    <bpmn2:userTask id="Activity_04mwg3c" name="采购审批" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate signingRequired="true" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="采购" type="role" roleCode="Buyer" id="Buyer" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1od4zog" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0iw1jse" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:taskListener event="Flow_1od4zog" class="com.pisx.tundra.bioengine.part.taskListener.OperatingAuthorizationSignatureTaskListener" name="通过" />\n' +
    '        <activiti:roleSet id="Department Leader" name="部门主管" code="Department Leader" view="false" add="false" remove="false" sourceRef="Activity_1hxzz7c" />\n' +
    '        <activiti:roleSet id="QA" name="QA" code="QA" view="false" add="false" remove="false" sourceRef="Activity_0l5h44u" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_06lgdlv</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1od4zog</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0iw1jse</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_0l5h44u" name="质量审计" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate signingRequired="true" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="QA" type="role" roleCode="QA" id="QA" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0fyp2no" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0axvqpc" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Department Leader" name="部门主管" code="Department Leader" view="false" add="false" remove="false" sourceRef="Activity_1hxzz7c" />\n' +
    '        <activiti:roleSet id="Buyer" name="采购" code="Buyer" view="false" add="false" remove="false" sourceRef="Activity_04mwg3c" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1od4zog</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0fyp2no</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0axvqpc</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1od4zog" name="通过" sourceRef="Activity_04mwg3c" targetRef="Activity_0l5h44u" />\n' +
    '    <bpmn2:userTask id="Activity_0ekz7bm" name="质量确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate signingRequired="true" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:assign userName="YANGZHUO" type="user" id="14494" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:taskListener event="Flow_03tqnlr" class="com.pisx.tundra.bioengine.part.taskListener.QualityAuthorizationSignatureTaskListener" />\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_03tqnlr" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0gb1en9" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_10sllb1" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:taskListener event="Flow_0gb1en9" class="com.pisx.tundra.bioengine.part.taskListener.QualityAuthorizationSignatureTaskListener" name="通过" />\n' +
    '        <activiti:roleSet id="Department Leader" name="部门主管" code="Department Leader" view="false" add="false" remove="false" sourceRef="Activity_1hxzz7c" />\n' +
    '        <activiti:roleSet id="Buyer" name="采购" code="Buyer" view="false" add="false" remove="false" sourceRef="Activity_04mwg3c" />\n' +
    '        <activiti:roleSet id="QA" name="QA" code="QA" view="false" add="false" remove="false" sourceRef="Activity_0l5h44u" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0fyp2no</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0gb1en9</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_10sllb1</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0fyp2no" name="通过" sourceRef="Activity_0l5h44u" targetRef="Activity_0ekz7bm" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_03tqnlr" name="通过" sourceRef="Activity_08aako4" targetRef="Activity_0hvtfwq" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1sougaq" name="" sourceRef="Activity_0ohjkis" targetRef="Activity_1n4xmuu" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0iw1jse" name="驳回" sourceRef="Activity_04mwg3c" targetRef="Activity_0ohjkis" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0axvqpc" name="驳回" sourceRef="Activity_0l5h44u" targetRef="Activity_0ohjkis" />\n' +
    '    <bpmn2:userTask id="Activity_1n4xmuu" name="编制" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="操作者" type="role" roleCode="operator_code" id="operator_role_id" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1gyy3w0" name="完成" priority="1" />\n' +
    '          <activiti:vote id="Flow_1goohf3" name="取消" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Department Leader" name="部门主管" code="Department Leader" view="true" add="true" remove="true" sourceRef="Activity_1hxzz7c">\n' +
    '          <activiti:repository id="64079" name="部门主管" type="group" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="Buyer" name="采购" code="Buyer" view="true" add="true" remove="true" sourceRef="Activity_04mwg3c">\n' +
    '          <activiti:repository id="64089" name="采购" type="group" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="QA" name="QA" code="QA" view="true" add="true" remove="true" sourceRef="Activity_0l5h44u">\n' +
    '          <activiti:repository id="64062" name="QA" type="group" />\n' +
    '        </activiti:roleSet>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1sougaq</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1fap0wu</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1gyy3w0</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1goohf3</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1gyy3w0" name="完成" sourceRef="Activity_1n4xmuu" targetRef="Activity_0u43fps" condition="" />\n' +
    '    <bpmn2:endEvent id="Event_1rzzg9x" name="结束">\n' +
    '      <bpmn2:incoming>Flow_0otumd5</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:serviceTask id="Activity_0u43fps" name="正在审阅" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>UNDERREVIEW</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1gyy3w0</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1ancnrm</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_0ohjkis" name="重新工作" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>REWORK</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0axvqpc</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0iw1jse</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1m025or</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_10sllb1</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0k486ni</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1sougaq</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_0hvtfwq" name="生效" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>EFFECT</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_03tqnlr</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_09ic98n</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_1tci20o" name="物料同步ERP" activiti:async="true" activiti:class="com.pisx.tundra.bioengine.part.taskListener.EPRWLEffectTaskListener">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_09ic98n</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_06fgp11</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_09ic98n" sourceRef="Activity_0hvtfwq" targetRef="Activity_1tci20o" />\n' +
    '    <bpmn2:serviceTask id="Activity_07yacz2" name="RMS同步QMS" activiti:async="true" activiti:class="com.pisx.tundra.bioengine.part.taskListener.ControlledDocumentSendQMSTaskListener">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_06fgp11</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1e9p9wm</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_06fgp11" sourceRef="Activity_1tci20o" targetRef="Activity_07yacz2" />\n' +
    '    <bpmn2:endEvent id="Event_00e66zb" name="结束">\n' +
    '      <bpmn2:incoming>Flow_1e9p9wm</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1e9p9wm" sourceRef="Activity_07yacz2" targetRef="Event_00e66zb" />\n' +
    '    <bpmn2:serviceTask id="Activity_1lspri4" name="正在工作" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>INWORK</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1goohf3</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0otumd5</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1goohf3" name="取消" sourceRef="Activity_1n4xmuu" targetRef="Activity_1lspri4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0otumd5" sourceRef="Activity_1lspri4" targetRef="Event_1rzzg9x" />\n' +
    '    <bpmn2:userTask id="Activity_08aako4" name="领导批准" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate signingRequired="true" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:assign userName="ashi" type="user" id="14516" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="operator_role_id" name="操作者" code="operator_code" view="false" add="false" remove="false" sourceRef="Activity_1n4xmuu" />\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_03tqnlr" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_1m025or" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:taskListener event="Flow_03tqnlr" class="com.pisx.tundra.bioengine.part.taskListener.ManagerAuthorizationSignatureTaskListener" name="通过" />\n' +
    '        <activiti:taskListener event="Flow_03tqnlr" class="com.pisx.tundra.bioengine.part.taskListener.RebuildSignaturePDFTaskListener" name="通过" />\n' +
    '        <activiti:roleSet id="Department Leader" name="部门主管" code="Department Leader" view="false" add="false" remove="false" sourceRef="Activity_1hxzz7c" />\n' +
    '        <activiti:roleSet id="Buyer" name="采购" code="Buyer" view="false" add="false" remove="false" sourceRef="Activity_04mwg3c" />\n' +
    '        <activiti:roleSet id="QA" name="QA" code="QA" view="false" add="false" remove="false" sourceRef="Activity_0l5h44u" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0gb1en9</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_03tqnlr</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1m025or</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1m025or" name="驳回" sourceRef="Activity_08aako4" targetRef="Activity_0ohjkis" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0gb1en9" name="通过" sourceRef="Activity_0ekz7bm" targetRef="Activity_08aako4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_10sllb1" name="驳回" sourceRef="Activity_0ekz7bm" targetRef="Activity_0ohjkis" />\n' +
    '    <bpmn2:userTask id="Activity_1hxzz7c" name="审核" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate signingRequired="true" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="部门主管" type="role" roleCode="Department Leader" id="Department Leader" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="operator_role_id" name="操作者" code="operator_code" view="false" add="false" remove="false" sourceRef="Activity_1n4xmuu" />\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_06lgdlv" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0k486ni" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Buyer" name="采购" code="Buyer" view="false" add="false" remove="false" sourceRef="Activity_04mwg3c" />\n' +
    '        <activiti:roleSet id="QA" name="QA" code="QA" view="false" add="false" remove="false" sourceRef="Activity_0l5h44u" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1ancnrm</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_06lgdlv</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0k486ni</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ancnrm" sourceRef="Activity_0u43fps" targetRef="Activity_1hxzz7c" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_06lgdlv" name="通过" sourceRef="Activity_1hxzz7c" targetRef="Activity_04mwg3c" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0k486ni" name="驳回" sourceRef="Activity_1hxzz7c" targetRef="Activity_0ohjkis" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNEdge id="Flow_0k486ni_di" bpmnElement="Flow_0k486ni">\n' +
    '        <di:waypoint x="480" y="236" />\n' +
    '        <di:waypoint x="480" y="110" />\n' +
    '        <di:waypoint x="394" y="110" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="449" y="173" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_06lgdlv_di" bpmnElement="Flow_06lgdlv">\n' +
    '        <di:waypoint x="510" y="260" />\n' +
    '        <di:waypoint x="570" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="529" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1ancnrm_di" bpmnElement="Flow_1ancnrm">\n' +
    '        <di:waypoint x="394" y="260" />\n' +
    '        <di:waypoint x="450" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_10sllb1_di" bpmnElement="Flow_10sllb1">\n' +
    '        <di:waypoint x="820" y="236" />\n' +
    '        <di:waypoint x="820" y="110" />\n' +
    '        <di:waypoint x="394" y="110" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="789" y="173" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0gb1en9_di" bpmnElement="Flow_0gb1en9">\n' +
    '        <di:waypoint x="850" y="260" />\n' +
    '        <di:waypoint x="910" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="870" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1m025or_di" bpmnElement="Flow_1m025or">\n' +
    '        <di:waypoint x="940" y="236" />\n' +
    '        <di:waypoint x="940" y="110" />\n' +
    '        <di:waypoint x="394" y="110" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="909" y="173" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0otumd5_di" bpmnElement="Flow_0otumd5">\n' +
    '        <di:waypoint x="236" y="360" />\n' +
    '        <di:waypoint x="148" y="360" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1goohf3_di" bpmnElement="Flow_1goohf3">\n' +
    '        <di:waypoint x="260" y="284" />\n' +
    '        <di:waypoint x="260" y="336" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="256" y="295" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1e9p9wm_di" bpmnElement="Flow_1e9p9wm">\n' +
    '        <di:waypoint x="1260" y="260" />\n' +
    '        <di:waypoint x="1312" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_06fgp11_di" bpmnElement="Flow_06fgp11">\n' +
    '        <di:waypoint x="1170" y="260" />\n' +
    '        <di:waypoint x="1200" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_09ic98n_di" bpmnElement="Flow_09ic98n">\n' +
    '        <di:waypoint x="1074" y="260" />\n' +
    '        <di:waypoint x="1110" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1gyy3w0_di" bpmnElement="Flow_1gyy3w0">\n' +
    '        <di:waypoint x="290" y="260" />\n' +
    '        <di:waypoint x="346" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="309" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0axvqpc_di" bpmnElement="Flow_0axvqpc">\n' +
    '        <di:waypoint x="710" y="236" />\n' +
    '        <di:waypoint x="710" y="110" />\n' +
    '        <di:waypoint x="394" y="110" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="679" y="173" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0iw1jse_di" bpmnElement="Flow_0iw1jse">\n' +
    '        <di:waypoint x="600" y="236" />\n' +
    '        <di:waypoint x="600" y="110" />\n' +
    '        <di:waypoint x="394" y="110" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="569" y="173" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1sougaq_di" bpmnElement="Flow_1sougaq">\n' +
    '        <di:waypoint x="346" y="110" />\n' +
    '        <di:waypoint x="260" y="110" />\n' +
    '        <di:waypoint x="260" y="236" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="397" y="-107" width="55" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_03tqnlr_di" bpmnElement="Flow_03tqnlr">\n' +
    '        <di:waypoint x="970" y="260" />\n' +
    '        <di:waypoint x="1026" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="988" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0fyp2no_di" bpmnElement="Flow_0fyp2no">\n' +
    '        <di:waypoint x="740" y="260" />\n' +
    '        <di:waypoint x="790" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="754" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1od4zog_di" bpmnElement="Flow_1od4zog">\n' +
    '        <di:waypoint x="630" y="260" />\n' +
    '        <di:waypoint x="680" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="647" y="242" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1fap0wu_di" bpmnElement="Flow_1fap0wu">\n' +
    '        <di:waypoint x="148" y="260" />\n' +
    '        <di:waypoint x="230" y="260" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="Event_1q1a1p8_di" bpmnElement="Event_1q1a1p8">\n' +
    '        <dc:Bounds x="112" y="242" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="120" y="281" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_04mwg3c_di" bpmnElement="Activity_04mwg3c">\n' +
    '        <dc:Bounds x="570" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0l5h44u_di" bpmnElement="Activity_0l5h44u">\n' +
    '        <dc:Bounds x="680" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0ekz7bm_di" bpmnElement="Activity_0ekz7bm">\n' +
    '        <dc:Bounds x="790" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1n4xmuu_di" bpmnElement="Activity_1n4xmuu">\n' +
    '        <dc:Bounds x="230" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_1rzzg9x_di" bpmnElement="Event_1rzzg9x">\n' +
    '        <dc:Bounds x="112" y="342" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="119" y="381" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0u43fps_di" bpmnElement="Activity_0u43fps">\n' +
    '        <dc:Bounds x="346" y="236" width="48" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0ohjkis_di" bpmnElement="Activity_0ohjkis">\n' +
    '        <dc:Bounds x="346" y="86" width="48" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0hvtfwq_di" bpmnElement="Activity_0hvtfwq">\n' +
    '        <dc:Bounds x="1026" y="236" width="48" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1tci20o_di" bpmnElement="Activity_1tci20o">\n' +
    '        <dc:Bounds x="1110" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_07yacz2_di" bpmnElement="Activity_07yacz2">\n' +
    '        <dc:Bounds x="1200" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_00e66zb_di" bpmnElement="Event_00e66zb">\n' +
    '        <dc:Bounds x="1312" y="242" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="1319" y="281" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1lspri4_di" bpmnElement="Activity_1lspri4">\n' +
    '        <dc:Bounds x="236" y="336" width="48" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_08aako4_di" bpmnElement="Activity_08aako4">\n' +
    '        <dc:Bounds x="910" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1hxzz7c_di" bpmnElement="Activity_1hxzz7c">\n' +
    '        <dc:Bounds x="450" y="236" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\n';

const CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="Review Default Workflow" isExecutable="true">\n' +
    '    <bpmn2:extensionElements>\n' +
    '      <activiti:variable id="BOM01" name="mustNodes" type="String" isVisible="false" isNecessary="false" isReadOnly="true" isReset="false" />\n' +
    '      <activiti:variable id="BOM11" name="reviewComponents" type="String" isVisible="false" isNecessary="false" isReadOnly="true" isReset="false" />\n' +
    '    </bpmn2:extensionElements>\n' +
    '    <bpmn2:startEvent id="Event_1whgwyg" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_1ghsytk</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:endEvent id="Event_0mc5ds7" name="结束">\n' +
    '      <bpmn2:incoming>Flow_09znbip</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0ldk4cu</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:userTask id="Activity_18e76jc" name="编制" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_role_id" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="true" add="true" remove="true" sourceRef="Activity_1fv40xo">\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="true" add="true" remove="true" sourceRef="Activity_1pziul5">\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="true" add="true" remove="true" sourceRef="Activity_0ytk9my">\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0an0fxm" name="提交" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1ghsytk</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1v7i3ug</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0ccbp9d</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0vndikt</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0an0fxm</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0ldk4cu</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0an0fxm" name="提交" sourceRef="Activity_18e76jc" targetRef="Activity_1fv40xo" condition="" />\n' +
    '    <bpmn2:userTask id="Activity_0ytk9my" name="领域审核" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="false" add="false" remove="false" sourceRef="Activity_1fv40xo" />\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="false" add="false" remove="false" sourceRef="Activity_1pziul5" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_09qt0wj" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1qije44</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0hms8s0</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0kohcxs</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0hms8s0" name="通过" sourceRef="Activity_0ytk9my" targetRef="Activity_09qt0wj" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ghsytk" name="开始" sourceRef="Event_1whgwyg" targetRef="Activity_18e76jc" condition="" />\n' +
    '    <bpmn2:userTask id="Activity_1fv40xo" name="各领域自检" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="项目管理者" type="role" roleCode="PIProjectContainer Administrators" id="PIProjectContainer Administrators" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="false" add="false" remove="false" sourceRef="Activity_1pziul5" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_0ytk9my" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0an0fxm</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1urhgc9</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_15yz3zw</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1pziul5" name="领域会签" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="研发部所负责人" type="role" roleCode="RDC" id="RDC" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="false" add="false" remove="false" sourceRef="Activity_1fv40xo" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_0ytk9my" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0ax8h14</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1qije44</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1183lft</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1qije44" name="通过" sourceRef="Activity_1pziul5" targetRef="Activity_0ytk9my" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1urhgc9" name="通过" sourceRef="Activity_1fv40xo" targetRef="Activity_1bt954g" condition="" />\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_0r6jw4x">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_0kohcxs</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_15yz3zw</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1183lft</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1eqy314</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0jk64s9</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1v7i3ug</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0kohcxs" name="不通过" sourceRef="Activity_0ytk9my" targetRef="Gateway_0r6jw4x" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1v7i3ug" sourceRef="Gateway_0r6jw4x" targetRef="Activity_18e76jc" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_15yz3zw" name="不通过" sourceRef="Activity_1fv40xo" targetRef="Gateway_0r6jw4x" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1183lft" name="不通过" sourceRef="Activity_1pziul5" targetRef="Gateway_0r6jw4x" condition="" />\n' +
    '    <bpmn2:userTask id="Activity_09qt0wj" name="PDT经理审核" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_0ytk9my" />\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="false" add="false" remove="false" sourceRef="Activity_1fv40xo" />\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="false" add="false" remove="false" sourceRef="Activity_1pziul5" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0hms8s0</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0nb2v07</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0ccbp9d</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1kty6si" name="发布评审报告" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_0ytk9my" />\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="false" add="false" remove="false" sourceRef="Activity_1fv40xo" />\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="false" add="false" remove="false" sourceRef="Activity_1pziul5" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0nb2v07</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_09znbip</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0vndikt</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0nb2v07" name="通过" sourceRef="Activity_09qt0wj" targetRef="Activity_1kty6si" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_09znbip" name="通过" sourceRef="Activity_1kty6si" targetRef="Event_0mc5ds7" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ccbp9d" name="不通过" sourceRef="Activity_09qt0wj" targetRef="Activity_18e76jc" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0vndikt" name="不通过" sourceRef="Activity_1kty6si" targetRef="Activity_18e76jc" condition="" />\n' +
    '    <bpmn2:userTask id="Activity_1bt954g" name="SE完成评审报告" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_role_id" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1kty6si" />\n' +
    '        <activiti:roleSet id="PIProjectContainer Administrators" name="项目管理者" code="PIProjectContainer Administrators" view="false" add="false" remove="false" sourceRef="Activity_1fv40xo" />\n' +
    '        <activiti:roleSet id="RDC" name="研发部所负责人" code="RDC" view="false" add="false" remove="false" sourceRef="Activity_1pziul5" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1urhgc9</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1eqy314</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0jk64s9</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0ax8h14</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1eqy314" name="通过" sourceRef="Activity_1bt954g" targetRef="Gateway_0r6jw4x" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0jk64s9" name="不通过" sourceRef="Activity_1bt954g" targetRef="Gateway_0r6jw4x" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ax8h14" name="带条件通过" sourceRef="Activity_1bt954g" targetRef="Activity_1pziul5" condition="" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ldk4cu" name="取消" sourceRef="Activity_18e76jc" targetRef="Event_0mc5ds7" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ax8h14_di" bpmnElement="Flow_0ax8h14">\n' +
    '        <di:waypoint x="560" y="226" />\n' +
    '        <di:waypoint x="560" y="200" />\n' +
    '        <di:waypoint x="690" y="200" />\n' +
    '        <di:waypoint x="690" y="226" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="598" y="182" width="55" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0jk64s9_di" bpmnElement="Flow_0jk64s9">\n' +
    '        <di:waypoint x="560" y="274" />\n' +
    '        <di:waypoint x="560" y="370" />\n' +
    '        <di:waypoint x="685" y="370" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="559" y="319" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1eqy314_di" bpmnElement="Flow_1eqy314">\n' +
    '        <di:waypoint x="590" y="250" />\n' +
    '        <di:waypoint x="710" y="250" />\n' +
    '        <di:waypoint x="710" y="345" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="629" y="253" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0vndikt_di" bpmnElement="Flow_0vndikt">\n' +
    '        <di:waypoint x="1150" y="226" />\n' +
    '        <di:waypoint x="1150" y="160" />\n' +
    '        <di:waypoint x="290" y="160" />\n' +
    '        <di:waypoint x="290" y="226" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="704" y="142" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ccbp9d_di" bpmnElement="Flow_0ccbp9d">\n' +
    '        <di:waypoint x="1020" y="226" />\n' +
    '        <di:waypoint x="1020" y="190" />\n' +
    '        <di:waypoint x="290" y="190" />\n' +
    '        <di:waypoint x="290" y="226" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="639" y="172" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_09znbip_di" bpmnElement="Flow_09znbip">\n' +
    '        <di:waypoint x="1180" y="250" />\n' +
    '        <di:waypoint x="1232" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="1195" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0nb2v07_di" bpmnElement="Flow_0nb2v07">\n' +
    '        <di:waypoint x="1050" y="250" />\n' +
    '        <di:waypoint x="1120" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="1074" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1183lft_di" bpmnElement="Flow_1183lft">\n' +
    '        <di:waypoint x="710" y="274" />\n' +
    '        <di:waypoint x="710" y="345" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="723" y="303" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_15yz3zw_di" bpmnElement="Flow_15yz3zw">\n' +
    '        <di:waypoint x="430" y="274" />\n' +
    '        <di:waypoint x="430" y="390" />\n' +
    '        <di:waypoint x="705" y="390" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="429" y="331" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1v7i3ug_di" bpmnElement="Flow_1v7i3ug">\n' +
    '        <di:waypoint x="710" y="395" />\n' +
    '        <di:waypoint x="710" y="430" />\n' +
    '        <di:waypoint x="290" y="430" />\n' +
    '        <di:waypoint x="290" y="274" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0kohcxs_di" bpmnElement="Flow_0kohcxs">\n' +
    '        <di:waypoint x="890" y="274" />\n' +
    '        <di:waypoint x="890" y="370" />\n' +
    '        <di:waypoint x="735" y="370" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="889" y="320" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1urhgc9_di" bpmnElement="Flow_1urhgc9">\n' +
    '        <di:waypoint x="460" y="250" />\n' +
    '        <di:waypoint x="530" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="484" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1qije44_di" bpmnElement="Flow_1qije44">\n' +
    '        <di:waypoint x="740" y="250" />\n' +
    '        <di:waypoint x="860" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="789" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1ghsytk_di" bpmnElement="Flow_1ghsytk">\n' +
    '        <di:waypoint x="208" y="250" />\n' +
    '        <di:waypoint x="260" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="223" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0hms8s0_di" bpmnElement="Flow_0hms8s0">\n' +
    '        <di:waypoint x="920" y="250" />\n' +
    '        <di:waypoint x="990" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="946" y="223" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0an0fxm_di" bpmnElement="Flow_0an0fxm">\n' +
    '        <di:waypoint x="320" y="250" />\n' +
    '        <di:waypoint x="400" y="250" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="350" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ldk4cu_di" bpmnElement="Flow_0ldk4cu">\n' +
    '        <di:waypoint x="290" y="274" />\n' +
    '        <di:waypoint x="290" y="480" />\n' +
    '        <di:waypoint x="1250" y="480" />\n' +
    '        <di:waypoint x="1250" y="268" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="760" y="462" width="21" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="Event_1whgwyg_di" bpmnElement="Event_1whgwyg">\n' +
    '        <dc:Bounds x="172" y="232" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="179" y="271" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_0mc5ds7_di" bpmnElement="Event_0mc5ds7">\n' +
    '        <dc:Bounds x="1232" y="232" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="1239" y="208" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_18e76jc_di" bpmnElement="Activity_18e76jc">\n' +
    '        <dc:Bounds x="260" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0ytk9my_di" bpmnElement="Activity_0ytk9my">\n' +
    '        <dc:Bounds x="860" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1fv40xo_di" bpmnElement="Activity_1fv40xo">\n' +
    '        <dc:Bounds x="400" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1pziul5_di" bpmnElement="Activity_1pziul5">\n' +
    '        <dc:Bounds x="680" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_0r6jw4x_di" bpmnElement="Gateway_0r6jw4x">\n' +
    '        <dc:Bounds x="685" y="345" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_09qt0wj_di" bpmnElement="Activity_09qt0wj">\n' +
    '        <dc:Bounds x="990" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1kty6si_di" bpmnElement="Activity_1kty6si">\n' +
    '        <dc:Bounds x="1120" y="226" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1bt954g_di" bpmnElement="Activity_1bt954g">\n' +
    '        <dc:Bounds x="530" y="226" width="60" height="48" />\n' +
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
  deleteSequence(element,sourceElement) {
    const sequenceId = element.id;
    if (sourceElement.type !== 'bpmn:UserTask') {
      return;
    }
    let values = sourceElement.businessObject.extensionElements.get('values');
    values = values.filter(item => !(item['$type'] === BpmnTag.taskListener && item['event'] === sequenceId));
    values.forEach(value => {
      if (value['$type'] === BpmnTag.voteSelect && value.votes) {
        value.votes = value.votes.filter(item => !(item['id'] === sequenceId));
      }
    });
    sourceElement.businessObject.extensionElements.set('values', values);
  },
  errorMessage: function (_this, err) {
    _this.$notification.error({
      message: '提示:',
      description: err,
    });
  },
};

