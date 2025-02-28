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
    '<bpmn2:extensionElements>' +
    '<activiti:variable id="BOM01" name="primaryBusinessObject" type="Other..." otherName="com.pisx.tundra.foundation.fc.model.PIObject" isReadOnly="true" />\n' +
    '<activiti:variable id="BOM11" name="accompanyingObject" type="Other..." otherName="com.pisx.tundra.foundation.fc.collections.PICollection" isReadOnly="true" />\n' +
    '</bpmn2:extensionElements>' +
    '</bpmn2:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
    '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
    '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
    '</bpmn2:definitions>';
const CompleteBpmn = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="Process_1" isExecutable="true"><bpmn2:extensionElements /><bpmn2:startEvent id="StartEvent_0npimz1" name="开始"><bpmn2:extensionElements /><bpmn2:outgoing>SequenceFlow_0g09s4d</bpmn2:outgoing></bpmn2:startEvent><bpmn2:userTask id="UserTask_001ymr3"><bpmn2:extensionElements><activiti:formTemplate /><activiti:participant><activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" /></activiti:participant><activiti:voteSelect /></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_0g09s4d</bpmn2:incoming></bpmn2:userTask><bpmn2:sequenceFlow id="SequenceFlow_0g09s4d" sourceRef="StartEvent_0npimz1" targetRef="UserTask_001ymr3" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="StartEvent_0npimz1_di" bpmnElement="StartEvent_0npimz1"><dc:Bounds x="202" y="102" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="208" y="141" width="23" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="UserTask_001ymr3_di" bpmnElement="UserTask_001ymr3"><dc:Bounds x="310" y="95" width="62.5" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_0g09s4d_di" bpmnElement="SequenceFlow_0g09s4d"><di:waypoint x="238" y="120" /><di:waypoint x="310" y="120" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>';

