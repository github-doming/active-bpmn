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
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="SequenceFlow_0bv6z76" name="测试" priority="1" />\n' +
    '          <activiti:vote id="SequenceFlow_08c4gtq" name="测试重复" priority="2" />\n' +
    '        </activiti:voteSelect>\n' +
    '        <activiti:taskListener event="SequenceFlow_0bv6z76" class="123" name="测试" />\n' +
    '        <activiti:taskListener event="SequenceFlow_0bv6z76" class="12" name="测试" />\n' +
    '        <activiti:taskListener event="SequenceFlow_08c4gtq" class="555" name="测试重复" />\n' +
    '        <activiti:roleSet id="1" name="zhangsan" code="审批者" view="false" add="false" remove="false" sourceRef="UserTask_1hulywu" />\n' +
    '        <activiti:roleSet id="3" name="wangwu" code="终结者" view="false" add="false" remove="false" sourceRef="UserTask_1hulywu" />\n' +
    '        <activiti:roleSet id="6" name="shuner" code="吃瓜群众" view="false" add="false" remove="false" sourceRef="UserTask_1hulywu" />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_1vrscp7</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0bv6z76</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_08c4gtq</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>SequenceFlow_0ccsebv</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_1vrscp7" sourceRef="StartEvent_150xhye" targetRef="UserTask_19969hx" />\n' +
    '    <bpmn2:endEvent id="EndEvent_01kz8pq" name="结束">\n' +
    '      <bpmn2:incoming>SequenceFlow_0bv6z76</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>SequenceFlow_04600cd</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0bv6z76" name="测试" sourceRef="UserTask_19969hx" targetRef="EndEvent_01kz8pq" />\n' +
    '    <bpmn2:endEvent id="EndEvent_050257c" name="结束">\n' +
    '      <bpmn2:incoming>SequenceFlow_08c4gtq</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_08c4gtq" name="测试重复" sourceRef="UserTask_19969hx" targetRef="EndEvent_050257c" />\n' +
    '    <bpmn2:userTask id="UserTask_1hulywu" name="456">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '          <activiti:role need="NO" number="" name="zhangsan" type="role" roleCode="审批者" id="1" />\n' +
    '          <activiti:role need="NO" number="" name="wangwu" type="role" roleCode="终结者" id="3" />\n' +
    '          <activiti:role need="NO" number="" name="shuner" type="role" roleCode="吃瓜群众" id="6" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>SequenceFlow_0ccsebv</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>SequenceFlow_04600cd</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_0ccsebv" sourceRef="UserTask_19969hx" targetRef="UserTask_1hulywu" />\n' +
    '    <bpmn2:sequenceFlow id="SequenceFlow_04600cd" sourceRef="UserTask_1hulywu" targetRef="EndEvent_01kz8pq" />\n' +
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
    '        <dc:Bounds x="500" y="120" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_1vrscp7_di" bpmnElement="SequenceFlow_1vrscp7">\n' +
    '        <di:waypoint x="358" y="144" />\n' +
    '        <di:waypoint x="500" y="144" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="EndEvent_01kz8pq_di" bpmnElement="EndEvent_01kz8pq">\n' +
    '        <dc:Bounds x="892" y="126" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="899" y="165" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0bv6z76_di" bpmnElement="SequenceFlow_0bv6z76">\n' +
    '        <di:waypoint x="560" y="144" />\n' +
    '        <di:waypoint x="892" y="144" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="715" y="126" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="EndEvent_050257c_di" bpmnElement="EndEvent_050257c">\n' +
    '        <dc:Bounds x="652" y="242" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="659" y="281" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_08c4gtq_di" bpmnElement="SequenceFlow_08c4gtq">\n' +
    '        <di:waypoint x="530" y="168" />\n' +
    '        <di:waypoint x="530" y="260" />\n' +
    '        <di:waypoint x="652" y="260" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="523" y="211" width="44" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="UserTask_1hulywu_di" bpmnElement="UserTask_1hulywu">\n' +
    '        <dc:Bounds x="620" y="16" width="60" height="48" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_0ccsebv_di" bpmnElement="SequenceFlow_0ccsebv">\n' +
    '        <di:waypoint x="530" y="120" />\n' +
    '        <di:waypoint x="530" y="40" />\n' +
    '        <di:waypoint x="620" y="40" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="SequenceFlow_04600cd_di" bpmnElement="SequenceFlow_04600cd">\n' +
    '        <di:waypoint x="680" y="40" />\n' +
    '        <di:waypoint x="910" y="40" />\n' +
    '        <di:waypoint x="910" y="126" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
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

