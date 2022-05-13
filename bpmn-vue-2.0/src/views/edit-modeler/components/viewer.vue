<template>
	<div style="height: 80vh;">
		<drag-layout line-pos="70">
			<div slot="top" style="height: 100%" ref="canvas">
			</div>
			<div slot="bottom">
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
		</drag-layout>
	</div>
</template>

<script>
  import BpmnViewer from "bpmn-js/lib/Viewer";


  import AttributePanel from './bpmn-viewer/AttributePanel'
  import CustomModdle from "./js/activiti";
  import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
  import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll'

  import CustomShow from "./js/customShow";
  import DragLayout from "./bpmn-viewer/DragLayout";

  export default {
    name: "viewer",
    components: {DragLayout, AttributePanel},
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
        abortedKeys: [],
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
            CustomShow, MoveCanvasModule, ZoomScrollModule,
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
        const canvas = this.bpmnModeler.get("canvas");
        canvas.zoom(0.8);
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
      },

    }

  }
</script>
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


</style>
