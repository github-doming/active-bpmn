<template>
  <div>
    <a-tabs type="card" tabPosition="top" @change="handleClick" >
      <a-tab-pane key="first" tab="常规">
        <firstTemp ref="first" @updateProperty="updateProperty" :userTaskName="userTaskName"></firstTemp>
      </a-tab-pane>
      <a-tab-pane  key="fifth" tab="变量" >
        <fifthTemp ref="fifth" :fifthDates='params.fifthDates' :globVariable='params.globVariable'  @writeBpmnFifth="writeBpmnFifth"></fifthTemp>
      </a-tab-pane>
      <a-tab-pane  key="ninth" tab="角色设置" >
        <ninthTemp ref="ninth" :middleTable='params.roleMiddleTable' :leftTable='params.roleLeftTable' @writeBpmnNinth="writeBpmnNinth"></ninthTemp>
      </a-tab-pane>
      <a-tab-pane  key="third" tab="参与者" >
        <thirdTemp @changeUser="changeUser" @changeTeam="changeTeam" @changeRole="changeRole" ref="third"
                   :userLeftArr='params.userLeftArr' :userRightArr='params.userRightArr' :userLeaveArr="params.userLeaveArr" :userFrom="findParticipantParam.userFrom"
                   :teamLeftArr='params.teamLeftArr' :teamRightArr='params.teamRightArr' :teamLeaveArr="params.teamLeaveArr" :teamFrom="findParticipantParam.teamFrom"
                   :roleLeftArr='params.roleLeftArr' :roleRightArr='params.roleRightArr' :roleLeaveArr="params.roleLeaveArr" :roleForm="findParticipantParam.roleForm"
                   @findParticipantUsers="findParticipantUsers"  @findParticipantGroups="findParticipantGroups" @findParticipantRoles="findParticipantRoles"
                   @writeBpmnThird="writeBpmnThird"></thirdTemp>
      </a-tab-pane>
      <a-tab-pane  key="ResourceLibrary" tab="资源库" >
        <ResourceLibrary ref="ResourceLibrary" :roleDefined='params.roleMiddleTable' :groupList='params.groupList'
                         @writeBpmn="writeBpmn" @findGroup="findGroup"></ResourceLibrary>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>
<script>
  import firstTemp from '../commomPropsTemp/firstTemp'
  import thirdTemp from '../commomPropsTemp/thirdTemp'
  import fifthTemp from '../commomPropsTemp/fifthTemp'
  import ninthTemp from '../commomPropsTemp/ninthTemp'
  import ResourceLibrary from '../commomPropsTemp/ResourceLibrary'
  import Bus from "../bus.js";
  export default {
    //依赖注入
    props: ['element',"userTaskName","params","findParticipantParam"],
    inject: ['bpmnModeler'],
    components:{
      thirdTemp,ninthTemp,fifthTemp,firstTemp,ResourceLibrary
    },
    created(){
        var that = this;
        Bus.$on("saveUserTaskNode",data=>{
          if(that.$refs.fifth){
            that.$refs.fifth.writeBpmnFifth();
          }
          if(that.$refs.ninth){
            that.$refs.ninth.writeBpmnNinth();
          }if(that.$refs.third){
            that.$refs.third.writeBpmnThird();
          }if(that.$refs.ResourceLibrary){
            that.$refs.ResourceLibrary.writeBpmn();
          }

        })
    },
    data () {
      return {

      }
    },
    methods: {
      changeUser(leftData,rightData){
        this.$emit("changeUser",leftData,rightData);
      },
      changeTeam(leftData,rightData){
        this.$emit("changeTeam",leftData,rightData);
      },
      changeRole(leftData,rightData){
        this.$emit("changeRole",leftData,rightData);
      },
      handleClick(tab, event) {
        this.$emit("handleClick",tab);
      },
      writeBpmnFifth(dates){
        // 传递的数组需要是从父组件传到子组件的
        this.$emit('writeBpmn', dates);
      },
      writeBpmnFirst(dates){
        // 传递的数组需要是从父组件传到子组件的
        this.$emit('writeBpmn', dates);
      },
      writeBpmnNinth(dates){
        // 传递的数组需要是从父组件传到子组件的
        this.$emit('writeBpmn', dates);
      },
      writeBpmnThird(dates){
        // 传递的数组需要是从父组件传到子组件的
        this.$emit('writeBpmn', dates);
      },
      writeBpmn(dates){
        this.$emit('writeBpmn', dates);
      },
      updateProperty (newVal) {
        this.$emit('updateProperty',newVal,"bpmn:UserTask");
      },
      findParticipantUsers (data) {
        this.$emit('findParticipantUsers',data);
      },
      findParticipantGroups (data) {
        this.$emit('findParticipantGroups',data);
      },
      findParticipantRoles (data) {
        this.$emit('findParticipantRoles',data);
      },
      findGroup (data) {
        this.$emit('findGroup',data);
      }
    },

    watch: {
      element: {
        deep: true,
        immediate: true,
        handler(newVal, oldVal) {
          if (newVal != oldVal) {
            if(newVal.type === 'bpmn:StartEvent') { // 防止修改其他子组件的属性
              this.name = newVal.name;
            }
          }
        }
      }

    }
  }

</script>
