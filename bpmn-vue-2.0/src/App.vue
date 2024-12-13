<template>
  <div id="app">
    <h1>流程管理</h1>
    <a-row type="flex" justify="center">
      <a-table :columns="columns" :data-source="tableData" :rowKey="record => record.id" :span="20">
        <div slot="operation" slot-scope="text, record">
          <a-button class="btn-border" @click="handleEdit()">编辑</a-button>
          <a-button class="btn-border" @click="handleView()">查看</a-button>
          <a-button class="btn-border" @click="handleShow()">展示</a-button>
          <a-button class="btn-border" @click="handleDelete(record)">删除</a-button>
        </div>
      </a-table>
    </a-row>
    <a-modal :centered="true" :maskClosable="false" :title="dialogTitle" :visible.sync="dialogVisible" width="90%"
             @cancel="handleClose">
      <div>
        <component ref="modeler" :is="dialogComponent" :activeData="activeData"></component>
      </div>
      <span slot="footer" class="dialog-footer">
				<a-button @click="handleDisplay">显示XML</a-button>
				<a-button type="danger" @click="handleClose">取 消</a-button>
				<a-button type="primary" @click="handleOk">确 定</a-button>
			</span>
    </a-modal>

  </div>
</template>

<script>
  import request from './util/request'
  import {BpmnFunction} from "./views/edit-modeler/components/js/BpmnHelper";

  import activeti from "./views/edit-modeler/components/activiti";
  import show from "./views/edit-modeler/components/show";
  import viewer from "./views/edit-modeler/components/viewer";

  export default {
    data() {
      return {
        columns: [
          {
            title: '流程标识',
            dataIndex: 'id',
            width: 180,
          }, {
            title: '流程名称',
            dataIndex: 'name',
            width: 180,
          }, {
            title: '上次更新时间',
            dataIndex: 'lastUpdateTime',
            width: 180,
          }, {
            title: '版本',
            dataIndex: 'version',
            width: 180,
          }, {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
        tableData: [],
        dialogVisible: false,
        dialogComponent: '',
        dialogTitle: '',
        activeData: {},
      }
    },
    components: {activeti, viewer, show},
    mounted() {
      const that = this;
      request({method: 'get', url: '/workflow/model/list',})
          .then(res => that.tableData = res.data).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/local',})
          .then(res => {
            localStorage.setItem('activeLocal', JSON.stringify(res.data));
          }).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/template',})
          .then(res => {
            localStorage.setItem('activeTemplate', JSON.stringify(res.data));
          }).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/status',})
          .then(res => {
            localStorage.setItem('activeStatus', JSON.stringify(res.data));
          }).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/subProcess',})
          .then(res => {
            localStorage.setItem('subProcesses', JSON.stringify(res.data));
          }).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/roles',})
              .then(res => {
                localStorage.setItem('activeRoles', JSON.stringify(res.data));
              }).catch(err => that.$message('查询失败' + err));
      request({method: 'get', url: '/workflow/model/acl',})
          .then(res => {
            localStorage.setItem('accesses', JSON.stringify(res.data));
          }).catch(err => that.$message('查询失败' + err));
    },
    methods: {
      handleEdit() {
        this.dialogTitle = '流程编辑器';
        this.activeData.bpmnXml = BpmnFunction.getBpmnTemplate();
        this.dialogComponent = 'activeti';
        this.dialogVisible = true;

      }, handleView() {
        this.dialogTitle = '流程可视化页面';
        this.activeData.bpmnXml = BpmnFunction.getBpmnTemplate();
        this.dialogComponent = 'viewer';
        this.dialogVisible = true;
      }, handleShow() {
        this.dialogTitle = '流程展示器';
        this.activeData.bpmnXml = BpmnFunction.getBpmnTemplate();
        this.dialogComponent = 'show';
        this.dialogVisible = true;
      }, handleDelete(record) {
        console.log('handleDelete', record);
      },
      handleDisplay() {
        this.$refs.modeler.saveBpmn();
      },
      handleOk() {
        this.dialogVisible = false;
        this.$refs.modeler.saveBpmn();
      },
      handleClose() {
        this.dialogVisible = false;
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
  }

  .ant-modal-header {
    padding: 10px 20px !important;
  }

  .ant-modal-body {
    padding: 0 10px !important;
  }

  .btn-border {
    margin-right: 10px;
  }


</style>
