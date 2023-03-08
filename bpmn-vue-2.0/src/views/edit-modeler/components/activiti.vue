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
			<a-button type="primary" @click="closeBpmn" style="margin: 5px">{{local.close}}</a-button>
			<a-button @click="exportBpmn" style="margin: 5px" v-show="downloadShow || isDebug">{{local.download}}</a-button>
			<a-button @click="$refs.refFile.click()" style="margin: 5px" v-show="isDebug">{{local.import}}</a-button>
				<!-- 用于打开本地文件-->
      <input type="file" id="files" ref="refFile" style="display: none" accept=".xml, .bpmn" @change="importBpmn"/>
			</span>
		</div>
	</div>
</template>

<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import 'bpmn-js/dist/assets/diagram-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

  import CustomControls from "./js/customControls";
  import CustomTranslate from "./js/customTranslate";
  import CustomModdle from './js/activiti'
  import language from './js/customTranslate/language'
  import {BpmnConfig, BpmnFunction, BpmnTag} from "./js/BpmnHelper";

  import ProcessProperties from "./bpmn-properties/ProcessProperties";
  import UserTaskProperties from "./bpmn-properties/UserTaskProperties";
  import ServiceTaskProperties from "./bpmn-properties/ServiceTaskProperties";
  import NameProperties from "./bpmn-properties/NameProperties";
  import SequenceProperties from "./bpmn-properties/SequenceProperties";
  import InclusiveGatewayProperties from "./bpmn-properties/InclusiveGatewayProperties";
  import IntermediateCatchEventProperties from "./bpmn-properties/IntermediateCatchEventProperties";

  export default {
    name: "",
    props: {
      activeData: {
        type: Object,
        default: () => ({}),
      },
    },
    components: {
      ProcessProperties, UserTaskProperties, ServiceTaskProperties, NameProperties, SequenceProperties,
      InclusiveGatewayProperties, IntermediateCatchEventProperties
    },
    computed: {
      downloadShow() {
        return true;
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')), isDataRepair: true, isDebug: true,
        bpmnModeler: null, bpmnParams: {}, propsComponent: '', element: null, connectionSource: null, isChange: false,
      }
    },
    mounted() {
      Object.assign(language, this.local.language);
      //初始化模型编辑器
      this.initBpmnModeler();
      console.log("init success");
    },
    methods: {
      // region 页面处理方法
      saveBpmn() {
        const that = this;
        that.getBpmnXml().then(newXml => {
          console.log(newXml);
          that.setBpmnXml(newXml);
        });
      },
      closeBpmn() {
        console.log('closeBpmn');
        const that = this;
        if (that.isChange) {
          that.showCloseConfirm();
          return;
        }
        that.getBpmnXml().then(newXml => {
          const parser = new DOMParser();
          const newXmlDoc = parser.parseFromString(newXml, "text/xml");
          const oldXmlDoc = parser.parseFromString(that.activeData.bpmnXml, "text/xml");
          that.isChange = !newXmlDoc.isEqualNode(oldXmlDoc);
          if (that.isChange) {
            that.showCloseConfirm(newXml);
          }
        })
      },
      showCloseConfirm(newXml) {
        const that = this;
        that.$confirm({
          title: '对当前模板更行的更改尚未保存保存这些更改吗?',
          content: '当点击确认按钮时，会保存当前编辑的数据并关闭窗口,否则窗口直接关闭,数据不会保存!',
          okText: "确认",
          cancelText: "取消",
          onOk() {
            that.setBpmnXml(newXml);
          },
        });
      },
      setBpmnXml(newXml) {
        this.activeData.bpmnXml = newXml;
        this.isChange = false;
        BpmnFunction.setBpmnTemplate(newXml);
      },
      async getBpmnXml() {
        const that = this;
        if (!that.validateBpmn()) {
          return '';
        }
        let bpmnXml;
        this.bpmnModeler.saveXML({format: false}, (err, xml) => {
          if (err) {
            BpmnFunction.errorMessage(that, '流程数据生成失败 ' + err);
            bpmnXml = '';
          } else {
            bpmnXml = xml;
          }
        });
        return bpmnXml;
      },
      exportBpmn() {
        const that = this;
        if (!that.validateBpmn()) {
          return;
        }
        that.bpmnModeler.saveXML({format: true}, (err, xml) => {
          if (err) {
            console.error('流程数据生成失败');
            console.log(err);
            return;
          }
          const anchor = document.createElement("a");
          anchor.href = "data:application/bpmn20-xml;charset=UTF-8," + encodeURIComponent(xml);
          anchor.download = "diagram.bpmn";
          anchor.click();
        })
      },
      importBpmn() {
        const that = this;
        const file = this.$refs.refFile.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
          let xmlStr = this.result;
          that.bpmnModeler.importXML(xmlStr, (err) => {
            if (err) {
              console.log('bpmn文档导入失败', err)
            } else {
              that.parsedBpmnParams();
            }
          });
        };
      },
      validateBpmn() {
        if (this.isDebug) {
          return true;
        }
        this.parsedBpmnParams();
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
            CustomControls, {translate: ['value', CustomTranslate], labelEditingProvider: ['value', ""]},
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
      },
      success() {
        this.adjustViewer();
        this.parsedBpmnParams();
        this.addEventBusListener();
      },
      parsedBpmnParams() {
        //解析的节点信息
        const nodeType = BpmnConfig.analyzeTypes;
        let that = this;
        this.bpmnParams = {};
        this.bpmnModeler.get('elementRegistry').forEach(element => {
          if (element.type === 'bpmn:Process') {
            that.bpmnParams['process'] = {};
            that.bpmnParams.process['key'] = element.id;
            that.bpmnParams.process['element'] = element;
            that.element = element;
            that.propsComponent = 'ProcessProperties';
          }
          if (nodeType.includes(element.type)) {
            that.bpmnParams[element.id] = element.businessObject;
          }
          if (that.isDataRepair) {
            that.dataRepair(element);
          }
        });
      },
      adjustViewer() {
        // 获取 bpmn 设计器实例
        const canvas = this.$refs.canvas;
        canvas.children[0].removeChild(canvas.children[0].children[0]);
        //设置面板样式
        const selectPalette = canvas.children[0].children[0].children[4];
        const selectPalStyle = {width: '135px', padding: '5px', background: 'white', left: '20px', borderRadius: 0};
        for (let key in selectPalStyle) {
          selectPalette.style[key] = selectPalStyle[key]
        }
        //调整显示类型
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
        //调整显示节点
        const dataAction = ['create.intermediate-event', 'create.task', 'create.exclusive-gateway','create.subprocess-expanded'];
        allGroups.forEach(group => {
          Array.from(group.children).forEach(control => {
            if (dataAction.includes(control.getAttribute('data-action'))) {
              control.style['display'] = 'none';
              return;
            }
            let text = control.title;
            if (control.title.indexOf("创建") > -1) {
              text = text.slice(2).split('/')[0].replace('事件', '').replace('扩展', '');
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:10px;'>${text}</div>`;
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
        that.bpmnModeler.on('element.click', event => {
          if (!event) {
            return;
          }
          that.element = event.element;
          if (that.element.type === 'bpmn:Process') {
            that.propsComponent = 'ProcessProperties'
          } else if (that.element.type === 'bpmn:UserTask') {
            that.propsComponent = 'UserTaskProperties';
          } else if (that.element.type === 'bpmn:ServiceTask') {
            that.propsComponent = 'ServiceTaskProperties'
          } else if (that.element.type === 'bpmn:StartEvent' || that.element.type === 'bpmn:EndEvent') {
            that.propsComponent = 'NameProperties'
          } else if (that.element.type === 'bpmn:SequenceFlow') {
            that.propsComponent = 'SequenceProperties'
          } else if (that.element.type === 'bpmn:InclusiveGateway') {
            this.propsComponent = 'InclusiveGatewayProperties';
          } else if (that.element.type === 'bpmn:IntermediateCatchEvent') {
            this.propsComponent = 'IntermediateCatchEventProperties';
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
        });
        that.bpmnModeler.on('shape.added', event => {
          if (event.element.type.indexOf('bpmn:') < 0) {
            return;
          }
          const element = event.element;
          that.element = element;
          const type = that.element.type;
          if (type === 'bpmn:StartEvent') {
            element.businessObject.name = '开始';
          } else if (type === 'bpmn:EndEvent') {
            element.businessObject.name = '结束';
          } else if (type === 'bpmn:UserTask') {
            that.propsComponent = 'UserTaskProperties';
          } else if (type === 'bpmn:InclusiveGateway') {
            that.propsComponent = 'InclusiveGatewayProperties';
          } else if (type === 'bpmn:IntermediateCatchEvent') {
            that.propsComponent = 'IntermediateCatchEventProperties';
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
          setTimeout(() => {
            if (element.incoming[0]) {
              if (element.incoming[0].source.outgoing.length === 1) {
                const elements = [element, element.incoming[0].source];
                const align = this.bpmnModeler.get("alignElements");
                align.trigger(elements, 'bottom');
              }
            }
          }, 2);

        });
        that.bpmnModeler.on("bendpoint.move.hover", (event) => {
          if (that.connectionSource === null) {
            that.connectionSource = event.hover;
          }
        });
        that.bpmnModeler.on("bendpoint.move.cleanup", (event) => {
          if (event.hover !== that.connectionSource) {
            BpmnFunction.deleteSequence(event.connection, that.connectionSource);
            that.connectionSource = null;
          }
        });
        that.bpmnModeler.on('interactionEvents.createHit', event => {
          //添加新节点的时候都将元素添加到 bpmnParams 中
          that.bpmnParams[event.element.id] = event.element.businessObject;
        });
        that.bpmnModeler.on('commandStack.changed', event => {
          console.log('commandStack.changed');
          that.isChange = true;
        });
        // region 节点移除
        that.bpmnModeler.on('connection.removed', event => {
          //移除该节点关联的转变
          const element = event.element;
          BpmnFunction.deleteSequence(element, element.source);
          //移除节点时将元素从 bpmnParams 中移除
          that.removedElement(element);
        });
        that.bpmnModeler.on('shape.removed', event => {
          //移除节点时将元素从 bpmnParams 中移除
          that.removedElement(event.element);
          let elementId = event.element.id;
          Object.values(that.bpmnParams).forEach(element => {
            if ('bpmn:UserTask' === element.$type) {
              let values = element.extensionElements.get("values");
              values = values.filter(item => !(item['$type'] === BpmnTag.roleSet && item.sourceRef === elementId));
              element.extensionElements.set('values', values);
            }
          })
        });
        // endregion
      },
      removedElement(element) {
        if (element.type.indexOf('bpmn:') < 0) {
          return;
        }
        delete this.bpmnParams[element.id];
        this.element = this.bpmnParams.process.element;
        this.propsComponent = 'ProcessProperties'
      },
      dataRepair(element) {
        if (element.type === 'bpmn:ServiceTask') {
          if (element.businessObject.$attrs['activiti:class'] !== BpmnConfig.statusAutoClass) {
            element.businessObject.extensionElements.set('values', []);
          }
        }
      }
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
<style>
	.icon-custom {
		border-radius: 50%;
		background-size: 65%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.icon-custom-status-auto:before {
		content: url('./js/util/set-status.svg');
	}

	.icon-custom-mail-auto:before {
		content: url('./js/util/e-mail.svg');
	}
	[class^="icon-custom-"]:before, [class*=" icon-custom-"]:before {
		font-style: normal;
		font-weight: normal;
		speak: none;
		display: inline-block;
		text-decoration: inherit;
		width: 1em;
		text-align: center;
		font-variant: normal;
		text-transform: none;
		line-height: 1em;
	}
</style>
