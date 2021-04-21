<template>
  <div class="context">
    <a-row class='box' type="flex" justify="space-between">
      <a-col :span="6" class='panel'>
        <table class="selected-table">
          <thead>
          <tr>
            <th>{{local.taskListener}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='item in transform' :key='item.code' :class="item.code === activeCode?'selected':''"
              @click="transformSelect(item)">
            <td>{{item.name}}</td>
          </tr>
          </tbody>

        </table>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" :disabled="activeCode === ''" @click='addData'>{{local.create}}</a-button>
        <a-button :disabled="listenerId === ''" @click="updateData">{{local.update}}</a-button>
        <a-button type="danger" :disabled="listenerId === ''" @click="deleteData">{{local.delete}}</a-button>
      </a-col>
      <a-col :span="14" class="panel">
        <table class="selected-table">
          <tr>
            <th>{{local.type}}</th>
            <th>{{local.value}}</th>
          </tr>
          <tbody>
          <tr v-for='(item) in listeners' :key='listenerKey(item)'
              :class="listenerKey(item)=== listenerId?'selected':''"
              @click="listenerSelect(listenerKey(item))">
            <td>{{item.name}}</td>
            <td>{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </a-col>
    </a-row>
    <a-modal v-model="listenerVisible" :title="local.listener" width="600px" :ok-text="local.ok"
             :cancel-text="local.cancel"
             :centered="true" :maskClosable="false" @ok="listenerOk" @cancel="listenerClose">
      <a-form-model ref="listenerForm" :label-col="{ span:6 }" :wrapper-col="{ span: 14 }" :model="listenerItem"
                    :rules="listenerRules">
        <a-form-model-item :label="local.type">
          <a-select v-model="listenerItem.typeKey" :placeholder="local.selectListenerType">
            <a-select-option value="class">{{local.clazz}}</a-select-option>
            <a-select-option value="field">{{local.field}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :label="typeLabel" ref="value" prop="value">
          <a-input v-model="listenerItem.value" @blur="() => {$refs.value.onFieldBlur();}"
                   :placeholder="local.enterListenerValue"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "TaskListener",
    props: {
      transform: {
        type: Array,
        default: () => ([])
      },
      taskListeners: {
        type: Array,
        default: () => ([])
      },
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, activeCode: '', activeName: '', listenerId: '', listenerVisible: false, listenerItem: {},
        listenerRules: {
          value: [
            {required: true, message: local.enterListenerValue, trigger: 'blur'}
          ],
        }

      }
    },
    computed: {
      typeLabel() {
        return this.listenerItem.typeKey === 'class' ? this.local.clazz : this.local.field;
      },
      listeners() {
        let listeners = [];
        let that = this;
        this.taskListeners.forEach(element => {
          if (element.event === that.activeCode) {
            if (element.hasOwnProperty('class')) {
              listeners.push({name: '类', code: 'class', value: element.class})
            } else if (element.hasOwnProperty('field')) {
              listeners.push({name: '字段', code: 'field', value: element.field})
            }
          }
        });
        return listeners;
      },
    },
    watch: {
      transform() {
        this.activeCode = '';
        this.activeName = '';
        this.clearData();
      }
    },
    methods: {
      transformSelect(item) {
        this.listenerId = '';
        if (item.code === this.activeCode) {
          this.activeCode = '';
          this.activeName = '';
        } else {
          this.activeCode = item.code;
          this.activeName = item.name;
        }
      },
      listenerSelect(itemId) {
        if (itemId === this.listenerId) {
          this.listenerId = '';
        } else {
          this.listenerId = itemId;
        }
      },
      listenerKey(item) {
        return item.code + '~' + item.value
      },

      addData() {
        this.listenerItem = {
          typeKey: "class",
          value: '',
        };
        this.listenerVisible = true;
      },
      updateData() {
        let keys = this.listenerId.split('~');
        this.listenerItem = {
          typeKey: keys[0],
          value: keys[1],
        };

        this.listenerVisible = true;
      },
      deleteData() {
        if (this.listenerId) {
          let keys = this.listenerId.split('~');
          this.$emit('updateTaskListener', 'remove', {event: this.activeCode, typeKey: keys[0], value: keys[1]});
        }
      },
      listenerOk() {
        let that = this;
        this.$refs.listenerForm.validate(valid => {
          if (valid && that.activeCode) {
            for (let i = 0; i < that.listeners.length; i++) {
              if (that.listeners[i].code === that.listenerItem.typeKey && that.listeners[i].value === that.listenerItem.value) {
                that.clearData();
                return false;
              }
            }
            let newVariable = null;
            if (that.listenerItem.typeKey === 'class') {
              newVariable = {event: that.activeCode, class: that.listenerItem.value, name: that.activeName};
            } else if (that.listenerItem.typeKey === 'field') {
              newVariable = {event: that.activeCode, field: that.listenerItem.value};
            }
            that.$emit('updateTaskListener', 'add', newVariable);
            if (that.listenerId) {
              let keys = that.listenerId.split('~');
              that.$emit('updateTaskListener', 'remove', {event: that.activeCode, typeKey: keys[0], value: keys[1]});
            }
            that.clearData();
          } else {
            return false
          }
        });
      },
      listenerClose() {
        this.clearData;
      },
      clearData() {
        this.listenerId = '';
        this.listenerItem = {};
        this.listenerVisible = false;
      },
    }

  }
</script>

<style scoped>
  .context {
    width: 100%;
    height: 64vh;
    overflow-x: auto;
  }

  .box {
    height: 100%;
    min-width: 500px;
  }

  .panel {
    background: #fff;
    height: 100%;
    border: 1px #ddd solid;
  }

  .selected-table tbody tr {
    cursor: pointer;
  }

  .selected-table tbody tr.selected {
    background: #eeeeee;
  }

  .panel-table {
    height: calc(100% - 128px);
    border: 1px #ddd solid;
  }

  table {
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
  }

  table th:first-child, table tr td:first-child {
    border-left: none;
  }

  table th:last-child, table tr td:last-child {
    border-right: none;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table th {
    background: #efefef;
    border-top: none;
  }

  button {
    margin-bottom: 5px;
  }

</style>
