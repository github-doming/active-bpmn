<template>
  <div class="viewer-container">
    <div class="viewer-content">
      <div ref="canvas" class="canvas"/>
    </div>
    <div class="viewer-slide" @mousedown="slideDown"></div>
    <div class="viewer-side" style="overflow:auto;padding-top: 10px">
      <div>
        <a @click="showAttribute = !showAttribute" style="float: right">{{showText}}</a>
        <attribute-panel panel-id="Process_1" panel-title="建库流程" title-size="large"
                         :show-attribute="showAttribute">
          <attribute-panel panel-title="进程详细信息" :has-border="false" title-size="small">
            <div>
              <span style="width: 100px;float: left;font-weight:bold;">类别:</span>
              <div style="text-align:left">默认值</div>
            </div>
            <div>
              <span style="width: 100px;float: left">类别:</span>
              <div style="text-align:left">默认值</div>
            </div>
            <div>
              <span style="width: 100px;float: left">类别:</span>
              <div style="text-align:left">默认值</div>
            </div>
          </attribute-panel>
          <attribute-panel panel-title="进程变量" :has-border="false" title-size="small"/>
          <attribute-panel panel-title="进程参与者" :has-border="false" title-size="small"/>
          <attribute-panel panel-title="进程内容" :has-border="false" title-size="small"/>
        </attribute-panel>
        <attribute-panel panel-title="活动" title-size="large" :show-attribute="showAttribute">
          <attribute-panel panel-id="Activity_1nr5csw" panel-title="活动：提交">
            <attribute-panel panel-title="活动特性" :has-border="false" title-size="small"/>
            <attribute-panel panel-title="活动参与者" :has-border="false" title-size="small"/>
            <attribute-panel panel-title="活动详细信息" :has-border="false" title-size="small"/>
            <attribute-panel panel-title="活动变量" :has-border="false"
                             title-size="small"/>
          </attribute-panel>
        </attribute-panel>
      </div>
    </div>

  </div>
</template>

