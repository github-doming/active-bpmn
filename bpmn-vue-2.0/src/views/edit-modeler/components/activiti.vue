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
			<a-button @click="saveBpmn" style="margin: 5px" v-show="downloadShow">{{local.download}}</a-button>
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
  import {BpmnConfig, BpmnFunction} from "./js/BpmnHelper";

  import ProcessProperties from "./bpmn-properties/ProcessProperties";
  import UserTaskProperties from "./bpmn-properties/UserTaskProperties";
  import ServiceTaskProperties from "./bpmn-properties/ServiceTaskProperties";
  import NameProperties from "./bpmn-properties/NameProperties";
  import SequenceProperties from "./bpmn-properties/SequenceProperties";
  import InclusiveGatewayProperties from "./bpmn-properties/InclusiveGatewayProperties";

  export default {
    name: "",
    props: {
      activeData: {
        type: Object,
        default: () => ({}),
      },
    },
    components: {
      ProcessProperties,
      UserTaskProperties,
      ServiceTaskProperties,
      NameProperties,
      SequenceProperties,
      InclusiveGatewayProperties
    },
    computed: {
      downloadShow() {
        return true;
      },
    },
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
        // const name = rootParam.name;
        // const description = rootParam.$attrs.description;
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
        this.initBpmnParams();
        this.addEventBusListener();
      },
      initBpmnParams() {
        //解析的节点信息
        const nodeType = BpmnConfig.analyzeTypes;
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
            that.bpmnParams[element.id] = element.businessObject;
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
        const dataAction = ['create.intermediate-event', 'create.task', 'create.exclusive-gateway'];
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
            that.propsComponent = 'UserTaskProperties'
          } else if (that.element.type === 'bpmn:ServiceTask') {
            that.propsComponent = 'ServiceTaskProperties'
          } else if (that.element.type === 'bpmn:StartEvent' || that.element.type === 'bpmn:EndEvent') {
            that.propsComponent = 'NameProperties'
          } else if (that.element.type === 'bpmn:SequenceFlow') {
            that.propsComponent = 'SequenceProperties'
          } else if (that.element.type === 'bpmn:InclusiveGateway') {
            this.propsComponent = 'InclusiveGatewayProperties';
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
        });
        that.bpmnModeler.on('shape.added', event => {
          if (event.element.type.indexOf('bpmn:') < 0) {
            return;
          }
          that.element = event.element;
          that.propsComponent = 'NameProperties';
          const type = that.element.type;
          if (type === 'bpmn:StartEvent') {
            that.element.businessObject.name = '开始';
          } else if (type === 'bpmn:EndEvent') {
            that.element.businessObject.name = '结束';
          } else if (type === 'bpmn:UserTask') {
            that.propsComponent = 'UserTaskProperties';
          } else if (type === 'bpmn:InclusiveGateway') {
            that.propsComponent = 'InclusiveGatewayProperties';
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
        });
        that.bpmnModeler.on('interactionEvents.createHit', event => {
          //添加新节点的时候都将元素添加到 bpmnParams 中
          that.bpmnParams[event.element.id] = event.element.businessObject;
        });
        // region 节点移除
        that.bpmnModeler.on('connection.removed', event => {
          //移除该节点关联的转变
          BpmnFunction.deleteTaskListener(that.bpmnParams, event.element.id);
          //移除节点时将元素从 bpmnParams 中移除
          that.removedElement(event);
        });
        that.bpmnModeler.on('shape.removed', event => {
          //移除节点时将元素从 bpmnParams 中移除
          that.removedElement(event);
        });
        // endregion
      },
      removedElement(event) {
        if (event.element.type.indexOf('bpmn:') < 0) {
          return;
        }
        delete this.bpmnParams[event.element.id];
        this.element = this.bpmnParams.process.element;
        this.propsComponent = 'ProcessProperties'
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
<style>
  .bpmn-icon-red:before {
    color: #cc0026;
  }
</style>
