<template>
  <div>
    <p class="textL">变量:</p>
    <div class="over-scoll">
      <div class="flex">
        <div class="flex-form">
          <table>
            <thead>
            <tr>
              <th>变量名称</th>
              <th>显示名称</th>
              <th>变量类型</th>
              <th>可见</th>
              <th>必需</th>
              <th>只读</th>
              <th>可重置</th>
              <th>默认值</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='item in fifthDates' :key='item.id' :class="item.id === activeId?'selected':''"
                @click="clickTr(item)">
              <td>{{item.variableName}}</td>
              <td>{{item.defaultShowName}}</td>
              <td>{{item.variableType}}</td>
              <td>{{item.wasVisible}}</td>
              <td>{{item.isNecessary}}</td>
              <td>{{item.isReadOnly}}</td>
              <td>{{item.isResettable}}</td>
              <td>{{item.defaultValue}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-btn">
          <a-button @click='addData'>创建</a-button>
          <a-button :disabled="activeId === ''" @click="updateVar">更新</a-button>
          <a-button :disabled="activeId === ''" @click="deleteVar">删除</a-button>
        </div>
      </div>
      <a-modal v-model="varVisible" title="创建变量" width="600px" :afterClose="variableModelClose">
        <a-form-model ref="ruleForm"
                      :model="newForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item ref="variableName" label="名称" prop="variableName">
            <a-col :span="11">
              <a-input v-model="newForm.variableName" @blur="() => {$refs.variableName.onFieldBlur();}"/>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-button type="primary" @click="defineLocalVariableShowName">
                定义"显示名称"
              </a-button>
            </a-col>
          </a-form-model-item>
          <a-form-model-item label="类型名称" prop="variableType">
            <a-select v-model="newForm.variableType"
                      placeholder="请选择类型名称"
                      :getPopupContainer="
					          triggerNode => {
					            return triggerNode.parentNode || document.body;
					          }">
              <a-select-option value="int">
                int
              </a-select-option>
              <a-select-option value="char">
                char
              </a-select-option>
              <a-select-option value="float">
                float
              </a-select-option>
              <a-select-option value="boolean">
                boolean
              </a-select-option>
              <a-select-option value="String">
                String
              </a-select-option>
              <a-select-option value="Date">
                Date
              </a-select-option>
              <a-select-option value="URl">
                URL
              </a-select-option>
              <a-select-option value="其它">
                其它
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="其它类名称" prop="otherName" v-show="newForm.variableType === '其它'">
            <a-input v-model="newForm.otherName"/>
          </a-form-model-item>
          <a-form-model-item label="权限">
            <a-checkbox v-model="newForm.wasVisible">可见</a-checkbox>
            <a-checkbox v-model="newForm.isNecessary">必需</a-checkbox>
            <a-checkbox v-model="newForm.isReadOnly">只读</a-checkbox>
            <a-checkbox v-model="newForm.isResettable">可重置</a-checkbox>
          </a-form-model-item>
          <a-form-model-item label="默认值" prop="defaultValue">
            <a-input v-model="newForm.defaultValue"/>
          </a-form-model-item>
          <a-form-model-item label="初始化自" v-show="globVariable.length !== 0" prop="initFormVarKey">
            <a-select placeholder="初始化来自的全局变量" @change="globChange" v-model="newForm.initFormVarKey"
                      :getPopupContainer="triggerNode =>triggerNode.parentNode || document.body">
              <a-select-option v-for="(value,index) in globVariable" :key="value.variableName" :value="value.variableName">
                {{value.variableName}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
        <span slot="footer" class="dialog-footer">
			    <a-button @click="handleClose">取 消</a-button>
			    <a-button type="primary" @click="handleOk">确 定</a-button>
			  </span>
      </a-modal>
      <a-modal v-model="showNameVisible" title="定义显示名称" width="300px">
        <a-form-model
          ref="ruleForm1"
          :model="newForm"
          :rules="rules"
          :label-col="labelCol1"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="默认显示" prop="defaultShowName">
            <a-input v-model="newForm.defaultShowName"/>
          </a-form-model-item>
          <a-form-model-item label="中文(简体)" prop="zh_ch">
            <a-input v-model="newForm.zh_ch"/>
          </a-form-model-item>
          <a-form-model-item label="英文(美式)" prop="en_us">
            <a-input v-model="newForm.en_us"/>
          </a-form-model-item>
        </a-form-model>
        <span slot="footer" class="dialog-footer">
			    <a-button @click="handleClose1">
			      	取 消
			    </a-button>
			    <a-button type="primary" @click="handleOk1">确 定</a-button>
			  </span>
      </a-modal>
    </div>

    <!--<div class='btn-list'>
      <a-button  type="primary" @click="writeBpmnFifth">确认</a-button>
      <a-button>取消</a-button>
      <a-button>帮助</a-button>
    </div>-->
  </div>
</template>

<script>

  export default {
    props: {
      fifthDates: Array,
      globVariable: {
        type: Array,
        default () {
          return []
        },
      },
    },
    inject: ['bpmnModeler'],
    data () {
      return {
        activeId: '',
        selectData: null,
        varVisible: false,
        showNameVisible: false,
        newForm: {
          variableName: ''
        },
        labelCol: {span: 4},
        labelCol1: {span: 8},
        wrapperCol: {span: 14},
        rules: {
          variableName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      addData () {
        this.activeId = ''
        this.newForm = {
          wasVisible: false,
          isNecessary: false,
          isReadOnly: false,
          isResettable: false
        }
        this.varVisible = true
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.resetFields()
        }
      },
      defineLocalVariableShowName () {
        this.showNameVisible = true
      },
      handleClose () {
        this.varVisible = false
      },
      handleOk () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.activeId) {
              //更新
              for (var i = 0; i < this.fifthDates.length; i++) {
                if (this.fifthDates[i].id === this.activeId) {
                  this.fifthDates[i] = this.newForm
                }
              }
            } else {
              //新增
              this.fifthDates.push(Object.assign(this.newForm, {id: 'BOM' + this.fifthDates.length + 1}))
            }
            this.activeId = ''
            this.varVisible = false
            this.clearNewForm()
          } else {
            return false
          }
        })
      },
      variableModelClose(){
        this.newForm = {};
      },
      clearNewForm () {
        this.newForm = {
          wasVisible: false,
          isNecessary: false,
          isReadOnly: false,
          isResettable: false
        }
      },
      handleClose1 () {
        this.showNameVisible = false
      },
      handleOk1 () {
        this.showNameVisible = false
      },
      clickTr (item) {
        if (item.id === this.activeId) {
          this.activeId = ''
          this.selectData = {}
        } else {
          this.activeId = item.id
          this.selectData = item
        }
      },
      updateVar () {
        this.varVisible = true
        this.newForm = this.selectData
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.resetFields()
        }
      },
      deleteVar () {
        let self = this
        this.$confirm({
          title: '确认提示',
          content: `是否确认删除？`,
          okText: '删除',
          cancelText: '取消',
          okType: 'danger',
          onOk () {
            // var index
            for (let i = 0; i < self.fifthDates.length; i++) {
              if (self.activeId === self.fifthDates[i].id) {
                self.fifthDates.splice(i, 1)
              }
            }
          }
        })
      },
      writeBpmnFifth () {
        console.log('确定写入变量《《《》》》')
        this.$emit('writeBpmnFifth',
          {
            'tab': 'Variable',
            'param': this.fifthDates
          })
      },
      globChange (variableName) {
        // let attr = this.globVariable[value]
        let attr =  this.globVariable.filter(item =>item.variableName === variableName)[0];
        console.log( attr);
        for (let key in attr) {
          if ('id' === key) {
            continue
          }
          this.$set(this.newForm, key, attr[key])
        }
      }
    },
    mounted () {
    },
  }
</script>

<style type="text/css">
  .ant-modal-wrap {
    z-index: 3000 !important;
  }
</style>
<style scoped>
  .over-scoll {
    width: 100%;
    /*height: 60vh;*/
    overflow: auto;
  }

  .textL {
    text-align: left;
    padding-left: 10px;
    margin-bottom: 5px;
  }

  .flex {
    display: flex;
    min-width: 850px;
    min-height: 100%;
    padding-right: 10px;
  }

  .flex-btn {
    width: 65px;
  }

  .flex-btn button {
    margin-bottom: 5px;
  }

  .btn-list {
    /*width: 60%;
    margin:0 auto;*/
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
  }

  .btn-list button {
    margin-right: 5px;
  }

  .flex-form {
    flex: 1;
    min-width: 750px;
    height: 100%;
    margin: 0 10px;
    background: #fff;
    border: 1px #ddd solid;
  }

  table {
    width: 100%;
  }

  table tbody tr {
    cursor: pointer;
  }

  table tbody tr.selected {
    background: #eee;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table th {
    border-top: none;
    background: #efefef;
  }

  table th:first-child, table tr td:first-child {
    border-left: none;
  }

  table th:last-child, table tr td:last-child {
    border-right: none;
  }
</style>
