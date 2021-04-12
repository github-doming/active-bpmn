<template>
  <div>

    <a-tabs type="card" @change="handleClick">
      <a-tab-pane key="fifth" tab="全局变量">
        <fifth-temp  :fifthDates='fifthDates' @writeBpmnFifth="writeBpmn"></fifth-temp>
      </a-tab-pane>
      <a-tab-pane key="first" tab="常规">
        <first-temp @updateProperty="updateProperty"></first-temp>
      </a-tab-pane>
      <a-tab-pane key="second" tab="活动">
        <second-temp :form='secondForm'></second-temp>
      </a-tab-pane>
      <a-tab-pane key="third" tab="参与者">
        <third-temp :compareDate='compareDate':middleTable='middleTable' :leftTable='leftTable'  @writeBpmn="writeBpmn"></third-temp>
      </a-tab-pane>
      <a-tab-pane key="fourth" tab="最后期限">
        <fourth-temp :form='fourthForm'></fourth-temp>
      </a-tab-pane>
      <a-tab-pane key="sixth" tab="路由选择事件">
        <sixth-temp :form='sixthForm'></sixth-temp>
      </a-tab-pane>
      <a-tab-pane key="seventh" tab="转变">
        <seventh-temp :form='seventhForm'></seventh-temp>
      </a-tab-pane>
      <a-tab-pane key="eighth" tab="执行选项">
        <eight-temp :form='eighthForm'></eight-temp>
      </a-tab-pane>
      <a-tab-pane key="ninth" tab="角色设置">
        <ninth-temp :form='ninthForm' @writeBpmn="writeBpmn"></ninth-temp>
      </a-tab-pane>
      <a-tab-pane key="tenth" tab="资源库">
        <tenth-temp :form='tenthForm'></tenth-temp>
      </a-tab-pane>
    </a-tabs>




  </div>
