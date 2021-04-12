<template>
  <el-dialog
  title="流程追踪"
  :visible.sync="dialogViewModelVisible"
  width="80%"
  :before-close="handleClose">
  <Display ref="viewer" :params="params"></Display>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleOk">确 定</el-button>
  </span>
</el-dialog>
</template>


<script>
import Display from './components/Display'
  export default {
    props: ['dialogViewModelVisible', 'params'],
    components: {
      Display
    },
    data() {
      return {

      };
    },
    methods: {
      handleOk() {
        this.$emit('handleViewModelVisiable', false)
        this.$refs.modeler.saveXML();
      },
      handleClose(done) {
        this.$emit('handleViewModelVisiable', false)
      },
    }
  };
</script>
