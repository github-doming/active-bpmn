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
    '  <bpmn2:process id="Process_1" name="样件委托申请单流程" isExecutable="true">\n' +
    '    <bpmn2:extensionElements />\n' +
    '    <bpmn2:startEvent id="Event_0401ioa" name="开始">\n' +
    '      <bpmn2:outgoing>Flow_1a139j4</bpmn2:outgoing>\n' +
    '    </bpmn2:startEvent>\n' +
    '    <bpmn2:userTask id="Activity_0v63h7k" name="编辑" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate taskFormTemplate="通用表单模板" />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_19vundu" name="提交" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_07urxrn</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_037hv5e</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0mtqebr</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_19vundu</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:serviceTask id="Activity_15c6j8s" name="获取任务节点信息（仓管员、入库人）" activiti:async="true" activiti:class="ext.st">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_1a139j4</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0nvhdig</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1a139j4" sourceRef="Event_0401ioa" targetRef="Activity_15c6j8s" />\n' +
    '    <bpmn2:userTask id="Activity_1p52evr" name="校对" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_13ka4p4" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="Flow_110hmuc" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_19vundu</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_110hmuc</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_13ka4p4</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1wi7kvd" name="审核" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1f8kvml" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="Flow_1uyz4fm" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_110hmuc</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1f8kvml</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1uyz4fm</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_19vundu" name="提交" sourceRef="Activity_0v63h7k" targetRef="Activity_1p52evr" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_110hmuc" name="通过" sourceRef="Activity_1p52evr" targetRef="Activity_1wi7kvd" />\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_0em4qge">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:threshold />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_13ka4p4</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1f8kvml</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_07urxrn</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_07urxrn" sourceRef="Gateway_0em4qge" targetRef="Activity_0v63h7k" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_13ka4p4" name="驳回" sourceRef="Activity_1p52evr" targetRef="Gateway_0em4qge" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1f8kvml" name="驳回" sourceRef="Activity_1wi7kvd" targetRef="Gateway_0em4qge" />\n' +
    '    <bpmn2:userTask id="Activity_0vxy097" name="设计确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1p6vcev" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_14qkmul</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_00lq9ys</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1p6vcev</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_0pgr50u" name="质检确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1ds2v8m" name="通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_0ye1rm6" name="驳回" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1avz86u</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1ds2v8m</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0ye1rm6</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1mtvylb" name="仓库确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_03t81ic" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="Flow_185p4gc" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1ds2v8m</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_185p4gc</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_03t81ic</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ds2v8m" name="通过" sourceRef="Activity_0pgr50u" targetRef="Activity_1mtvylb" />\n' +
    '    <bpmn2:userTask id="Activity_0siqvac" name="出库" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1osz6oj" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_185p4gc</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0gojnzt</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1osz6oj</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_185p4gc" name="通过" sourceRef="Activity_1mtvylb" targetRef="Activity_0siqvac" />\n' +
    '    <bpmn2:userTask id="Activity_187y04e" name="物流发货" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0jyq55s" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1osz6oj</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0njkyio</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0jyq55s</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1osz6oj" name="通过" sourceRef="Activity_0siqvac" targetRef="Activity_187y04e" />\n' +
    '    <bpmn2:serviceTask id="Activity_1od6cly" name="获取数量" activiti:async="true">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_1uyz4fm</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_14qkmul</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1uyz4fm" name="通过" sourceRef="Activity_1wi7kvd" targetRef="Activity_1od6cly" />\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_1b5ta5i">\n' +
    '      <bpmn2:incoming>Flow_1p6vcev</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0gojnzt</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1avz86u</bpmn2:outgoing>\n' +
    '    </bpmn2:exclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_14qkmul" sourceRef="Activity_1od6cly" targetRef="Activity_0vxy097" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1p6vcev" name="通过" sourceRef="Activity_0vxy097" targetRef="Gateway_1b5ta5i" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0gojnzt" name="库存满足" sourceRef="Gateway_1b5ta5i" targetRef="Activity_0siqvac" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1avz86u" name="库存不足" sourceRef="Gateway_1b5ta5i" targetRef="Activity_0pgr50u" />\n' +
    '    <bpmn2:inclusiveGateway id="Gateway_0t4aol5">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:threshold />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0ye1rm6</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_03t81ic</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_00lq9ys</bpmn2:outgoing>\n' +
    '    </bpmn2:inclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0ye1rm6" name="驳回" sourceRef="Activity_0pgr50u" targetRef="Gateway_0t4aol5" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_03t81ic" name="驳回" sourceRef="Activity_1mtvylb" targetRef="Gateway_0t4aol5" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_00lq9ys" sourceRef="Gateway_0t4aol5" targetRef="Activity_0vxy097" />\n' +
    '    <bpmn2:endEvent id="Event_1kq8si5" name="结束">\n' +
    '      <bpmn2:incoming>Flow_093f6gk</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_1t4l4ou</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:serviceTask id="Activity_0ny84u4" name="获取操作类型（提件/换件）" activiti:async="true">\n' +
    '      <bpmn2:extensionElements />\n' +
    '      <bpmn2:incoming>Flow_0nvhdig</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1ivszsz</bpmn2:outgoing>\n' +
    '    </bpmn2:serviceTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0nvhdig" sourceRef="Activity_15c6j8s" targetRef="Activity_0ny84u4" />\n' +
    '    <bpmn2:userTask id="Activity_1iny59i" name="车长确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_05wc0ro" name="不通过" priority="1" />\n' +
    '          <activiti:vote id="Flow_037hv5e" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0bg2sru</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_037hv5e</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_05wc0ro</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_1ivszsz" sourceRef="Activity_0ny84u4" targetRef="Gateway_06qwj7e" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_037hv5e" name="通过" sourceRef="Activity_1iny59i" targetRef="Activity_0v63h7k" />\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_06qwj7e">\n' +
    '      <bpmn2:incoming>Flow_1ivszsz</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0bg2sru</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0mtqebr</bpmn2:outgoing>\n' +
    '    </bpmn2:exclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0bg2sru" name="提换件" sourceRef="Gateway_06qwj7e" targetRef="Activity_1iny59i" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0mtqebr" name="提件" sourceRef="Gateway_06qwj7e" targetRef="Activity_0v63h7k" />\n' +
    '    <bpmn2:endEvent id="Event_1i0oftj" name="结束">\n' +
    '      <bpmn2:incoming>Flow_05wc0ro</bpmn2:incoming>\n' +
    '    </bpmn2:endEvent>\n' +
    '    <bpmn2:sequenceFlow id="Flow_05wc0ro" name="不通过" sourceRef="Activity_1iny59i" targetRef="Event_1i0oftj" />\n' +
    '    <bpmn2:userTask id="Activity_0kx94jd" name="入库" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect />\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_02uc8wv</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_093f6gk</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_093f6gk" sourceRef="Activity_0kx94jd" targetRef="Event_1kq8si5" />\n' +
    '    <bpmn2:exclusiveGateway id="Gateway_1g8wmog">\n' +
    '      <bpmn2:incoming>Flow_0jyq55s</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_02uc8wv</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0dpkaf7</bpmn2:outgoing>\n' +
    '    </bpmn2:exclusiveGateway>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0jyq55s" name="通过" sourceRef="Activity_187y04e" targetRef="Gateway_1g8wmog" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_02uc8wv" name="提件" sourceRef="Gateway_1g8wmog" targetRef="Activity_0kx94jd" />\n' +
    '    <bpmn2:userTask id="Activity_0f5v5b4" name="确认收货" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0njkyio" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="Flow_0rjfybv" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0dpkaf7</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0rjfybv</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_0njkyio</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_0794pkw" name="试验所长确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_1286wqb" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0rjfybv</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_1286wqb</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_17ydyjr" name="确认完工" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0vqqvwd" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_1286wqb</bpmn2:incoming>\n' +
    '      <bpmn2:incoming>Flow_0mwh11f</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0vqqvwd</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:userTask id="Activity_1cqdl0g" name="发起人确认" activiti:async="true">\n' +
    '      <bpmn2:extensionElements>\n' +
    '        <activiti:formTemplate />\n' +
    '        <activiti:participant>\n' +
    '          <activiti:role need="ALL" number="" name="操作者" type="role" roleCode="operator_code" id="operator_code" />\n' +
    '        </activiti:participant>\n' +
    '        <activiti:voteSelect>\n' +
    '          <activiti:vote id="Flow_0mwh11f" name="驳回" priority="1" />\n' +
    '          <activiti:vote id="Flow_1t4l4ou" name="通过" priority="1" />\n' +
    '        </activiti:voteSelect>\n' +
    '      </bpmn2:extensionElements>\n' +
    '      <bpmn2:incoming>Flow_0vqqvwd</bpmn2:incoming>\n' +
    '      <bpmn2:outgoing>Flow_0mwh11f</bpmn2:outgoing>\n' +
    '      <bpmn2:outgoing>Flow_1t4l4ou</bpmn2:outgoing>\n' +
    '    </bpmn2:userTask>\n' +
    '    <bpmn2:sequenceFlow id="Flow_0rjfybv" name="通过" sourceRef="Activity_0f5v5b4" targetRef="Activity_0794pkw" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1286wqb" name="通过" sourceRef="Activity_0794pkw" targetRef="Activity_17ydyjr" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0vqqvwd" name="通过" sourceRef="Activity_17ydyjr" targetRef="Activity_1cqdl0g" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0mwh11f" name="驳回" sourceRef="Activity_1cqdl0g" targetRef="Activity_17ydyjr" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_1t4l4ou" name="通过" sourceRef="Activity_1cqdl0g" targetRef="Event_1kq8si5" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0dpkaf7" name="提换件" sourceRef="Gateway_1g8wmog" targetRef="Activity_0f5v5b4" />\n' +
    '    <bpmn2:sequenceFlow id="Flow_0njkyio" name="驳回" sourceRef="Activity_0f5v5b4" targetRef="Activity_187y04e" />\n' +
    '  </bpmn2:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '      <bpmndi:BPMNEdge id="Flow_00lq9ys_di" bpmnElement="Flow_00lq9ys">\n' +
    '        <di:waypoint x="435" y="300" />\n' +
    '        <di:waypoint x="370" y="300" />\n' +
    '        <di:waypoint x="370" y="355" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_03t81ic_di" bpmnElement="Flow_03t81ic">\n' +
    '        <di:waypoint x="580" y="355" />\n' +
    '        <di:waypoint x="580" y="300" />\n' +
    '        <di:waypoint x="485" y="300" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="584" y="325" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ye1rm6_di" bpmnElement="Flow_0ye1rm6">\n' +
    '        <di:waypoint x="460" y="355" />\n' +
    '        <di:waypoint x="460" y="325" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="464" y="337" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1avz86u_di" bpmnElement="Flow_1avz86u">\n' +
    '        <di:waypoint x="460" y="435" />\n' +
    '        <di:waypoint x="460" y="405" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="453" y="417" width="44" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0gojnzt_di" bpmnElement="Flow_0gojnzt">\n' +
    '        <di:waypoint x="485" y="460" />\n' +
    '        <di:waypoint x="549" y="460" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="495" y="442" width="44" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1p6vcev_di" bpmnElement="Flow_1p6vcev">\n' +
    '        <di:waypoint x="370" y="405" />\n' +
    '        <di:waypoint x="370" y="460" />\n' +
    '        <di:waypoint x="435" y="460" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="374" y="430" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_14qkmul_di" bpmnElement="Flow_14qkmul">\n' +
    '        <di:waypoint x="302" y="380" />\n' +
    '        <di:waypoint x="339" y="380" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1uyz4fm_di" bpmnElement="Flow_1uyz4fm">\n' +
    '        <di:waypoint x="270" y="305" />\n' +
    '        <di:waypoint x="270" y="355" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="274" y="327" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1osz6oj_di" bpmnElement="Flow_1osz6oj">\n' +
    '        <di:waypoint x="612" y="460" />\n' +
    '        <di:waypoint x="639" y="460" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="615" y="442" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_185p4gc_di" bpmnElement="Flow_185p4gc">\n' +
    '        <di:waypoint x="580" y="405" />\n' +
    '        <di:waypoint x="580" y="435" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="584" y="417" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1ds2v8m_di" bpmnElement="Flow_1ds2v8m">\n' +
    '        <di:waypoint x="492" y="380" />\n' +
    '        <di:waypoint x="549" y="380" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="510" y="362" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1f8kvml_di" bpmnElement="Flow_1f8kvml">\n' +
    '        <di:waypoint x="270" y="255" />\n' +
    '        <di:waypoint x="270" y="190" />\n' +
    '        <di:waypoint x="195" y="190" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="274" y="220" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_13ka4p4_di" bpmnElement="Flow_13ka4p4">\n' +
    '        <di:waypoint x="170" y="255" />\n' +
    '        <di:waypoint x="170" y="215" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="174" y="232" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_07urxrn_di" bpmnElement="Flow_07urxrn">\n' +
    '        <di:waypoint x="145" y="190" />\n' +
    '        <di:waypoint x="70" y="190" />\n' +
    '        <di:waypoint x="70" y="255" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_110hmuc_di" bpmnElement="Flow_110hmuc">\n' +
    '        <di:waypoint x="202" y="280" />\n' +
    '        <di:waypoint x="239" y="280" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="210" y="262" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_19vundu_di" bpmnElement="Flow_19vundu">\n' +
    '        <di:waypoint x="102" y="280" />\n' +
    '        <di:waypoint x="139" y="280" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="110" y="262" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1a139j4_di" bpmnElement="Flow_1a139j4">\n' +
    '        <di:waypoint x="-272" y="400" />\n' +
    '        <di:waypoint x="-241" y="400" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0nvhdig_di" bpmnElement="Flow_0nvhdig">\n' +
    '        <di:waypoint x="-178" y="400" />\n' +
    '        <di:waypoint x="-141" y="400" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1ivszsz_di" bpmnElement="Flow_1ivszsz">\n' +
    '        <di:waypoint x="-78" y="400" />\n' +
    '        <di:waypoint x="-55" y="400" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_037hv5e_di" bpmnElement="Flow_037hv5e">\n' +
    '        <di:waypoint x="2" y="280" />\n' +
    '        <di:waypoint x="39" y="280" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="10" y="262" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0bg2sru_di" bpmnElement="Flow_0bg2sru">\n' +
    '        <di:waypoint x="-30" y="375" />\n' +
    '        <di:waypoint x="-30" y="305" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="-31" y="337" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0mtqebr_di" bpmnElement="Flow_0mtqebr">\n' +
    '        <di:waypoint x="-5" y="400" />\n' +
    '        <di:waypoint x="70" y="400" />\n' +
    '        <di:waypoint x="70" y="305" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="22" y="382" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_05wc0ro_di" bpmnElement="Flow_05wc0ro">\n' +
    '        <di:waypoint x="-30" y="255" />\n' +
    '        <di:waypoint x="-30" y="198" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="-31" y="224" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_093f6gk_di" bpmnElement="Flow_093f6gk">\n' +
    '        <di:waypoint x="902" y="400" />\n' +
    '        <di:waypoint x="972" y="400" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0jyq55s_di" bpmnElement="Flow_0jyq55s">\n' +
    '        <di:waypoint x="702" y="460" />\n' +
    '        <di:waypoint x="735" y="460" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="708" y="442" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_02uc8wv_di" bpmnElement="Flow_02uc8wv">\n' +
    '        <di:waypoint x="760" y="435" />\n' +
    '        <di:waypoint x="760" y="400" />\n' +
    '        <di:waypoint x="839" y="400" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="764" y="415" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0rjfybv_di" bpmnElement="Flow_0rjfybv">\n' +
    '        <di:waypoint x="760" y="565" />\n' +
    '        <di:waypoint x="760" y="595" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="764" y="577" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1286wqb_di" bpmnElement="Flow_1286wqb">\n' +
    '        <di:waypoint x="792" y="620" />\n' +
    '        <di:waypoint x="849" y="620" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="810" y="602" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0vqqvwd_di" bpmnElement="Flow_0vqqvwd">\n' +
    '        <di:waypoint x="912" y="620" />\n' +
    '        <di:waypoint x="959" y="620" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="925" y="602" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0mwh11f_di" bpmnElement="Flow_0mwh11f">\n' +
    '        <di:waypoint x="990" y="645" />\n' +
    '        <di:waypoint x="990" y="690" />\n' +
    '        <di:waypoint x="880" y="690" />\n' +
    '        <di:waypoint x="880" y="645" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="924" y="672" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1t4l4ou_di" bpmnElement="Flow_1t4l4ou">\n' +
    '        <di:waypoint x="990" y="595" />\n' +
    '        <di:waypoint x="990" y="418" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="1035" y="602" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0dpkaf7_di" bpmnElement="Flow_0dpkaf7">\n' +
    '        <di:waypoint x="760" y="485" />\n' +
    '        <di:waypoint x="760" y="515" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="759" y="496" width="33" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0njkyio_di" bpmnElement="Flow_0njkyio">\n' +
    '        <di:waypoint x="729" y="540" />\n' +
    '        <di:waypoint x="670" y="540" />\n' +
    '        <di:waypoint x="670" y="485" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="689" y="522" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="Activity_0v63h7k_di" bpmnElement="Activity_0v63h7k">\n' +
    '        <dc:Bounds x="39" y="255" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1p52evr_di" bpmnElement="Activity_1p52evr">\n' +
    '        <dc:Bounds x="139" y="255" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1wi7kvd_di" bpmnElement="Activity_1wi7kvd">\n' +
    '        <dc:Bounds x="239" y="255" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_0em4qge_di" bpmnElement="Gateway_0em4qge">\n' +
    '        <dc:Bounds x="145" y="165" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0vxy097_di" bpmnElement="Activity_0vxy097">\n' +
    '        <dc:Bounds x="339" y="355" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0pgr50u_di" bpmnElement="Activity_0pgr50u">\n' +
    '        <dc:Bounds x="429" y="355" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1od6cly_di" bpmnElement="Activity_1od6cly">\n' +
    '        <dc:Bounds x="239" y="355" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_1b5ta5i_di" bpmnElement="Gateway_1b5ta5i" isMarkerVisible="true">\n' +
    '        <dc:Bounds x="435" y="435" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_0t4aol5_di" bpmnElement="Gateway_0t4aol5">\n' +
    '        <dc:Bounds x="435" y="275" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1iny59i_di" bpmnElement="Activity_1iny59i">\n' +
    '        <dc:Bounds x="-61" y="255" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_06qwj7e_di" bpmnElement="Gateway_06qwj7e" isMarkerVisible="true">\n' +
    '        <dc:Bounds x="-55" y="375" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0ny84u4_di" bpmnElement="Activity_0ny84u4">\n' +
    '        <dc:Bounds x="-141" y="375" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_15c6j8s_di" bpmnElement="Activity_15c6j8s">\n' +
    '        <dc:Bounds x="-241" y="375" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_0401ioa_di" bpmnElement="Event_0401ioa">\n' +
    '        <dc:Bounds x="-308" y="382" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="-301" y="421" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_1i0oftj_di" bpmnElement="Event_1i0oftj">\n' +
    '        <dc:Bounds x="-48" y="162" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="-41" y="138" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1mtvylb_di" bpmnElement="Activity_1mtvylb">\n' +
    '        <dc:Bounds x="549" y="355" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0siqvac_di" bpmnElement="Activity_0siqvac">\n' +
    '        <dc:Bounds x="549" y="435" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_1g8wmog_di" bpmnElement="Gateway_1g8wmog" isMarkerVisible="true">\n' +
    '        <dc:Bounds x="735" y="435" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_187y04e_di" bpmnElement="Activity_187y04e">\n' +
    '        <dc:Bounds x="639" y="435" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0kx94jd_di" bpmnElement="Activity_0kx94jd">\n' +
    '        <dc:Bounds x="839" y="375" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_17ydyjr_di" bpmnElement="Activity_17ydyjr">\n' +
    '        <dc:Bounds x="849" y="595" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_1cqdl0g_di" bpmnElement="Activity_1cqdl0g">\n' +
    '        <dc:Bounds x="959" y="595" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0f5v5b4_di" bpmnElement="Activity_0f5v5b4">\n' +
    '        <dc:Bounds x="729" y="515" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0794pkw_di" bpmnElement="Activity_0794pkw">\n' +
    '        <dc:Bounds x="729" y="595" width="62.5" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_1kq8si5_di" bpmnElement="Event_1kq8si5">\n' +
    '        <dc:Bounds x="972" y="382" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <dc:Bounds x="979" y="358" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>\n';

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

  setBpmnTemplate(template) {
    CompleteBpmn2 = template;
  },

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

