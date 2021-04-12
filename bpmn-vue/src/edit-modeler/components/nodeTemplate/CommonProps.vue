<template>
  <div>

    <a-tabs type="card" @change="handleClick">
      <a-tab-pane key="first" tab="常规">
        <first-temp  ref="first" @updateProperty="updateProperty" :userTaskName ="userTaskName" ></first-temp>
      </a-tab-pane>
      <a-tab-pane key="fifth" tab="全局变量">
        <fifthTemp ref="fifth" :fifthDates='params.fifthDates' @writeBpmnFifth="writeBpmnFifth"></fifthTemp>
      </a-tab-pane>
    </a-tabs>




  </div>
</template>
<script>
import firstTemp from '../commomPropsTemp/firstTemp'
import fifthTemp from '../commomPropsTemp/fifthTemp'
import Bus from "../bus.js";
export default {
  //依赖注入
  props: ['element','userTaskName',"params"],
  inject: ['bpmnModeler'],
  components:{
    firstTemp,
    fifthTemp,
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

      //双向绑定
      fifthDates:[],
      // ninth
      compareDate: [], // 用来保存原始数据,预先设定好
      middleTable: [],
      leftTable: []
    }
  },
  methods: {
    writeBpmnFifth(dates){
      // 传递的数组需要是从父组件传到子组件的
      this.$emit('writeBpmn', dates);
    },
    handleClick(tab, event) {
      if (tab === "ninth"){
        this.compareDate = [];
        this.middleTable = [];
        this.leftTable= [];
      }
      console.log(tab, event);
    },
    getPopupContainer(triggerNode){
      return triggerNode.parentNode;
    },
    writeBpmn(dates){
      this.$emit('writeBpmn', dates);
    },
    updateProperty (newVal) {
      console.log("保存名称")
      this.$emit('updateProperty',newVal,"bpmn:Process");
    },
  },
  created(){
    var that = this;
    Bus.$on("saveCommonNode",data=>{
      if(that.$refs.fifth){
        that.$refs.fifth.writeBpmnFifth();
      }
    })
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
    }
  }
}

</script>