<script>
  import BpmnViewer from "bpmn-js/lib/Viewer";


  import AttributePanel from './bpmn-viewer/AttributePanel'
  import CustomModdle from "./js/activiti";
  import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
  import CustomShow from "./js/customShow";

  export default {
    name: "viewer",
    components: {AttributePanel},
    props: {
      activeData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        bpmnModeler: null,
        key: '1',
        runningKeys: [],
        ranKeys: [],
        terminatedKeys: [],
        abortedKeys:[],
        processKey: '',
        element: null,
        showAttribute: true,
      }
    },
    computed: {
      showText() {
        return this.showAttribute ? '全部收缩' : '全部展开';
      }
    },
    mounted() {
      //初始化模型编辑器
      this.initBpmnModeler();
    },
    methods: {
      slideDown(event) {
        const slideElement = event.toElement;
        const container = slideElement.parentElement;

        slideElement.style.background = '#818181';
        const slideStart = event.clientY;
        slideElement.top = slideElement.offsetTop - 60;

        document.onmousemove = function (event) {
          let slideEnd = event.clientY;
          let topLen = slideElement.top + (slideEnd - slideStart);
          let containerHeight = container.clientHeight - slideElement.offsetHeight;

          if (topLen < 50) topLen = 50;
          if (topLen > containerHeight - 50) topLen = containerHeight - 50;
          slideElement.previousElementSibling.style.height = topLen + 'px';
          slideElement.nextElementSibling.style.height = (container.clientHeight - topLen - 7) + 'px'
        };
        document.onmouseup = function () {
          slideElement.style.background = '#d6d6d6';
          document.onmousemove = null;
          document.onmouseup = null;
        }
      },
      initBpmnModeler() {
        let canvas = this.$refs.canvas;
        this.bpmnModeler = new BpmnViewer({
          container: canvas,
          moddleExtensions: {activiti: CustomModdle},
          additionalModules: [
            CustomShow,MoveCanvasModule ,
          ]
        });
        this.importBpmnXml()
      },
      importBpmnXml() {
        const that = this;
        that.bpmnModeler.importXML(that.activeData.bpmnXml, (err) => {
          if (err) {
            console.log('bpmn文档导入失败')
          } else {
            // 绑定监听事件
            that.success()
          }
        })
      },
      success() {
        this.element = this.bpmnModeler.get('elementRegistry').filter(element => element.type === 'bpmn:Process')[0];
        this.processKey = this.element.id;
        this.adjustViewer();
        this.addModelerListener();
        this.highlightRun();

      },
      addModelerListener() {
        let that = this;
        const eventBus = this.bpmnModeler.get('eventBus');
        eventBus.on('element.click', event => {
          if (!event || event.element.type === 'bpmn:Process') {
            that.key = that.processKey;
            that.element = event.element
          } else {
            // 展示新增图形的属性
            that.key = event.element.id;
            that.element = event.element;

          }
          let element = document.getElementById(that.key);
          if (!element) {
            element = document.getElementById(that.processKey);
          }
          element.scrollIntoView(true);
        });
      },
      highlightRun() {
        let canvas = this.bpmnModeler.get('canvas');
        this.runningKeys.forEach(key => {
          canvas.addMarker(key, 'running');
        });
        this.ranKeys.forEach(key => {
          canvas.addMarker(key, 'ran');
        });
        this.terminatedKeys.forEach(key => {
          canvas.addMarker(key, 'terminated');
        });
        this.abortedKeys.forEach(key => {
          canvas.addMarker(key, 'aborted');
        });
      },
      adjustViewer() {
        const canvas = this.$refs.canvas;
        canvas.children[0].removeChild(canvas.children[0].children[0]);
        // let bpmnCanvas = this.bpmnModeler.get('canvas');
        // this.bpmnModeler.get('elementRegistry').forEach(element => {
        //   if (element.type === 'bpmn:ServiceTask' && element.businessObject.$attrs['activiti:class'] === BpmnConfig.statusAutoClass) {
        //     bpmnCanvas.addMarker(element.id, 'status-auto');
        //   }
        // });
      },

    }

  }
</script>

<style scoped>
  /* 拖拽相关样式 */
  /*包围div样式*/
  .viewer-container {
    width: 95%;
    height: 80vh;
    margin: 1% 0;
    overflow: hidden;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*左侧div样式*/
  .viewer-content {
    width: 100%;
    height: calc(60% - 7px); /*左侧初始化宽度*/
    background: #FFFFFF;
    overflow: scroll;
  }

  /*拖拽区div样式*/
  .viewer-slide {
    cursor: s-resize;
    position: relative;
    background-color: #d6d6d6;
    width: 100%;
    height: 7px;
    background-size: cover;
    background-position: center;
    font-size: 20px;
    color: white;
  }


  /*右侧div'样式*/
  .viewer-side {
    float: left;
    width: 100%;
    height: 30%;
    background: #fff;
    margin: 16px 0 0;
  }

  /*画图区域样式*/
  .canvas {
    width: 2000px;
    height: 100vh;
    border: 1px solid #c7c7c7;
  }
</style>
<style>
  /*已运行节点样式*/
  .ran .djs-visual > :nth-child(1) {
    fill: #d0d0d0 !important;
  }

  /*正在运行节点样式*/
  .running .djs-visual > :nth-child(1) {
    fill: #00cc5c !important;
  }

  /*已终止的任务节点样式*/
  .terminated .djs-visual > :nth-child(1) {
    fill: #fcfa3a !important;
  }
  /*已终止的任务节点样式*/
  .aborted .djs-visual > :nth-child(1) {
    fill: #fc000d !important;
  }
  /*状态自动机节点样式*/
  /*.status-auto .djs-visual > :nth-child(1) {*/
  /*  fill: #fc7b07 !important;*/
  /*}*/

</style>