const bpmnTest = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="Process_1" name="网关扩展" isExecutable="true"><bpmn2:extensionElements><activiti:variable id="BOM01" name="primaryBusinessObject" type="Other..." otherName="com.pisx.tundra.foundation.fc.model.PIObject" isReadOnly="true" accesses="0,10" /><activiti:variable id="BOM11" name="accompanyingObject" type="Other..." otherName="com.pisx.tundra.foundation.fc.collections.PICollection" isReadOnly="true" accesses="2,7" /></bpmn2:extensionElements><bpmn2:startEvent id="StartEvent_01tza0c" name="开始"><bpmn2:extensionElements /><bpmn2:outgoing>SequenceFlow_05xv64w</bpmn2:outgoing></bpmn2:startEvent><bpmn2:userTask id="UserTask_0r3wlu8" name="提交"><bpmn2:extensionElements><activiti:formTemplate /><activiti:participant><activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" /></activiti:participant><activiti:deadline /><activiti:voteSelect /><activiti:roleSet id="6" name="shuner" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7"><activiti:repository id="1" name="4" type="group" /></activiti:roleSet><activiti:roleSet id="11" name="路易十一" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7"><activiti:repository id="context_id" name="Container Team" type="context" /></activiti:roleSet><activiti:roleSet id="13" name="路易十四" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7"><activiti:repository id="system_id" name="System Team" type="system" /></activiti:roleSet></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_05xv64w</bpmn2:incoming><bpmn2:outgoing>SequenceFlow_126gb3b</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="SequenceFlow_05xv64w" sourceRef="StartEvent_01tza0c" targetRef="UserTask_0r3wlu8" /><bpmn2:userTask id="UserTask_089m3o7" name="审核"><bpmn2:extensionElements><activiti:formTemplate /><activiti:participant><activiti:role need="NO" number="" name="路易十一" type="role" roleCode="吃瓜群众" id="11" /><activiti:role need="NO" number="" name="shuner" type="role" roleCode="吃瓜群众" id="6" /><activiti:role need="NO" number="" name="路易十四" type="role" roleCode="吃瓜群众" id="13" /></activiti:participant><activiti:deadline /><activiti:voteSelect /></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_1yurjbx</bpmn2:incoming><bpmn2:outgoing>SequenceFlow_1ic21mb</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="SequenceFlow_126gb3b" sourceRef="UserTask_0r3wlu8" targetRef="ParallelGateway_1z0jzp4" /><bpmn2:endEvent id="EndEvent_180am74" name="结束"><bpmn2:extensionElements><activiti:formTemplate /><activiti:participant><activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" /></activiti:participant><activiti:deadline /><activiti:voteSelect /></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_1ic21mb</bpmn2:incoming></bpmn2:endEvent><bpmn2:sequenceFlow id="SequenceFlow_1ic21mb" sourceRef="UserTask_089m3o7" targetRef="EndEvent_180am74" /><bpmn2:parallelGateway id="ParallelGateway_1z0jzp4"><bpmn2:incoming>SequenceFlow_126gb3b</bpmn2:incoming><bpmn2:outgoing>SequenceFlow_1yurjbx</bpmn2:outgoing><bpmn2:outgoing>SequenceFlow_1y69vuc</bpmn2:outgoing><bpmn2:outgoing>SequenceFlow_19pmnow</bpmn2:outgoing></bpmn2:parallelGateway><bpmn2:sequenceFlow id="SequenceFlow_1yurjbx" sourceRef="ParallelGateway_1z0jzp4" targetRef="UserTask_089m3o7" /><bpmn2:userTask id="UserTask_0lehp9x" name="供应商举证"><bpmn2:extensionElements><activiti:formTemplate /><activiti:participant><activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" /></activiti:participant><activiti:roleSet id="6" name="shuner" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7" /><activiti:roleSet id="11" name="路易十一" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7" /><activiti:roleSet id="13" name="路易十四" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_089m3o7" /><activiti:deadline /><activiti:voteSelect /></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_1y69vuc</bpmn2:incoming><bpmn2:outgoing>SequenceFlow_1c60wk6</bpmn2:outgoing></bpmn2:userTask><bpmn2:sequenceFlow id="SequenceFlow_1y69vuc" sourceRef="ParallelGateway_1z0jzp4" targetRef="UserTask_0lehp9x" /><bpmn2:serviceTask id="ServiceTask_1dwl5xo" name="接地" activiti:type="ground"><bpmn2:incoming>SequenceFlow_1c60wk6</bpmn2:incoming></bpmn2:serviceTask><bpmn2:sequenceFlow id="SequenceFlow_1c60wk6" sourceRef="UserTask_0lehp9x" targetRef="ServiceTask_1dwl5xo" /><bpmn2:serviceTask id="ServiceTask_0jh3tzs" name="子流程" activiti:class="com.pisx.tundra.foundation.workflow.listener.StartSubProcessListener"><bpmn2:extensionElements><activiti:field name="templateName" /></bpmn2:extensionElements><bpmn2:incoming>SequenceFlow_19pmnow</bpmn2:incoming><bpmn2:outgoing>SequenceFlow_1f5fpjk</bpmn2:outgoing></bpmn2:serviceTask><bpmn2:sequenceFlow id="SequenceFlow_19pmnow" sourceRef="ParallelGateway_1z0jzp4" targetRef="ServiceTask_0jh3tzs" /><bpmn2:endEvent id="EndEvent_04mftb5" name="结束"><bpmn2:extensionElements /><bpmn2:incoming>SequenceFlow_1f5fpjk</bpmn2:incoming></bpmn2:endEvent><bpmn2:sequenceFlow id="SequenceFlow_1f5fpjk" sourceRef="ServiceTask_0jh3tzs" targetRef="EndEvent_04mftb5" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="StartEvent_01tza0c_di" bpmnElement="StartEvent_01tza0c"><dc:Bounds x="272" y="272" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="279" y="311" width="22" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="UserTask_0r3wlu8_di" bpmnElement="UserTask_0r3wlu8"><dc:Bounds x="379" y="265" width="62.5" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_05xv64w_di" bpmnElement="SequenceFlow_05xv64w"><di:waypoint x="308" y="290" /><di:waypoint x="379" y="290" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="UserTask_089m3o7_di" bpmnElement="UserTask_089m3o7"><dc:Bounds x="579" y="385" width="62.5" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_126gb3b_di" bpmnElement="SequenceFlow_126gb3b"><di:waypoint x="441" y="290" /><di:waypoint x="585" y="290" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="EndEvent_180am74_di" bpmnElement="EndEvent_180am74"><dc:Bounds x="792" y="392" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="799" y="431" width="22" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_1ic21mb_di" bpmnElement="SequenceFlow_1ic21mb"><di:waypoint x="641" y="410" /><di:waypoint x="792" y="410" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="ParallelGateway_1z0jzp4_di" bpmnElement="ParallelGateway_1z0jzp4"><dc:Bounds x="585" y="265" width="50" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_1yurjbx_di" bpmnElement="SequenceFlow_1yurjbx"><di:waypoint x="610" y="315" /><di:waypoint x="610" y="385" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="UserTask_0lehp9x_di" bpmnElement="UserTask_0lehp9x"><dc:Bounds x="579" y="135" width="62.5" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_1y69vuc_di" bpmnElement="SequenceFlow_1y69vuc"><di:waypoint x="610" y="265" /><di:waypoint x="610" y="185" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="ServiceTask_1dwl5xo_di" bpmnElement="ServiceTask_1dwl5xo"><dc:Bounds x="785" y="135" width="50" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_1c60wk6_di" bpmnElement="SequenceFlow_1c60wk6"><di:waypoint x="641" y="160" /><di:waypoint x="785" y="160" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="ServiceTask_0jh3tzs_di" bpmnElement="ServiceTask_0jh3tzs"><dc:Bounds x="805" y="265" width="50" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_19pmnow_di" bpmnElement="SequenceFlow_19pmnow"><di:waypoint x="635" y="290" /><di:waypoint x="805" y="290" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="EndEvent_04mftb5_di" bpmnElement="EndEvent_04mftb5"><dc:Bounds x="1022" y="272" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="1029" y="311" width="22" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNEdge id="SequenceFlow_1f5fpjk_di" bpmnElement="SequenceFlow_1f5fpjk"><di:waypoint x="855" y="290" /><di:waypoint x="1022" y="290" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>'

