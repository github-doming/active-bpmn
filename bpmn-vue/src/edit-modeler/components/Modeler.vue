<template>
  <div>
    <a-layout>
      <!-- 绘图内容 -->
      <a-layout-content>
        <a-button style="text-align: center;background-color: chartreuse" @click="lookXMl">点击看xml</a-button>
        <div ref="canvas" style="width: 100%;height: 100vh; background-color: #cdccc3"></div>
      </a-layout-content>
      <!-- 右边元素框 -->
      <a-layout-sider style="background-color:#e3e3e3;" :width="silderWid">
        <a-form style="border: 1px solid #DCDFE6;background-color:#FAFAFA; height:80vh;">
          <!-- 左拉右拉 UI -->
          <div v-if='iconShow > -1' class='icon' @click='changeIconShow(true)'>
            <a-icon type="double-left"/>
          </div>
          <div v-if='iconShow < 1' :class="{'two-icon':iconShow===0,'icon':true}" @click='changeIconShow(false)'>
            <a-icon type="double-right"/>
          </div>
          <component ref="compo" :params="sonParams" :findParticipantParam="findParticipantParam"
                     :userTaskName="userTaskName"
                     :is="propsComponent"
                     @changeUser="changeUser"
                     @changeTeam="changeTeam"
                     @changeRole="changeRole"
                     @handleClick="handleClick"
                     @updateProperty="updateProperty"
                     @writeBpmn="writeBpmn"
                     @findParticipantUsers="findParticipantUsers"
                     @findParticipantGroups="findParticipantGroups"
                     @findParticipantRoles="findParticipantRoles"
                     @findGroup="findGroup"
                     :element="element"
                     :key="key"></component>
        </a-form>
        <a-button style="text-align: center;background-color: chartreuse;margin: 5px" v-on:click="saveNodeData">保存
        </a-button>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import 'bpmn-js/dist/assets/diagram-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
  import bpmnHelper from '../js/helper/BpmnHelper'
  import CommonProps from './nodeTemplate/CommonProps.vue'
  import ProcessProps from './ProcessProps.vue'
  import StartEventProps from './nodeTemplate/StartEventProps.vue'
  import UserTaskProps from './nodeTemplate/UserTaskProps.vue'
  import EndEventProps from './nodeTemplate/EndEventProps.vue'
  import IntermediateThrowEventProps from './IntermediateThrowEventProps.vue'
  import ExclusiveGatewayProps from './ExclusiveGatewayProps.vue'
  import ParallelGatewayProps from './ParallelGatewayProps.vue'
  import InclusiveGatewayProps from './InclusiveGatewayProps.vue'
  import SequenceFlowProps from './SequenceFlowProps.vue'
  import CallActivityProps from './CallActivityProps.vue'
  import activitiModdleDescriptor from '../js/activiti.json'
  import customTranslate from '../js/customTranslate/customTranslate'
  import customControlsModule from '../js/customControls'
  import BpmData from './BpmData'
  import request from '@/util/request'
  import elementHelper from '../js/helper/ElementHelper'
  import {removArrElement} from '../js/util/CommonUtils'
  import {postJson} from '@/common'

  const forEach = require('lodash/forEach')

  import Bus from '../components/bus.js'

  export default {
    components: {
      CommonProps,
      ProcessProps,
      StartEventProps,
      EndEventProps,
      IntermediateThrowEventProps,
      ExclusiveGatewayProps,
      ParallelGatewayProps,
      InclusiveGatewayProps,
      UserTaskProps,
      SequenceFlowProps,
      CallActivityProps
    },
    props: ['params'],
    provide: function () {
      return {
        bpmnModeler: this.getBpmnModeler,
        params: this.params
      }
    },
    data () {
      return {
        propsComponent: '',
        bpmData: new BpmData(),
        bpmnModeler: null,
        canvas: null,
        element: null,
        key: '1',
        defaultData: {
          'bpmn:StartEvent': '开始',
          'bpmn:EndEvent': '结束',
          'bpmn:IntermediateThrowEvent': '终止'
        },
        silderWid: '40%',
        iconShow: 0,
        //常规里面名称
        userTaskName: '',
        sonParams: {
          //存全局变量
          globVariable: [],
          //tabs 变量需要的值
          variable: [], // 从xml中读取的'activiti:Variable'页签信息
          //变量列表的值
          fifthDates: [],
          //tabs 参与者需要的值
          // 从xml中读取的“activiti:Participant”页签信息,分为user、team、role三个小tab
          userLeftArr: [],
          userRightArr: [],
          userLeaveArr: [],
          teamLeftArr: [],
          teamRightArr: [],
          teamLeaveArr: [],
          roleLeftArr: [],
          roleRightArr: [],
          roleLeaveArr: [],
          //tabs 角色设置需要的值
          roleLeftTable: [],
          // 从xml中读取的'activiti:RoleSet'页签信息
          roleMiddleTable: [],
          groupList: [],
        },
        // 用于参与者查询参数传递
        findParticipantParam: {
          userFrom: {
            name: '', // 用户名
            fullName: '', // 全名
            properties: 'name,fullName',
            beanName: 'piUser',
            pageNo: 1,
            pageSize: 10,
            total: 40
          },
          teamFrom: {
            name: '', // 组名
            properties: 'name',
            beanName: 'piGroup',
            pageNo: 1,
            pageSize: 10,
            total: 10
          },
          roleForm: {
            roleName: '', // 角色名称
            properties: 'roleName',
            beanName: 'piRole',
            pageNo: 1,
            pageSize: 10,
            total: 10
          },
        }
      }
    },
    methods: {
      /* 参与者查找功能，分页+回读+查询+剔除数据 */
      findParticipantUsers (data) {
        let that = this
        postJson('/process/getAllPartinal', data).then(response => {
          that.sonParams.userLeftArr = response.data.partinUsers.data
          that.findParticipantParam.userFrom.total = response.data.partinUsers.total
        }).then(() => {
          that.sonParams.userLeaveArr = []
          // 被选中剔除已选的选项
          for (let i = 0; i < that.sonParams.userRightArr.length; i++) {
            for (let j = 0; j < that.sonParams.userLeftArr.length; j++) {
              if (that.sonParams.userRightArr[i].id === that.sonParams.userLeftArr[j].id) {
                that.sonParams.userLeaveArr.push(that.sonParams.userLeftArr[j])
                that.sonParams.userLeftArr.splice(j, 1) // 删除而不留空洞
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      findParticipantGroups (data) {
        let that = this
        postJson('/process/getAllPartinal', data)
          .then(function (response) {
            console.log(response)
            that.sonParams.teamLeftArr = response.data.partinGroups.data
            that.findParticipantParam.teamFrom.total = response.data.partinUsers.total
          }).then(() => {
          that.sonParams.teamLeaveArr = []
          for (let i = 0; i < that.sonParams.teamRightArr.length; i++) {
            for (let j = 0; j < that.sonParams.teamLeftArr.length; j++) {
              if (that.sonParams.teamRightArr[i].id === that.sonParams.teamLeftArr[j].id) {
                that.sonParams.teamLeaveArr.push(that.sonParams.teamRightArr[i])
                that.sonParams.teamLeftArr.splice(j, 1)
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      findGroup (data) {
        let that = this
        postJson('/process/getAllPartinal', data).then(response => {
          console.log(response)
          that.sonParams.groupList = response.data.partinGroups.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      findParticipantRoles (data) {
        let that = this
        postJson('/process/getAllPartinal', data)
          .then(function (response) {
            console.log(response)
            that.sonParams.roleLeftArr = response.data.partinRoles.data
            that.findParticipantParam.roleForm.total = response.data.partinUsers.total
          }).then(() => {
          that.sonParams.roleLeaveArr = []
          // 被选中剔除已选的选项
          for (let i = 0; i < that.sonParams.roleRightArr.length; i++) {
            for (let j = 0; j < that.sonParams.roleLeftArr.length; j++) {
              if (that.sonParams.roleRightArr[i].id === that.sonParams.roleLeftArr[j].id) {
                that.sonParams.roleLeaveArr.push(that.sonParams.roleRightArr[i])
                that.sonParams.roleLeftArr.splice(j, 1)
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },


      // 看xml
      lookXMl () {
        this.watchXML()
      },
      saveNodeData () {
        switch (this.propsComponent) {
          case 'UserTaskProps':
            Bus.$emit('saveUserTaskNode', 5)
            break
          case 'StartEventProps':
            Bus.$emit('saveStartEventNode', 1)
            break
          case 'CommonProps':
            Bus.$emit('saveCommonNode', 1)
            break
        }
      },
      //子组件传过来的数据变化
      changeUser (leftData, rightData) {
        this.sonParams.userLeftArr = leftData
        this.sonParams.userRightArr = rightData
      },
      changeTeam (leftData, rightData) {
        this.sonParams.teamLeftArr = leftData
        this.sonParams.teamRightArr = rightData
      },
      changeRole (leftData, rightData) {
        this.sonParams.roleLeftArr = leftData
        this.sonParams.roleRightArr = rightData
      },
      //点击不同的节点时清空上一节点数据
      resetData () {
        this.sonParams.fifthDates = []
        this.sonParams.userLeftArr = []
        this.sonParams.userRightArr = []
        this.sonParams.userLeaveArr = []
        this.sonParams.teamLeftArr = []
        this.sonParams.teamRightArr = []
        this.sonParams.teamLeaveArr = []
        this.sonParams.roleLeftArr = []
        this.sonParams.roleRightArr = []
        this.sonParams.roleLeaveArr = []
        this.sonParams.roleLeftTable = []
        this.sonParams.roleMiddleTable = []
        this.sonParams.groupList = []
      },
      /* 将属性写入bpmn */
      writeBpmn (dates) {
        console.log(dates)
        if (dates) {
          const bpmnModeler = this.bpmnModeler
          const bpmnFactory = bpmnModeler.get('bpmnFactory')
          console.log(this.element.businessObject)
          let extensionElements = this.element.businessObject.get('extensionElements')
          if (!extensionElements) {
            extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
          }
          let values = [].concat(extensionElements.get('values'))
          let tab = dates.tab
          let tag = 'activiti:'.concat(tab) // activiti:Variable/activiti:Participant/activiti:RoleSet/activiti:General
          // 除旧值，把相同的页签全部删掉
          values = removArrElement(values, '$type', tag)
          dates.param.forEach(evtObj => {
            console.log(evtObj)
            let tagElement = bpmnHelper.createElementTag(bpmnModeler, tag, this.element, null)
            // 对象里的键值对全部放进去
            for (var key in evtObj) {
              console.log(key + '====' + evtObj[key])
              tagElement.$attrs[key] = evtObj[key]
            }
            values.push(tagElement)
          })
          extensionElements.set('values', values)
          const modeling = bpmnModeler.get('modeling')
          modeling.updateProperties(this.element, {
            extensionElements: extensionElements
          })
        }
      },
      /* 更新父页签的属性 */
      updateProperty (newVal, elementType) {
        const modeling = this.bpmnModeler.get('modeling')
        if (this.element.type === elementType) {
          newVal.forEach(evtObj => {
            console.log('写入名称：' + evtObj.name)
            modeling.updateProperties(this.element, evtObj)
          })
        } //bpmn:UserTask 、bpmn:StartEvent、bpmn:Process
      },

      //调整右侧宽度
      changeIconShow (type) {
        if (type) {
          this.iconShow--
        } else {
          this.iconShow++
        }
        if (this.iconShow === -1) {
          this.silderWid = 'calc(100% - 40px)'
        } else if (this.iconShow === 1) {
          this.silderWid = '0%'
        } else {
          this.silderWid = '40%'
        }
      },
      //保存文档
      watchXML () {
        this.bpmnModeler.saveXML({format: true}, function (err, xml) {
          if (err) {
            console.error('流程数据生成失败')
            console.log(err)
            return
          }
          console.log(xml)

        })
      },
      saveXML () {
        const that = this
        that.bpmnModeler.saveXML({format: true}, function (err, xml) {
          if (err) {
            console.error('流程数据生成失败')
            console.log(err)
            return
          }
          const modelId = '123'
          that.bpmnModeler.saveSVG(function (err, svg) {
            if (err) {
              console.error('流程数据生成失败！')
              return
            }
            const modelId = that.params.row.id
            console.log(that.bpmnModeler._definitions.rootElements[0].flowElements[0].id)
            request({
              url: `/workflow/model/${modelId}/xml/save`,
              method: 'post',
              data: {
                bpmn_xml: xml,
                svg_xml: svg
              }
            })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })

          })

        })

      },
      saveSVG (call) {
        this.bpmnModeler.saveSVG(function (err, xml) {
          if (err) {
            console.error('流程数据生成失败！')
            return
          }
          call(xml)
        })
      },
      //初始化BpmnModeler
      initBpmnModeler () {
        let canvas = this.$refs.canvas
        console.log('canvas==' + canvas)
        var customTranslateModule = {
          translate: ['value', customTranslate]
        }
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加属性面板，添加翻译模块
          additionalModules: [
            customTranslateModule,
            customControlsModule
          ],
          //模块拓展，拓展activiti的描述
          moddleExtensions: {
            activiti: activitiModdleDescriptor
          }
        })
        this.importBpmnXml()

      },
      //导入xml文档
      importBpmnXml () {
        const that = this
        bpmnHelper.getBpmnTemplate().then(bpmnXml => {
          that.bpmnModeler.importXML(bpmnXml, function (err) {
            if (err) {
              console.log('bpmn文档导入失败', err)
            } else {
              // 绑定监听事件
              that.success()
            }
          })
        })
      },
      getBpmnModeler () {
        return this.bpmnModeler
      },
      success () {
        console.log('创建成功!')
        // 初始化element
        const elementRegistry = this.bpmnModeler.get('elementRegistry')
        this.element = elementRegistry.get('Process_1')
        this.addModelerListener()
        this.addEventBusListener()
        //加载完成之后初始化
        this.bpnmCreated(this.element)
        // 调控左侧工具栏
        this.adjustPalette()
      },
      addModelerListener () {
        // 监听 modeler
        const that = this
        const bpmnjs = that.bpmnModeler
        // 'shape.removed', 'connect.end', 'connect.move'
        const events = ['shape.added', 'shape.move.end', 'shape.removed']
        events.forEach(function (event) {
          // console.log(event)
          that.bpmnModeler.on(event, e => {
            var elementRegistry = bpmnjs.get('elementRegistry')
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            // console.log(shape)
            if (event === 'shape.added') {
              // if (e.element.type === 'bpmn:UserTask') {
              //   e.element.width = 60
              //   e.element.height = 48
              // }
              console.log('新增了shape')
              // 展示新增图形的属性
              that.key = e.element.id.replace('_label', '')
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
              that.element = e.element

            } else if (event === 'shape.move.end') {
              console.log('移动了shape')
              // 展示新增图形的属性
              that.key = shape.id
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
              that.element = e.shape
            } else if (event === 'shape.removed') {
              console.log('删除了shape')
              // 展示默认的属性
              that.propsComponent = 'CommonProps'
            }
          })
        })
      },
      /* 获取xml中角色设置记录，无选择的全为false */
      reloadRoleSet (that, nodes) {
        //工作负责人 roleLeftTable
        that.sonParams.roleLeftTable = [{'name': bpmnHelper.getBo(that.element).name}]
        // 进来的时候置空
        let roleSet = []
        //取到参与者-角色
        let actor = bpmnHelper.getExtensionTypeValues(nodes, 'activiti:Participant')
        //排除当前节点
        actor = actor.filter(item => item.id !== that.element.id)

        if (actor && actor.length > 0) {
          for (let i = 0; i < actor.length; i++) {
            // 按照一定的规则反解析字符串
            if (actor[0].types.length > 0) {
              let roles = actor[i].types[0].$attrs.role.split(';')
              if (roles.length > 0) {
                for (let j = 0; j < roles.length - 1; j++) {
                  let role = roles[j].split(',')
                  roleSet.push({
                    view: false, add: false, remove: false, name: role[1],  code: role[3], id: role[4],
                    sourceRef: actor[i].id, repository: [],
                  })
                }
              }
            }
          }
        }
        //置换角色设置中的值
        let roleSetReload = bpmnHelper.getExtensionTypeValues(nodes, 'activiti:RoleSet').filter(each => {
          return each.id === that.element.id
        })
        if (roleSetReload.length > 0) {
          roleSetReload[0].types.forEach(role => {
            //初次加载会出现类型错误，需要修改
            if (role.name !== undefined) {
              role.$attrs.name = role.name
              delete role.name;
              role.$attrs.add = role.$attrs.add === 'true'
              role.$attrs.remove = role.$attrs.remove === 'true'
              role.$attrs.view = role.$attrs.view === 'true'
            }
            //初始化 资源池
            if (role.$attrs.repository === undefined || role.$attrs.repository === '') {
              role.$attrs.repository = []
            }
          })
        }
        if (roleSetReload.length > 0 && roleSetReload[0].types.length > 0) {
          for (let i = 0; i < roleSet.length; i++) {
            roleSetReload[0].types.forEach(role => {
              if (role.$attrs.name === roleSet[i].name) {
                if (roleSet[i].code !== undefined){
                  role.$attrs.code = roleSet[i].code;
                }
                if (roleSet[i].id !== undefined){
                  role.$attrs.id = roleSet[i].id;
                }
                roleSet[i] = {...role.$attrs};
              }
              if (role.$attrs.repository.constructor === String) {
                let repositoryArr = role.$attrs.repository.split(';')
                roleSet[i].repository = []
                if (repositoryArr.length > 0) {
                  for (let j = 0; j < repositoryArr.length - 1; j++) {
                    let repository = repositoryArr[j].split(',')
                    roleSet[i].repository.push({
                      'name': repository[0], 'type': repository[1], 'id': repository[2]
                    })
                  }
                }
              }
            })
          }
        }

        that.sonParams.roleMiddleTable = roleSet
      },
      /* 获取参与者的xml中数据 */
      reloadParticipant (that, nodes) {
        let participants = bpmnHelper.getExtensionTypeValues(nodes, 'activiti:Participant')
        let actor = participants.filter(item => {
          return item.id === that.element.id
        })
        if (actor && actor.length > 0 && actor[0].types.length > 0) {
          let attrs = actor[0].types[0].$attrs
          // 按照一定的规则反解析字符串
          this.parseParticipantString(attrs, that)
        }
      },
      reloadVariable (that, nodes) {
        let varTypeValue = bpmnHelper.getExtensionTypeValues(nodes, 'activiti:Variable')
        that.sonParams.variable = varTypeValue.filter(item => {
          return item.id === that.element.id
        })
        if (that.sonParams.variable.length > 0) {
          that.sonParams.variable[0].types.forEach(element => {
            that.sonParams.fifthDates.push(element.$attrs)
          })
        }
      },
      parseParticipantString (attrs, that) {
        // 反解析字符串
        // jwzhao,type1;jwzhao,type2;
        let users = attrs.assign.split(';')
        if (users.length > 0) {
          for (let i = 0; i < users.length - 1; i++) {
            let user = users[i].split(',')
            that.sonParams.userRightArr.push({
              'userName': user[0], 'type': user[1], 'id': user[2]
            })
          }
        }

        // ALL.undefined,组名称，type1; NUMBER.2,组名称，type2;
        let groups = attrs.group.split(';')
        if (groups.length > 0) {
          for (let i = 0; i < groups.length - 1; i++) {
            let group = groups[i].split(',')
            let sonGroup = group[0].split('.')
            that.sonParams.teamRightArr.push({
              'need': sonGroup[0],
              'number': sonGroup[1],
              'name': group[1],
              'type': group[2],
              'id': group[3],
            })
          }
        }
        // ALL.undefined,角色名,type1,roleCode1;ANY.undefined,角色名,type2,roleCode2;NUMBER.3,角色名,type3,roleCode3;
        let roles = attrs.role.split(';')
        if (roles.length > 0) {
          for (let i = 0; i < roles.length - 1; i++) {
            let role = roles[i].split(',')
            let sonGroup = role[0].split('.')
            that.sonParams.roleRightArr.push({
              'need': sonGroup[0],
              'number': sonGroup[1],
              'name': role[1],
              'type': role[2],
              'roleCode': role[3],
              'id': role[4]
            })
          }
        }
      },
      addEventBusListener () {
        // 监听 element
        let that = this
        const bpmnjs = that.bpmnModeler
        //const ElementRegistry = this.bpmnModeler.get("ElementRegistry")
        const eventBus = that.bpmnModeler.get('eventBus')
        const eventTypes = ['element.click', 'element.changed', 'selection.changed']
        eventTypes.forEach(function (eventType) {
          eventBus.on(eventType, function (e) {
            if (eventType === 'element.changed') {
              that.elementChanged(e)
            } else if (eventType === 'element.click') {
              // 清空
              that.resetData()

              if (!e || e.element.type === 'bpmn:Process') {
                that.key = '1'
                that.propsComponent = 'CommonProps'
              } else {
                // 展示新增图形的属性
                that.key = e.element.id
                that.propsComponent = bpmnHelper.getComponentByEleType(e.element.type)
                console.log('propsComponent = ' + that.propsComponent + ' // type = ' + e.element.type)
              }
              if (that.element) {
                console.log(that.element.id + '：点击之前===点击之后：' + e.element.id)
              }
              //变化之间截取全局变量
              if (that.element.type === 'bpmn:Process' || that.sonParams.globVariable.length === 0) {
                that.getGlobVariable()
              }

              that.element = e.element // 更换element

              // 设置常规的名称
              that.userTaskName = bpmnHelper.getBo(e.element).name

              // 获取所有当前节点类型的节点
              let nodes = bpmnjs.get('elementRegistry').filter(element => element.type === bpmnHelper.getBo(that.element).$type)

              // 读取角色配置值
              that.reloadRoleSet(that, nodes)

              //获取变量中的值
              that.reloadVariable(that, nodes)

              // 获取参与者值
              that.reloadParticipant(that, nodes)
            }
          })
        })
      },
      isInvalid (param) { // 判断是否是无效的值
        return param === null || param === undefined || param === ''
      },
      isSequenceFlow (type) { // 判断是否是线
        return type === 'bpmn:SequenceFlow'
      },
      elementChanged (e) {
        const id = e.element.id.replace('_label', '')
        var shape = this.getShape(id)
        this.element = shape
        const that = this
        console.log('元素改变')
        if (!shape) {
          // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
          console.log('无效的shape')
          // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
          console.log('删除了shape和connect')
          return
        }
        if (!this.isInvalid(shape.type)) {
          if (this.isSequenceFlow(shape.type)) {
            console.log('改变了线')
          } else {
            that.setDefaultProperties()
          }
        }
      },
      getShape (id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
      },
      setDefaultProperties () {
        console.log('setDefaultProperties')
        const that = this
        const {element} = that
        if (element) {
          // 这里可以拿到当前点击的节点的所有属性
          const {type, businessObject} = element
          const {name} = businessObject
          if (that.verifyIsEvent(type)) {
            // const eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : ''
            console.log('eventType', type)
          } else if (this.verifyIsTask(type)) {
            // const taskType = type
            console.log('taskType', type)
          }
          that.element['name'] = name || that.defaultData[element.type]
        }
      },
      verifyIsEvent (type) {
        return type.includes('Event')
      },
      verifyIsTask (type) {
        return type.includes('Task')
      },

      // 调整左侧工具栏排版
      adjustPalette () {
        try {
          // 获取 bpmn 设计器实例
          const canvas = this.$refs.canvas
          const djsPalette = canvas.children[0].children[1].children[4]
          const djsPalStyle = {
            width: '130px',
            padding: '5px',
            background: 'white',
            left: '20px',
            borderRadius: 0
          }
          for (var key in djsPalStyle) {
            djsPalette.style[key] = djsPalStyle[key]
          }
          const palette = djsPalette.children[0]
          const allGroups = palette.children
          allGroups[0].style['display'] = 'none'
          allGroups[4].style['display'] = 'none'
          allGroups[5].style['display'] = 'none'
          allGroups[6].style['display'] = 'none'
          allGroups[7].style['display'] = 'none'
          // 修改控件样式
          for (var gKey in allGroups) {
            let group = allGroups[gKey]
            for (var cKey in group.children) {
              const control = group.children[cKey]
              const controlStyle = {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                padding: '5px'
              }
              if (
                control.className &&
                control.dataset &&
                control.className.indexOf('entry') !== -1
              ) {
                const controlProps = this.bpmData.getControl(
                  control.dataset.action
                )
                control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
                  controlProps['title']
                }</div>`
                for (var csKey in controlStyle) {
                  control.style[csKey] = controlStyle[csKey]
                }
              }
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      bpnmCreated (shape) {
        //获取全局变量
        this.getGlobVariable(shape)
        //加载名称
        this.userTaskName = bpmnHelper.getBo(shape).name

        //获取变量中的值
        this.reloadVariable(this, Array.of(shape))

        this.propsComponent = 'CommonProps'
      },
      getGlobVariable (shape) {
        //获取变量中的值
        let nodes = shape ? Array.of(shape) : this.bpmnModeler.get('elementRegistry').filter(element => element.type === 'bpmn:Process')
        let varTypeValue = bpmnHelper.getExtensionTypeValues(nodes, 'activiti:Variable')
        //将全局变量放入
        if (varTypeValue.length > 0) {
          this.sonParams.globVariable = varTypeValue[0].types.map(item => item.$attrs)
        }
      }
    },
    mounted () {
      //初始化模型编辑器
      this.initBpmnModeler()
    }
  }

</script>

<style>
  .el-form-item__label {
    font-size: 13px
  }

  .el-main {
    padding: 5px
  }

  .el-input--mini .el-input__inner {
    height: 23px;
    line-height: 23px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0 0 0px;
  }

  .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    line-height: 23px;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 3px;
  }

  .el-checkbox__label {
    padding-left: 10px;
    line-height: 19px;
    font-size: 13px;
  }

  .el-input__inner {
    padding: 0 5px;
  }

  .el-textarea__inner {
    padding: 5px 5px;
  }

  .el-input--mini .el-input__icon {
    line-height: 23px;
  }

  .saveXml {
    display: flex;
    margin-left: 350px;
  }

  a[class="bjs-powered-by"] {
    display: none;
  }

  .bpmn-container {
    width: 100%;
    height: 100vh;
    display: flex;
  }

  .bpmn-canvas {
    width: calc(100% - 300px);
    height: 100vh;
  }

  .action {
    position: fixed;
    bottom: 10px;
    left: 10px;
    display: flex;
  }

  .icon {
    position: absolute;
    width: 41px;
    height: 41px;
    background: #fff;
    text-align: center;
    line-height: 40px;
    left: -41px;
    border: 1px #ddd solid;
    top: -1px;
  }

  .two-icon {
    margin-top: 50px;
  }
</style>
