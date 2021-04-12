<template>
  <div>
    <ProcessDesign :dialogVisible="dialogVisible" :params="params" v-on:handleVisiable="handleVisiable(visible)"></ProcessDesign>
  </div>
  <div>
    <ProcessView :dialogViewModelVisible="dialogViewModelVisible" :params="params" v-on:handleViewModelVisiable="handleViewModelVisiable(visible)"></ProcessView>
  </div>
</template>


<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import ProcessDesign from '../edit-modeler/ProcessDesign'
  import ProcessView from '../edit-modeler/ProcessView'
  import request from '../util/request'

  Vue.use(ElementUI)
  Vue.use(Antd)
  export default {
    name: 'Container',
    components: {
      ProcessDesign,
      ProcessView
    },
    props: [
      params
    ],
    data () {
      return {
        dialogViewModelVisible: false,
        dialogVisible: false,

      }
    },
    methods: {
      /* 显示 */
      async handleView (index, row) {
        const that = this
        that.params.row = row
        // 到后台请求xml文件
        await request({
          url: `/workflow/model/${row.id}/xml`
        })
          .then(function (res) {

            that.params.bpmnXml = res.data.bpmnXml
          })
          .catch(function (err) {
            console.log('获取反显流程xml失败')
          })
        // 注意放的位置，避免异步请求导致实际设计器中没有bpmnXml值
        that.dialogViewModelVisible = true
      },

    }

  }
</script>

<style scoped>

</style>