let CompleteBpmn2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '  <bpmn2:process id="Process_1" name="WF_projectChangeRequest" isExecutable="true" description="项目变更流程">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:startEvent id="Event_0d382sf" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_02obgjq</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="Activity_085buok" name="项目变更申请" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="true" add="true" remove="true" sourceRef="Activity_1ibw715">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="true" add="true" remove="true" sourceRef="Activity_1ax2x2n">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '        </activiti:roleSet>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_02obgjq</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_01zax9a</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0vr6iyk</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_02obgjq" sourceRef="Event_0d382sf" targetRef="Activity_085buok" />\n' +
    '    <bpmn2:userTask id="Activity_1ibw715" name="申请人部长确认 项目变更申请" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="部门部长" type="role" roleCode="Minister" id="Minister" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0yaohr3" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0b4l97g" name="驳回" priority="1" requiredReason="true" />\n' +
    '          <activiti:vote id="Flow_04vrz27" name="取消" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7" />\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0mrp96c</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0yaohr3</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0b4l97g</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_04vrz27</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0vr6iyk" sourceRef="Activity_085buok" targetRef="Activity_0hehl20" />\n' +
    '    <bpmn2:userTask id="Activity_1ax2x2n" name="项目经理确认 项目变更申请" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1rvp16e" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_1vbzpro" name="驳回" priority="1" requiredReason="true" />\n' +
    '          <activiti:vote id="Flow_1rlsnce" name="取消" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="true" add="true" remove="true" sourceRef="Activity_050yzh7">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1kpqggp" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0yaohr3</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1rvp16e</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1vbzpro</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1rlsnce</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0yaohr3" name="通过" sourceRef="Activity_1ibw715" targetRef="Activity_1ax2x2n" />\n' +
    '    <bpmn2:userTask id="Activity_050yzh7" name="产品线总监确认 项目变更申请" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="产品线总监" type="role" roleCode="Product Line Director" id="Product Line Director" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1njd72v" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0ehbr3t" name="驳回" priority="1" requiredReason="true" />\n' +
    '          <activiti:vote id="Flow_0btahuz" name="取消" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="true" add="true" remove="true" sourceRef="Activity_0bb2pka">\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_12pdmx0" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1rvp16e</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1njd72v</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0ehbr3t</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0btahuz</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1rvp16e" name="通过" sourceRef="Activity_1ax2x2n" targetRef="Activity_050yzh7" />\n' +
    '    <bpmn2:userTask id="Activity_0bb2pka" name="PMC确认 项目变更申请" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="PMC" type="role" roleCode="PMC" id="PMC" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1243tu4" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_1c0912u" name="驳回" priority="1" requiredReason="true" />\n' +
    '          <activiti:vote id="Flow_0k0s7pt" name="取消" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7" />\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_1nx7qq6" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1njd72v</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1243tu4</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1c0912u</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0k0s7pt</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1njd72v" name="通过" sourceRef="Activity_050yzh7" targetRef="Activity_0bb2pka" />\n' +
    '    <bpmn2:userTask id="Activity_1kpqggp" name="项目经理调整 项目计划" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="项目经理" type="role" roleCode="PM" id="PM" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka">\n' +
    '          <activiti:repository id="context_id" name="Container Team" type="context" />\n' +
    '          <activiti:repository id="system_id" name="System Team" type="system" />\n' +
    '        </activiti:roleSet>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1xtwgoa</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1mnq69m</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1rck3dy</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1243tu4" name="通过" sourceRef="Activity_0bb2pka" targetRef="Activity_17nph7l" />\n' +
    '    <bpmn2:userTask id="Activity_12pdmx0" name="产品线总监确认 计划变更结果" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="产品线总监" type="role" roleCode="Product Line Director" id="Product Line Director" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1b1r1wv" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0jgkssv" name="驳回" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7" />\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0raauud</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1b1r1wv</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0jgkssv</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1nx7qq6" name="PMC确认 计划变更结果" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="NO" number="" name="PMC" type="role" roleCode="PMC" id="PMC" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1e26dbi" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0c53jz9" name="驳回" priority="1" requiredReason="true" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:roleSet id="Minister" name="部门部长" code="Minister" view="false" add="false" remove="false" sourceRef="Activity_1ibw715" />\n' +
    '        <activiti:roleSet id="PM" name="项目经理" code="PM" view="false" add="false" remove="false" sourceRef="Activity_1ax2x2n" />\n' +
    '        <activiti:roleSet id="Product Line Director" name="产品线总监" code="Product Line Director" view="false" add="false" remove="false" sourceRef="Activity_050yzh7" />\n' +
    '        <activiti:roleSet id="PMC" name="PMC" code="PMC" view="false" add="false" remove="false" sourceRef="Activity_0bb2pka" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1b1r1wv</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1e26dbi</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0c53jz9</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1b1r1wv" name="通过" sourceRef="Activity_12pdmx0" targetRef="Activity_1nx7qq6" />\n' +
    '    <bpmn2:endEvent id="Event_1x8i5lt" name="结束">\n' +
    '      <bpmn2:incoming>Flow_1wb5uci</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1x1wpym</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1e26dbi" name="通过" sourceRef="Activity_1nx7qq6" targetRef="Activity_1c3dfz1" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1rck3dy" sourceRef="Activity_1kpqggp" targetRef="Activity_13h3gvf" />\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_10mglrn">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:threshold />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0b4l97g</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1vbzpro</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0ehbr3t</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1c0912u</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0uxfujb</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_0zr3fzd">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:threshold />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0jgkssv</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0c53jz9</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1cehgkg</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:serviceTask id="Activity_0xepjlj" name="重新打开" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>REOPENED</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0uxfujb</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_01zax9a</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_1c3dfz1" name="已关闭" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>CLOSED</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1e26dbi</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_02h3wjh</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_17nph7l" name="进行中" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>IN PROGRESS</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1243tu4</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_02mvacw</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_1n0f2rt" name="有效性批准" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>VALIDITY APPROVAL</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1e8nt45</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0raauud</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0raauud" sourceRef="Activity_1n0f2rt" targetRef="Activity_12pdmx0" />\n' +
    '    <bpmn2:serviceTask id="Activity_0bih7pm" name="进行中" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>IN PROGRESS</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1cehgkg</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1d5u2mq</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_02mvacw" sourceRef="Activity_17nph7l" targetRef="Activity_1azqdck" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_02h3wjh" sourceRef="Activity_1c3dfz1" targetRef="Activity_0w22qxw" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0b4l97g" name="驳回" sourceRef="Activity_1ibw715" targetRef="Gateway_10mglrn" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1vbzpro" name="驳回" sourceRef="Activity_1ax2x2n" targetRef="Gateway_10mglrn" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ehbr3t" name="驳回" sourceRef="Activity_050yzh7" targetRef="Gateway_10mglrn" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1c0912u" name="驳回" sourceRef="Activity_0bb2pka" targetRef="Gateway_10mglrn" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0uxfujb" sourceRef="Gateway_10mglrn" targetRef="Activity_0xepjlj" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_01zax9a" sourceRef="Activity_0xepjlj" targetRef="Activity_085buok" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1d5u2mq" sourceRef="Activity_0bih7pm" targetRef="Activity_0b1qmgd" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0jgkssv" name="驳回" sourceRef="Activity_12pdmx0" targetRef="Gateway_0zr3fzd" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0c53jz9" name="驳回" sourceRef="Activity_1nx7qq6" targetRef="Gateway_0zr3fzd" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1cehgkg" sourceRef="Gateway_0zr3fzd" targetRef="Activity_0bih7pm" />\n' +
    '    <bpmn2:serviceTask id="Activity_0w22qxw" name="创建基线" activiti:async="true" activiti:class="com.pisx.tundra.pmgt.plan.listener.CreatePlanBaselineServiceTaskListener">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_02h3wjh</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1x1wpym</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_13h3gvf" name="锁定活动" activiti:async="true" activiti:class="com.pisx.tundra.pmgt.plan.listener.BackLockPlanServiceTaskListener">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_1rck3dy</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1e8nt45</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_1azqdck" name="解锁活动" activiti:async="true" activiti:class="com.pisx.tundra.pmgt.plan.listener.UnLockedPlanServiceTaskListener">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_02mvacw</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1xtwgoa</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:serviceTask id="Activity_0hehl20" name="正在审阅" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>UNDERREVIEW</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0vr6iyk</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0mrp96c</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0mrp96c" sourceRef="Activity_0hehl20" targetRef="Activity_1ibw715" />\n' +
    '    <bpmn2:serviceTask id="Activity_022w0v6" name="已取消" activiti:class="com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:field name="stateKey">\n' +
    '          <activiti:string>CANCELLED</activiti:string>\n' +
    '        </activiti:field>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1prplg4</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1wb5uci</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_1m7evs4">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:threshold />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_04vrz27</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1rlsnce</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0btahuz</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0k0s7pt</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1prplg4</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_04vrz27" name="取消" sourceRef="Activity_1ibw715" targetRef="Gateway_1m7evs4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1rlsnce" name="取消" sourceRef="Activity_1ax2x2n" targetRef="Gateway_1m7evs4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0btahuz" name="取消" sourceRef="Activity_050yzh7" targetRef="Gateway_1m7evs4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0k0s7pt" name="取消" sourceRef="Activity_0bb2pka" targetRef="Gateway_1m7evs4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1prplg4" sourceRef="Gateway_1m7evs4" targetRef="Activity_022w0v6" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1wb5uci" sourceRef="Activity_022w0v6" targetRef="Event_1x8i5lt" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1xtwgoa" sourceRef="Activity_1azqdck" targetRef="Activity_1kpqggp" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1e8nt45" sourceRef="Activity_13h3gvf" targetRef="Activity_1n0f2rt" />\n' +
    '    <bpmn2:serviceTask id="Activity_0b1qmgd" name="解锁活动" activiti:async="true" activiti:class="com.pisx.tundra.pmgt.plan.listener.UnLockedPlanServiceTaskListener">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_1d5u2mq</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1mnq69m</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1mnq69m" sourceRef="Activity_0b1qmgd" targetRef="Activity_1kpqggp" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1x1wpym" sourceRef="Activity_0w22qxw" targetRef="Event_1x8i5lt" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNEdge id="Flow_1x1wpym_di" bpmnElement="Flow_1x1wpym">\n' +
    '        <di:waypoint x="189" y="480" />\n' +
    '        <di:waypoint x="130" y="480" />\n' +
    '        <di:waypoint x="130" y="408" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1mnq69m_di" bpmnElement="Flow_1mnq69m">\n' +
    '        <di:waypoint x="882" y="590" />\n' +
    '        <di:waypoint x="970" y="590" />\n' +
    '        <di:waypoint x="970" y="505" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1e8nt45_di" bpmnElement="Flow_1e8nt45">\n' +
    '        <di:waypoint x="819" y="480" />\n' +
    '        <di:waypoint x="745" y="480" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1xtwgoa_di" bpmnElement="Flow_1xtwgoa">\n' +
    '        <di:waypoint x="970" y="405" />\n' +
    '        <di:waypoint x="970" y="455" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1wb5uci_di" bpmnElement="Flow_1wb5uci">\n' +
    '        <di:waypoint x="305" y="390" />\n' +
    '        <di:waypoint x="148" y="390" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1prplg4_di" bpmnElement="Flow_1prplg4">\n' +
    '        <di:waypoint x="425" y="390" />\n' +
    '        <di:waypoint x="355" y="390" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0k0s7pt_di" bpmnElement="Flow_0k0s7pt">\n' +
    '        <di:waypoint x="850" y="315" />\n' +
    '        <di:waypoint x="850" y="390" />\n' +
    '        <di:waypoint x="475" y="390" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="854" y="350" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0btahuz_di" bpmnElement="Flow_0btahuz">\n' +
    '        <di:waypoint x="720" y="315" />\n' +
    '        <di:waypoint x="720" y="390" />\n' +
    '        <di:waypoint x="475" y="390" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="724" y="350" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1rlsnce_di" bpmnElement="Flow_1rlsnce">\n' +
    '        <di:waypoint x="590" y="315" />\n' +
    '        <di:waypoint x="590" y="390" />\n' +
    '        <di:waypoint x="475" y="390" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="594" y="350" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_04vrz27_di" bpmnElement="Flow_04vrz27">\n' +
    '        <di:waypoint x="450" y="315" />\n' +
    '        <di:waypoint x="450" y="365" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="454" y="337" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0mrp96c_di" bpmnElement="Flow_0mrp96c">\n' +
    '        <di:waypoint x="355" y="290" />\n' +
    '        <di:waypoint x="419" y="290" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1cehgkg_di" bpmnElement="Flow_1cehgkg">\n' +
    '        <di:waypoint x="615" y="590" />\n' +
    '        <di:waypoint x="695" y="590" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0c53jz9_di" bpmnElement="Flow_0c53jz9">\n' +
    '        <di:waypoint x="450" y="505" />\n' +
    '        <di:waypoint x="450" y="590" />\n' +
    '        <di:waypoint x="565" y="590" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="454" y="545" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0jgkssv_di" bpmnElement="Flow_0jgkssv">\n' +
    '        <di:waypoint x="590" y="505" />\n' +
    '        <di:waypoint x="590" y="565" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="594" y="532" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1d5u2mq_di" bpmnElement="Flow_1d5u2mq">\n' +
    '        <di:waypoint x="745" y="590" />\n' +
    '        <di:waypoint x="819" y="590" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_01zax9a_di" bpmnElement="Flow_01zax9a">\n' +
    '        <di:waypoint x="220" y="185" />\n' +
    '        <di:waypoint x="220" y="265" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0uxfujb_di" bpmnElement="Flow_0uxfujb">\n' +
    '        <di:waypoint x="425" y="160" />\n' +
    '        <di:waypoint x="245" y="160" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1c0912u_di" bpmnElement="Flow_1c0912u">\n' +
    '        <di:waypoint x="850" y="265" />\n' +
    '        <di:waypoint x="850" y="160" />\n' +
    '        <di:waypoint x="475" y="160" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="854" y="210" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ehbr3t_di" bpmnElement="Flow_0ehbr3t">\n' +
    '        <di:waypoint x="720" y="265" />\n' +
    '        <di:waypoint x="720" y="160" />\n' +
    '        <di:waypoint x="475" y="160" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="724" y="210" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1vbzpro_di" bpmnElement="Flow_1vbzpro">\n' +
    '        <di:waypoint x="590" y="265" />\n' +
    '        <di:waypoint x="590" y="160" />\n' +
    '        <di:waypoint x="475" y="160" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="594" y="210" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0b4l97g_di" bpmnElement="Flow_0b4l97g">\n' +
    '        <di:waypoint x="450" y="265" />\n' +
    '        <di:waypoint x="450" y="185" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="454" y="222" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_02h3wjh_di" bpmnElement="Flow_02h3wjh">\n' +
    '        <di:waypoint x="305" y="480" />\n' +
    '        <di:waypoint x="252" y="480" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_02mvacw_di" bpmnElement="Flow_02mvacw">\n' +
    '        <di:waypoint x="970" y="315" />\n' +
    '        <di:waypoint x="970" y="355" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0raauud_di" bpmnElement="Flow_0raauud">\n' +
    '        <di:waypoint x="695" y="480" />\n' +
    '        <di:waypoint x="622" y="480" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1rck3dy_di" bpmnElement="Flow_1rck3dy">\n' +
    '        <di:waypoint x="939" y="480" />\n' +
    '        <di:waypoint x="882" y="480" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1e26dbi_di" bpmnElement="Flow_1e26dbi">\n' +
    '        <di:waypoint x="419" y="480" />\n' +
    '        <di:waypoint x="355" y="480" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="376" y="462" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1b1r1wv_di" bpmnElement="Flow_1b1r1wv">\n' +
    '        <di:waypoint x="559" y="480" />\n' +
    '        <di:waypoint x="482" y="480" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="509" y="462" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1243tu4_di" bpmnElement="Flow_1243tu4">\n' +
    '        <di:waypoint x="882" y="290" />\n' +
    '        <di:waypoint x="945" y="290" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="902" y="272" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1njd72v_di" bpmnElement="Flow_1njd72v">\n' +
    '        <di:waypoint x="752" y="290" />\n' +
    '        <di:waypoint x="819" y="290" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="774" y="272" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1rvp16e_di" bpmnElement="Flow_1rvp16e">\n' +
    '        <di:waypoint x="622" y="290" />\n' +
    '        <di:waypoint x="689" y="290" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="644" y="272" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0yaohr3_di" bpmnElement="Flow_0yaohr3">\n' +
    '        <di:waypoint x="482" y="290" />\n' +
    '        <di:waypoint x="559" y="290" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="509" y="272" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0vr6iyk_di" bpmnElement="Flow_0vr6iyk">\n' +
    '        <di:waypoint x="252" y="290" />\n' +
    '        <di:waypoint x="305" y="290" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_02obgjq_di" bpmnElement="Flow_02obgjq">\n' +
    '        <di:waypoint x="148" y="290" />\n' +
    '        <di:waypoint x="189" y="290" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="Event_0d382sf_di" bpmnElement="Event_0d382sf">\n' +
    '        <dc:Bounds x="112" y="272" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="118" y="311" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_085buok_di" bpmnElement="Activity_085buok">\n' +
    '        <dc:Bounds x="189" y="265" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1ibw715_di" bpmnElement="Activity_1ibw715">\n' +
    '        <dc:Bounds x="419" y="265" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1ax2x2n_di" bpmnElement="Activity_1ax2x2n">\n' +
    '        <dc:Bounds x="559" y="265" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_050yzh7_di" bpmnElement="Activity_050yzh7">\n' +
    '        <dc:Bounds x="689" y="265" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0bb2pka_di" bpmnElement="Activity_0bb2pka">\n' +
    '        <dc:Bounds x="819" y="265" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1kpqggp_di" bpmnElement="Activity_1kpqggp">\n' +
    '        <dc:Bounds x="939" y="455" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_12pdmx0_di" bpmnElement="Activity_12pdmx0">\n' +
    '        <dc:Bounds x="559" y="455" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1nx7qq6_di" bpmnElement="Activity_1nx7qq6">\n' +
    '        <dc:Bounds x="419" y="455" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_1x8i5lt_di" bpmnElement="Event_1x8i5lt">\n' +
    '        <dc:Bounds x="112" y="372" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="118" y="348" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_10mglrn_di" bpmnElement="Gateway_10mglrn">\n' +
    '        <dc:Bounds x="425" y="135" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_0zr3fzd_di" bpmnElement="Gateway_0zr3fzd">\n' +
    '        <dc:Bounds x="565" y="565" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0xepjlj_di" bpmnElement="Activity_0xepjlj">\n' +
    '        <dc:Bounds x="195" y="135" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1c3dfz1_di" bpmnElement="Activity_1c3dfz1">\n' +
    '        <dc:Bounds x="305" y="455" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_17nph7l_di" bpmnElement="Activity_17nph7l">\n' +
    '        <dc:Bounds x="945" y="265" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1n0f2rt_di" bpmnElement="Activity_1n0f2rt">\n' +
    '        <dc:Bounds x="695" y="455" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0bih7pm_di" bpmnElement="Activity_0bih7pm">\n' +
    '        <dc:Bounds x="695" y="565" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0w22qxw_di" bpmnElement="Activity_0w22qxw">\n' +
    '        <dc:Bounds x="189" y="455" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_13h3gvf_di" bpmnElement="Activity_13h3gvf">\n' +
    '        <dc:Bounds x="819" y="455" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1azqdck_di" bpmnElement="Activity_1azqdck">\n' +
    '        <dc:Bounds x="939" y="355" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0hehl20_di" bpmnElement="Activity_0hehl20">\n' +
    '        <dc:Bounds x="305" y="265" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_022w0v6_di" bpmnElement="Activity_022w0v6">\n' +
    '        <dc:Bounds x="305" y="365" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_1m7evs4_di" bpmnElement="Gateway_1m7evs4">\n' +
    '        <dc:Bounds x="425" y="365" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0b1qmgd_di" bpmnElement="Activity_0b1qmgd">\n' +
    '        <dc:Bounds x="819" y="565" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\n';
