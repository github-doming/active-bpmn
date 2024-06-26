<template>
  <div class="container">
    <div class="content">
      <div class="canvas" ref="canvas"/>
    </div>
    <div class="slide" @mousedown="slideDown">⋮</div>
    <div class="side">
      <component :is="propsComponent" v-if="bpmnModeler" :modeler="bpmnModeler"
                 :params="bpmnParams" :element="element"></component>
    </div>
  </div>
</template>

<script>
  import BpmnViewer from "bpmn-js/lib/Viewer";
  import ProcessProperties from "./bpmn-show/ProcessProperties";
  import UserTaskProperties from "./bpmn-show/UserTaskProperties";
  import ServiceTaskProperties from "./bpmn-show/ServiceTaskProperties";
  import NameProperties from "./bpmn-show/NameProperties";
  import SequenceProperties from "./bpmn-show/SequenceProperties";
  import InclusiveGatewayProperties from "./bpmn-show/InclusiveGatewayProperties";
  import ExclusiveGatewayProperties from "./bpmn-show/ExclusiveGatewayProperties";
  import CustomModdle from "./js/activiti";
  import {BpmnConfig} from "./js/BpmnHelper";
  import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas'
  import CustomShow from "./js/customShow";

  export default {
    name: "show",
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
      SequenceProperties,
      InclusiveGatewayProperties,
      NameProperties,
      ExclusiveGatewayProperties
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
      //初始化模型编辑器
      this.initBpmnModeler();
    },
    methods: {
      // region 页面处理方法
      saveBpmn() {
        this.bpmnModeler.saveXML({format: true}, (err, xml) => {
          if (err) {
            console.error('流程数据生成失败');
            console.log(err);
            return
          }
          console.log(xml);
        })
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
        let canvas = this.$refs.canvas;
        this.bpmnModeler = new BpmnViewer({
          container: canvas,
          moddleExtensions: {activiti: CustomModdle},
          additionalModules: [
            CustomShow,MoveCanvasModule,
          ]
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
      addEventBusListener() {
        this.bpmnModeler.on('element.click', event => {
          let that = this;
          if (!event) {
            return;
          }
          that.element = event.element;
          if (that.element.type === 'bpmn:Process') {
            this.propsComponent = 'ProcessProperties';
          } else if (that.element.type === 'bpmn:UserTask') {
            this.propsComponent = 'UserTaskProperties';
          } else if (that.element.type === 'bpmn:ServiceTask') {
            that.propsComponent = 'ServiceTaskProperties'
          } else if (that.element.type === 'bpmn:StartEvent' || that.element.type === 'bpmn:EndEvent') {
            that.propsComponent = 'NameProperties'
          } else if (that.element.type === 'bpmn:SequenceFlow') {
            that.propsComponent = 'SequenceProperties'
          } else if (that.element.type === 'bpmn:InclusiveGateway') {
            this.propsComponent = 'InclusiveGatewayProperties';
          } else if (that.element.type === 'bpmn:ExclusiveGateway') {
            this.propsComponent = 'ExclusiveGatewayProperties';
          } else {
            that.element = that.bpmnParams.process.element;
            that.propsComponent = 'ProcessProperties'
          }
        });
      },
      adjustViewer() {
        const canvas = this.$refs.canvas;
        canvas.children[0].removeChild(canvas.children[0].children[0]);
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
    background: #FFFFFF;
    overflow-y: auto;
    height: 100%;
    width: calc(60% - 7px); /*左侧初始化宽度*/
    float: left;
    box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.3);
  }

  /*画图区域样式*/
  .canvas {
    width: 2000px;
    height: 99vh;
    background-color: #f9f8ef
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
    margin: 0 0 0;
  }


</style>
