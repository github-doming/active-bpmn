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