// endregion

export const BpmnConfig = {
  statusAutoClass: 'com.pisx.tundra.foundation.workflow.listener.WfProcessSetStateListener',
    subProcessAutoClass:'com.pisx.tundra.foundation.workflow.listener.StartSubProcessListener',
  analyzeTypes: ['bpmn:Process', 'bpmn:StartEvent', 'bpmn:UserTask', 'bpmn:SequenceFlow', 'bpmn:ServiceTask', 'bpmn:EndEvent', 'bpmn:InclusiveGateway', 'bpmn:IntermediateCatchEvent','bpmn:ExclusiveGateway'],
    mailAutoType:'mail',
    synchRobotType:'synchRobot',
    ground:'ground'
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
    operator: 'activiti:Operator',
    email: 'activiti:Email',
  repository: 'activiti:Repository',
  vote: 'activiti:Vote',
    responsibleRole: 'activiti:ResponsibleRole',
    message: 'activiti:Message',
    attachment:'activiti:Attachment',
  threshold: 'activiti:Threshold',
  field: 'activiti:Field',
    recipient: 'activiti:Recipient',
    deadline:'activiti:Deadline',
    expression:'activiti:Expression',

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
    getRecipient(participantKey) {
        if (participantKey === 'assigns') {
            return this.assign;
        } else if (participantKey === 'groups') {
            return this.group;
        } else if (participantKey === 'roles') {
            return this.role;
        } else if(participantKey ==="operators"){
            return this.operator;
        } else if(participantKey ==="variables"){
            return this.variable;
        } else if(participantKey ==="emails"){
            return this.email;
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
  },
    getRecipientType(participantKey) {
        if (participantKey === 'assigns') {
            return 'user';
        } else if (participantKey === 'groups') {
            return 'group';
        } else if (participantKey === 'roles') {
            return 'role';
        } else if (participantKey === 'operators'){
            return 'Operator';
        } else if(participantKey ==="variables"){
            return 'variable';
        } else if(participantKey ==="emails"){
            return 'Email';
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

  setBpmnTemplate(template) {
    CompleteBpmn2 = template;
  },

  getBpmnTemplate() {
    return bpmnTest;
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

