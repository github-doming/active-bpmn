<template>
  <a-modal :centered="true" :maskClosable="false" :visible.sync="dialogVisible" width="90%"  @cancel="handleClose">
    <Modeler ref="modeler" :params="params" @handleOk="handleOk"></Modeler>
<!--    <Activiti></Activiti>-->
    <span slot="footer" class="dialog-footer">
    <a-button type="primary" @click="handleClose">
      取 消
    </a-button>
    <a-button type="primary" @click="handleOk">确 定</a-button>
  </span>
  </a-modal>
</template>


<script>
  import Modeler from './components/Modeler'
  import Activiti from './components/activeti/Activiti'

  export default {
    props: ['dialogVisible', 'params'],
    components: {
      Activiti,
      Modeler
    },
    data () {
      return {}
    },
    methods: {
      handleOk () {
        // Bus.$emit('target',5);
        this.$emit('handleVisiable', false)
        this.$refs.modeler.saveXML()
      },
      handleClose (done) {
        this.$emit('handleVisiable', false)
      },
    }
  }
</script>