</template>
<script>
import bpmnHelper from '../js/helper/BpmnHelper';
import elementHelper from '../js/helper/ElementHelper';
import firstTemp from './commomPropsTemp/firstTemp'
import secondTemp from './commomPropsTemp/secondTemp'
import thirdTemp from './commomPropsTemp/thirdTemp'
import fourthTemp from './commomPropsTemp/fourthTemp'
import fifthTemp from './commomPropsTemp/fifthTemp'
import sixthTemp from './commomPropsTemp/sixthTemp'
import seventhTemp from './commomPropsTemp/seventhTemp'
import eightTemp from './commomPropsTemp/eightTemp'
import ninthTemp from './commomPropsTemp/ninthTemp'
import tenthTemp from './commomPropsTemp/tenthTemp'
export default {
  //依赖注入
  props: ['element'],
  inject: ['bpmnModeler', 'params'],
  components:{
    firstTemp,
    secondTemp,
    thirdTemp,
    fourthTemp,
    fifthTemp,
    sixthTemp,
    eightTemp,
    ninthTemp,
    seventhTemp,
    tenthTemp
  },
  data () {
    return {
      id: '',
      name:  '',
      process_namespace:  '',
      documentation: '',
      activeName: 'first',
      candidateStarterGroups:'',
      candidateStarterUsers: '',
      listenerType: '',
      eventType: '',
      listenerValue: '',
      isShow: false,
      listenerValueLabel: 'Java类',

      //双向绑定
      secondForm:{
        active:'默认值',
        ask:['1'],
        show:'HTML',
        temp:'default',
        indicate:'<a target=_blank href="{objectUrl}"><font size=2 color="red">请查看入库单></font></a>'
      },
      fourthForm:{
        active:'默认值',
        ask:['2'],
        show:'HTML',
        temp:'default',
        indicate:'<a target=_blank href="{objectUrl}"><font size=2 color="red">请查看入库单></font></a>'
      },
      fifthDates:[],
      sixthForm:{
        name:'路由选择事件'
      },
      seventhForm:{
        name:'转变'
      },
      eighthForm:{
        property:'4,6,8'
      },
      ninthForm:{
        type:''
      },
      tenthForm:{
        name:'资源库',
        role:'审批者',
        type:'组'
      },

      // ninth
      compareDate: [], // 用来保存原始数据,预先设定好
      middleTable: [],
      leftTable: []
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab === "ninth"){
        this.compareDate = [
          {
            id:2,
            name:"审批者2",
            type:"角色2",
            view:true,
            add:true,
            remove:true,
            resource:"资源库2",
            resourceType:"ContextTeam2"
          },
          {
            id:3,
            name:"审批者3",
            type:"角色3",
            view:true,
            add:true,
            remove:true,
            resource:"资源库3",
            resourceType:"ContextTeam3"
          },
          {
            id:4,
            name:"审批者4",
            type:"角色4",
            view:true,
            add:true,
            remove:true,
            resource:"资源库4",
            resourceType:"ContextTeam4"
          }];
        this.middleTable = [
          {
            id:2,
            name:"审批者2",
            type:"角色2",
            view:true,
            add:true,
            remove:true,
            resource:"资源库2",
            resourceType:"ContextTeam2"
          },
          {
            id:3,
            name:"审批者3",
            type:"角色3",
            view:true,
            add:true,
            remove:true,
            resource:"资源库3",
            resourceType:"ContextTeam3"
          },
          {
            id:4,
            name:"审批者4",
            type:"角色4",
            view:true,
            add:true,
            remove:true,
            resource:"资源库4",
            resourceType:"ContextTeam4"
          }];
        this.leftTable= [
          {
            id:1,
            name:"审批者1",
            type:"角色1",
            view:true,
            add:false,
            remove:true,
            resource:"资源库1",
            resourceType:"ContextTeam2"
          }
        ];
      }
      console.log(tab, event);
    },
    getPopupContainer(triggerNode){
      return triggerNode.parentNode;
    },
    writeBpmn(dates){
      this.$emit('writeBpmn', dates);
    },
    /* 将属性写入bpmn */
    writeBpmnOld(dates){
      console.log(dates);
      if(dates) {
        const bpmnModeler = this.bpmnModeler();
        const bpmnFactory = bpmnModeler.get('bpmnFactory');
        console.log(this.element.businessObject);
        let extensionElements = this.element.businessObject.get('extensionElements');
        if(!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory);
        }
        const length = extensionElements.get('values').length;
        for (let i = 0; i < length; i++) {
          // 清除旧值
          extensionElements.get('values').pop();
        }
        dates.forEach(evtObj => {
          console.log(evtObj)
          const executionListener = elementHelper.createElement('activiti:Properties', null, this.element, bpmnFactory);
          // 对象里的键值对全部放进去
          for(var key in evtObj) {
            console.log(key +"===="+  evtObj[key]);
            executionListener.$attrs[key] = evtObj[key];
          }
          extensionElements.get('values').push(executionListener);
        });
        const modeling = bpmnModeler.get('modeling');
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })
      }
    },
    updateProperty (newVal) {
      this.$emit('updateProperty',newVal,"bpmn:Process");
    },
  },
  watch: {
    id (newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler();
      const modeling = bpmnModeler.get('modeling');
      modeling.updateProperties(this.element,{'id':newVal});
    },
    /*name(newVal, oldVal){
      const bpmnModeler = this.bpmnModeler();
      const modeling = bpmnModeler.get('modeling');
      modeling.updateProperties(this.element,{'name':newVal});
    },*/
    // 监控element值，当发生改变时获取响应的属性
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if(newVal) {
          const bpmnModeler = this.bpmnModeler();
          this.id = newVal.businessObject.get('id');
          this.name = newVal.businessObject.get('name');
          // 初始化赋值
          const modeling = bpmnModeler.get('modeling');
          modeling.updateProperties(this.element,{'name':this.name});
          modeling.updateProperties(this.element,{'process_namespace':this.process_namespace});
          modeling.updateProperties(this.element,{'process_id':this.id});
        }
      }
    },
    eventType(newVal, oldVal){
      if(newVal) {
        this.isShow = true
      }
    },
    listenerType(newVal, oldVal){
      if(newVal === 'class') {
        this.listenerValueLabel = 'java类'
      } else if(newVal === 'expression') {
        this.listenerValueLabel = '表达式'
      } else if(newVal === 'delegateExpression') {
        this.listenerValueLabel = '代理表达式'
      }
    },
    /*'fifthDates': {
      handler: function(newVal, oldVal) {
        if(newVal) {
          const bpmnModeler = this.bpmnModeler();
          const bpmnFactory = bpmnModeler.get('bpmnFactory');
          debugger;
          let extensionElements = this.element12.businessObject.get('extensionElements');
          if(!extensionElements) {
            extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory);
          }
          const length = extensionElements.get('values').length;
          for (let i = 0; i < length; i++) {
            // 清除旧值
            extensionElements.get('values').pop();
          }
          //extensionElements.$attrs['name'] = newVal;
          newVal.forEach(evt => {
           const executionListener = elementHelper.createElement('activiti:Properties', null, this.element, bpmnFactory);
           executionListener.$attrs['localVariableName'] = evt.localVariableName;
           executionListener.$attrs['localVariableShowName'] = evt.localVariableShowName;
           executionListener.$attrs['localVariableType'] = evt.localVariableType;
           executionListener.$attrs['isVisible'] = evt.isVisible;
           executionListener.$attrs['isNecessary'] = evt.isNecessary;
           executionListener.$attrs['isReadOnly'] = evt.isReadOnly;
           executionListener.$attrs['isNecessary'] = evt.isNecessary;
           executionListener.$attrs['isResettable'] = evt.isResettable;
           executionListener.$attrs['defaultValue'] = evt.defaultValue;
           extensionElements.get('values').push(executionListener);
         });
          const modeling = bpmnModeler.get('modeling');
          modeling.updateProperties(this.element, {
            extensionElements: extensionElements
          })
        }
      }
    },*/
    listenerValue(newVal, oldVal){
      if(newVal) {
        const bpmnModeler = this.bpmnModeler();
        const bpmnFactory = bpmnModeler.get('bpmnFactory');
        let extensionElements = this.element.businessObject.get('extensionElements');
        if(!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory);
        }
        const length = extensionElements.get('values').length;
        for (let i = 0; i < length; i++) {
          // 清除旧值
          extensionElements.get('values').pop();
        }
        this.eventType.forEach(evt => {
          const executionListener = elementHelper.createElement('activiti:ExecutionListener', null, this.element, bpmnFactory);
          executionListener.$attrs['event'] = evt;
          executionListener.$attrs[this.listenerType] = newVal;
          extensionElements.get('values').push(executionListener)

        });
        const modeling = bpmnModeler.get('modeling');
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })
      }
    },
  }
}

</script>
