<template>
	<div class="container">
		<div class="content">
			<div class="canvas" ref="canvas"></div>

		</div>
		<div class="slide" @mousedown="slideDown">⋮</div>
		<div class="side">
			<component :is="propsComponent" v-if="bpmnModeler" :modeler="bpmnModeler"
								 :params="bpmnParams" :element="element"></component>
			<span>
			<a-button type="primary" @click="saveBpmn" style="margin: 5px">{{local.save}}</a-button>
			<a-button @click="saveBpmn" style="margin: 5px">{{local.download}}</a-button>
			</span>
		</div>
	</div>
</template>

<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import 'bpmn-js/dist/assets/diagram-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

  import CustomControls from "../js/new/customControls";
  import CustomTranslate from "../js/new/customTranslate";
  import CustomModdle from '../js/new/activiti'
  import language from '../js/new/customTranslate/language'

  import ProcessProperties from "./bpmn-properties/ProcessProperties";
  import UserTaskProperties from "./bpmn-properties/UserTaskProperties";
  import ServiceTaskProperties from "./bpmn-properties/ServiceTaskProperties";
  import NameProperties from "./bpmn-properties/NameProperties";
  import {BpmnFunction, BpmnTag} from "../js/new/BpmnHelper";

  export default {
    name: "",
    props: {
      activeData: {
        type: Object,
        default: () => ({}),
      },
    },
    components: {ProcessProperties, UserTaskProperties, ServiceTaskProperties, NameProperties},
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        bpmnModeler: null,
        bpmnParams: {},
        propsComponent: '',
        element: null,
      }
    },
    mounted() {
      Object.assign(language, this.local.language);
      //初始化模型编辑器
      this.initBpmnModeler();
    },
    methods: {
      // region 页面处理方法
      saveBpmn() {
        const that = this;
        if (!that.validateBpmn()) {
          return;
        }
        // let rootParam = that.bpmnParams[that.bpmnParams.process.key];
        // const name = rootParam.name+'.bpmn';
        // const description = rootParam.description;
        // console.log(name,description);
        that.bpmnModeler.saveXML({format: true}, (err, xml) => {
          if (err) {
            console.error('流程数据生成失败');
            console.log(err);
            return
          }
          console.log(xml);
        })
      },
      validateBpmn() {
        for (let key of Object.keys(this.bpmnParams)) {
          const type = this.bpmnParams[key].$type;
          if (!type) {
            continue;
          }
          if (!this.bpmnParams[key].name) {
            let msg = this.local.pleaseEnter;
            if (type === 'bpmn:Process') {
              msg += this.local.workflowTemplate;
            } else if (type === 'bpmn:UserTask') {
              msg += this.local.userTask;
            } else if (type === 'bpmn:ServiceTask') {
              msg += this.local.callActivity;
            } else if (type === 'bpmn:StartEvent') {
              msg += this.local.startEvent;
            } else if (this.element.type === 'bpmn:EndEvent') {
              msg += this.local.endEvent;
            } else {
              continue;
            }
            msg += this.local.name;
            BpmnFunction.errorMessage(this, msg);
            return false;
          }
        }
        return true;
      },
      // endregion

      // region 布局信息
      slideDown(event) {
        const slideElement = event.toElement;
        const container = slideElement.parentElement;

        slideElement.style.background = '#818181';
        const slideStart = event.clientX;
        slideElement.left = slideElement.offsetLeft;

        document.onmousemove = function (event) {
          let slideEnd = event.clientX;
          let moveLen = slideElement.left + (slideEnd - slideStart) - 10;
          let containerWight = container.clientWidth - slideElement.offsetWidth;

          if (moveLen < 150) moveLen = 150;
          if (moveLen > containerWight - 3) moveLen = containerWight - 3;
          slideElement.previousElementSibling.style.width = moveLen + 'px';
          slideElement.nextElementSibling.style.width = (container.clientWidth - moveLen - 10) + 'px'
        };
        document.onmouseup = function () {
          slideElement.style.background = '#d6d6d6';
          document.onmousemove = null;
          document.onmouseup = null
        }
      },

      // endregion

      // region 初始化BPMN
      initBpmnModeler() {
        const that = this;
        this.bpmnModeler = new BpmnModeler({
          container: that.$refs.canvas,
          //自定义节点tip可选节点模块，翻译模块
          additionalModules: [
            CustomControls,
            {translate: ['value', CustomTranslate]}
          ],
          moddleExtensions: {activiti: CustomModdle}
        });
        that.bpmnModeler.importXML(that.activeData.bpmnXml, (err) => {
          if (err) {
            console.log('bpmn文档导入失败', err)
          } else {
            // 绑定监听事件
            that.success()
          }
        });
        // that.bpmnModeler.get("canvas").zoom(0.8);
        // that.bpmnModeler.get("canvas").zoom('fit-viewport');
      },
      success() {
        // 调控左侧工具栏
        this.adjustPalette();
        this.initBpmnParams();
        this.addEventBusListener();
      },
      initBpmnParams() {
        //解析的节点信息
        const nodeType = ['bpmn:Process', 'bpmn:StartEvent', 'bpmn:UserTask', 'bpmn:SequenceFlow', 'bpmn:ServiceTask', 'bpmn:EndEvent'];
        let that = this;
        this.bpmnModeler.get('elementRegistry').forEach(element => {
          if (element.type === 'bpmn:Process') {
            that.bpmnParams['process'] = {};
            that.bpmnParams.process['key'] = element.id;
            that.bpmnParams.process['element'] = element;
            that.element = element;
            that.propsComponent = 'ProcessProperties';
          }
          if (nodeType.includes(element.type)) {
            let businessObject = element.businessObject;
            //清洗数据
            if (businessObject.extensionElements) {
              // businessObject.extensionElements.get('values').filter(element => element['$type'] === BpmnTag.participant)
              //     .forEach(participant => {
              //       if (!participant.assigns) {
              //         participant.assigns = [];
              //       }
              //       //参与者
              //       if (participant.assign) {
              //         participant.assign.split(';').forEach(assign => {
              //           if (assign) {
              //             let attrs = assign.split(',');
              //             let tagElement = BpmnFunction.createElementTag(that.bpmnModeler, participant, BpmnTag.assign);
              //             tagElement.userName = attrs[0];
              //             tagElement.type = attrs[1];
              //             tagElement.id = attrs[2];
              //             participant.assigns.push(tagElement);
              //           }
              //         });
              //       }
              //       if (!participant.groups) {
              //         participant.groups = [];
              //       }
              //       if (participant.group) {
              //         participant.group.split(';').forEach(group => {
              //           if (group) {
              //             let attrs = group.split(',');
              //             let tagElement = BpmnFunction.createElementTag(that.bpmnModeler, participant, BpmnTag.group);
              //             tagElement.need = attrs[0].split('.')[0];
              //             tagElement.number = attrs[0].split('.')[1];
              //             tagElement.name = attrs[1];
              //             tagElement.type = attrs[2];
              //             tagElement.id = attrs[3];
              //             participant.groups.push(tagElement);
              //           }
              //         });
              //       }
              //       if (!participant.roles) {
              //         participant.roles = [];
              //       }
              //       if (participant.role) {
              //         participant.role.split(';').forEach(role => {
              //           if (role) {
              //             let attrs = role.split(',');
              //             let tagElement = BpmnFunction.createElementTag(that.bpmnModeler, participant, BpmnTag.role);
              //             tagElement.need = attrs[0].split('.')[0];
              //             tagElement.number = attrs[0].split('.')[1];
              //             tagElement.name = attrs[1];
              //             tagElement.type = attrs[2];
              //             tagElement.roleCode = attrs[3];
              //             tagElement.id = attrs[4];
              //             participant.roles.push(tagElement);
              //           }
              //         });
              //       }
              //       delete participant.assign;
              //       delete participant.group;
              //       delete participant.role;
              //     });
              // businessObject.extensionElements.get('values').filter(element => element['$type'] === BpmnTag.roleSet)
              //     .forEach(roleSet => {
              //       if (!roleSet.repositories) {
              //         roleSet.repositories = [];
              //       }
              //       if (roleSet.repository) {
              //         roleSet.repository.split(';').forEach(repository => {
              //           let attrs = repository.split(',');
              //           let tagElement = BpmnFunction.createElementTag(that.bpmnModeler, roleSet, BpmnTag.repository);
              //
              //           tagElement.name = attrs[0];
              //           tagElement.type = attrs[1];
              //           tagElement.id = attrs[2];
              //           roleSet.repositories.push(tagElement);
              //         });
              //       }
              //       delete roleSet.repository;
              //     });
            }
            that.bpmnParams[element.id] = businessObject;
          }
        });
      },
      adjustPalette() {
        // 获取 bpmn 设计器实例
        const canvas = this.$refs.canvas;
        canvas.children[0].removeChild(canvas.children[0].children[0]);
        //设置面板样式
        const selectPalette = canvas.children[0].children[0].children[4];
        const selectPalStyle = {width: '130px', padding: '5px', background: 'white', left: '20px', borderRadius: 0};
        for (let key in selectPalStyle) {
          selectPalette.style[key] = selectPalStyle[key]
        }
        //调整显示节点
        let allGroups = Array.from(selectPalette.children[0].children);
        const dataGroups = ['tools', 'data-object', 'data-store', 'collaboration', 'artifact'];
        allGroups = allGroups.filter(group => {
          if (dataGroups.includes(group.getAttribute('data-group'))) {
            group.style['display'] = 'none';
            return false;
          }
          return true;
        });

        // 修改控件样式
        const controlStyle = {
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: '5px'
        };
        allGroups.forEach(group => {
          Array.from(group.children).forEach(control => {
            let text = control.title;
            if (control.title.indexOf("创建") > -1) {
              text = text.slice(2).split('/')[0].replace('事件', '').replace('扩展', '');
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${text}</div>`;
            } else {
              text = text.split('/')[0].replace('Create ', '').replace('expanded ', '');
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:5px;'>${text}</div>`;
            }
            for (let key in controlStyle) {
              control.style[key] = controlStyle[key]
            }
          });
        });
      },
      addEventBusListener() {
        let that = this;
        this.bpmnModeler.on('element.click', event => {
          if (!event) {
            return;
          }
          that.element = event.element;
          if (that.element.type === 'bpmn:Process') {
            that.propsComponent = 'ProcessProperties'
          } else if (that.element.type === 'bpmn:UserTask') {
            that.propsComponent = 'UserTaskProperties'
          } else if (that.element.type === 'bpmn:ServiceTask') {
            that.propsComponent = 'ServiceTaskProperties'
          } else if (that.element.type === 'bpmn:StartEvent' || that.element.type === 'bpmn:EndEvent') {
            that.propsComponent = 'NameProperties'
          } else if (that.element.type === 'bpmn:SequenceFlow') {
            that.propsComponent = 'NameProperties'
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
        });
        this.bpmnModeler.on('interactionEvents.createHit', event => {
          that.propsComponent = 'NameProperties';
          that.element = event.element;
          if (that.element.type === 'bpmn:StartEvent') {
            that.element.businessObject.name = '开始';
          } else if (that.element.type === 'bpmn:EndEvent') {
            that.element.businessObject.name = '结束';
          }
          //添加新节点的时候都将元素添加到 bpmnParams 中
          that.bpmnParams[that.element.id] = that.element.businessObject;
        });
        this.bpmnModeler.on('connection.removed', event => {
          //移除该节点关联的转变
          let elementId = event.element.id;
          for (let key of Object.keys(this.bpmnParams)) {
            const type = that.bpmnParams[key].$type;
            if (!type || type !== 'bpmn:UserTask') {
              continue;
            }
            let values = that.bpmnParams[key].extensionElements.get('values');
            values = values.filter(element => !(element['$type'] === BpmnTag.taskListener && element['event'] === elementId));
            that.bpmnParams[key].extensionElements.set('values', values);
          }
          //移除节点时将元素从 bpmnParams 中移除
          delete that.bpmnParams[event.element.id];
          that.element = that.bpmnParams.process.element;
          that.propsComponent = 'ProcessProperties'
        });
        this.bpmnModeler.on('shape.removed', event => {
          //移除节点时将元素从 bpmnParams 中移除
          delete that.bpmnParams[event.element.id];
          that.element = that.bpmnParams.process.element;
          that.propsComponent = 'ProcessProperties'
        });


      },

      // endregion

    },

  }
</script>

<style scoped>
	/* 拖拽相关样式 */
	/*包围div样式*/
	.container {
		width: 95%;
		height: 80vh;
		margin: 1% 0;
		overflow: hidden;
	}

	/*左侧div样式*/
	.content {
		width: calc(60% - 7px); /*左侧初始化宽度*/
		background: #FFFFFF;
		float: left;
		box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.3);
	}

	/*拖拽区div样式*/
	.slide {
		cursor: w-resize;
		float: left;
		position: relative;
		top: 45%;
		background-color: #d6d6d6;
		/*border-radius: 5px;*/
		/*margin: -10px 0 -10px 0;*/
		width: 7px;
		height: 30px;
		background-size: cover;
		background-position: center;
		/*z-index: 99999;*/
		font-size: 20px;
		color: white;
	}

	/*拖拽区鼠标悬停样式*/
	.slide:hover {
		color: #444444;
	}

	/*右侧div'样式*/
	.side {
		float: left;
		width: 40%; /*右侧初始化宽度*/
		height: 79vh;
		background: #fff;
		box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.08);
	}

	/*画图区域样式*/
	.canvas {
		width: 100%;
		height: 79vh;
		background-color: #f9f8ef
	}


</style>
