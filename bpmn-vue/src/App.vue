<template>
  <div id="app">
    <h1>流程管理</h1>
    <el-button class="addBtn" icon="el-icon-plus" @click="addProcessModel">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        label="流程标识"
        prop="id"
        width="180">
      </el-table-column>
      <el-table-column
        label="流程名称"
        prop="name"
        width="180">
      </el-table-column>
      <el-table-column
        label="上次更新时间"
        prop="lastUpdateTime"
        width="180">
      </el-table-column>
      <el-table-column
        label="版本"
        prop="version"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-button
            size="mini"
            @click="handleDeploy(scope.$index, scope.row)">部署
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增模型"
      :visible.sync="modelVisible"
      width="50%"
      :before-close="handleModelClose">
      <el-form>
        <el-row :gutter="20">

          <el-col :span="6">
            <el-form-item label="标识">
              <el-input v-model="key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="描述">
              <el-input v-model="descp"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别">
              <el-input v-model="category"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleModelClose">取 消</el-button>
        <el-button type="primary" @click="handleModelOk">确 定</el-button>
      </span>
    </el-dialog>
    <ProcessDesign :dialogVisible="dialogVisible" :params="params"
                   v-on:handleVisiable="handleVisiable"></ProcessDesign>
    <ProcessView :dialogViewModelVisible="dialogViewModelVisible" :params="params"
                 v-on:handleViewModelVisiable="handleViewModelVisiable"></ProcessView>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import Antd from 'ant-design-vue'
  import 'element-ui/lib/theme-chalk/index.css'
  import 'ant-design-vue/dist/antd.css'
  import ProcessDesign from './edit-modeler/ProcessDesign'
  import ProcessView from './edit-modeler/ProcessView'
  import request from './util/request'

  Vue.use(ElementUI)
  Vue.use(Antd)
  export default {
    name: 'App',
    components: {
      ProcessDesign,
      ProcessView
    },
    data () {
      return {
        tableData: [
          {id: '11', name: 'test', lastUpdateTime: '2020-10-09', version: '1',}
        ],
        params: {
          row: ''
        },
        modelVisible: false,//false,
        dialogVisible: false,
        dialogViewModelVisible: false,
        key: '',
        name: '',
        category: '',
        descp: ''
      }
    },

    mounted () {
      const that = this
      request({
        method: 'get',
        url: '/workflow/model/list',
      })
        .then(function (res) {
          that.tableData = res.data
        })
        .catch(function (err) {
          that.$message('查询失败')
        })
    },

    methods: {
      addProcessModel () {
        this.modelVisible = true
      },
      handleModelClose () {
        this.modelVisible = false
      },
      handleModelOk () {
        const that = this
        that.modelVisible = false
        request({
          method: 'post',
          url: '/workflow/model/insert',
          data: {
            key: that.key,
            name: that.name,
            category: that.category,
            descp: that.descp
          }
        })
          .then(function (res) {
            that.key = ''
            that.name = ''
            that.category = ''
            that.descp = ''
            that.$message('新增成功')
          })
          .catch(function (err) {
            that.$message('新增失败')
          })
      },
      async handleEdit (index, row) {
        const that = this
        that.params.row = row;
        console.log("row"+row);
        //到后台请求xml文件
        await request({
          url: `/workflow/model/${row.id}/xml`
        })
          .then(function (res) {
            that.params.bpmnXml = res.data.bpmnXml
            console.log(that.params.bpmnXml);
          })
          .catch(function (err) {
            console.log('获取反显流程xml失败')
            // 为了不启动后台，这里提供测试数据
            that.params.bpmnXml = '<?xml version="1.0" encoding="UTF-8"?>' +
              '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://activiti.org/bpmn">' +
              '<bpmn2:process id="Process_1" isExecutable="true">' +
              '</bpmn2:process>' +
              '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
              '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
              '</bpmndi:BPMNPlane>' +
              '</bpmndi:BPMNDiagram>' +
              '</bpmn2:definitions>'
          })
        // 注意放的位置，避免异步请求导致实际设计器中没有bpmnXml值
        that.dialogVisible = true
      },
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
      handleDelete (index, row) {
        const that = this
        request({
          url: '/workflow/deleteModel',
          method: 'get',
          params: {
            modelId: row.id
          }
        })
          .then(function (res) {
            that.$message('删除成功')
          })
          .catch(function (err) {
            that.$message('删除失败')
          })
      },

      handleDeploy (index, row) {
        const that = this
        request({
          url: '/workflow/model/deploy',
          method: 'get',
          params: {
            modelId: row.id
          }
        })
          .then(function (res) {

            if (res.data === 'success') {
              that.$message('部署成功')
            } else {
              that.$message(res.data)
            }

          })
          .catch(function (err) {
            that.$message('部署失败')
          })
      },

      handleVisiable (visiable) {
        this.dialogVisible = visiable
      },
      handleViewModelVisiable (visiable) {
        this.dialogViewModelVisible = visiable
      }
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

  .addBtn {
    display: flex;
    text-align: left;
    margin-left: 50px;
  }
</style>
