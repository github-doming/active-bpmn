<template>
  <div class="container">
    <div class="content">
      <div class="canvas" ref="canvas"></div>

    </div>
    <div class="slide" @mousedown="slideDown">⋮</div>
    <div class="side">
      <component ref="compo" :is="propsComponent"></component>
    </div>
  </div>
</template>

<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import customControlsModule from '../../js/customControls'
  import activitiModdleDescriptor from '../../js/activiti'
  import bpmnHelper from '../../js/helper/BpmnHelper'

  export default {
    name: 'Activiti',
    data () {
      return {
        propsComponent: '',
      }
    },
    mounted () {
      //初始化模型编辑器
      this.initBpmnModeler()
    },
    methods: {
      slideDown (event) {
        const slideElement = event.toElement
        const container = slideElement.parentElement

        slideElement.style.background = '#818181'
        const slideStart = event.clientX
        slideElement.left = slideElement.offsetLeft

        document.onmousemove = function (event) {
          let slideEnd = event.clientX
          let moveLen = slideElement.left + (slideEnd - slideStart) - 25
          let containerWight = container.clientWidth - slideElement.offsetWidth

          if (moveLen < 150) moveLen = 150
          if (moveLen > containerWight - 3) moveLen = containerWight - 3
          slideElement.previousElementSibling.style.width = moveLen + 'px'
          slideElement.nextElementSibling.style.width = (container.clientWidth - moveLen - 10) + 'px'
        }
        document.onmouseup = function () {
          slideElement.style.background = '#d6d6d6'
          document.onmousemove = null
          document.onmouseup = null
        }
      },
      initBpmnModeler () {
        let canvas = this.$refs.canvas
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加属性面板，添加翻译模块
          additionalModules: [
          ],
          //模块拓展，拓展activiti的描述
          moddleExtensions: {
          }
        })
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
      success(){
        console.log('创建成功!');
      },

    }
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
    width: calc(70% - 7px); /*左侧初始化宽度*/
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
    width: 30%; /*右侧初始化宽度*/
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
