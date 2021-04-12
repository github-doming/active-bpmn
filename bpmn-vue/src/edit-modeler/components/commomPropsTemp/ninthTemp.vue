<template>
  <div>
    <div class="w100">
      <a-row class='table-box' type="flex" justify="space-between">
        <a-col :span="6" class='bgfff'>
          <table class="roleTable">
            <thead>
            <tr>
              <th>工作负责人</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in leftTable" :key="item.index" :class="item.id === activeId ? 'selected':''">
              <td>{{item.name}}</td>
            </tr>
            </tbody>

          </table>
        </a-col>
        <a-col :span="10" class='bgfff'>
          <table class="roleTable">
            <tr>
              <th>已定义角色</th>
              <th>查看</th>
              <th>添加</th>
              <th>移除</th>
            </tr>
            <tbody>
            <tr v-for="item in middleTable" :key="item.index" :class="item.id === activeId ? 'selected':''"
                @click="clickTr(item)" @change="addChangeDate(item)">
              <td>{{item.name}}</td>
              <td>
                <a-checkbox v-model="item.view">查看</a-checkbox>
              </td>
              <td>
                <a-checkbox v-model="item.add">添加</a-checkbox>
              </td>
              <td>
                <a-checkbox v-model="item.remove">移除</a-checkbox>
              </td>
            </tr>
            </tbody>
          </table>
        </a-col>
        <a-col :span="7" class='bgfff'>
          <table>
            <tr>
              <th>资源库</th>
              <th>类型</th>
            </tr>
            <tr v-for="repository in selectData[0].repository" :key="repository.id">
              <td>{{repository.name}}</td>
              <td>{{repository.type}}</td>
            </tr>

          </table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  const defaultData = [{repository: []}];
  export default {
    props: ['middleTable', 'leftTable'],
    data () {
      return {
        activeId: '',
        checked: true,
        checkData: {},
        selectData: defaultData,
        changeDate: [], // 变化的数据，最后要清空
      }
    },
    methods: {
      addChangeDate (param) {
        // 初始
        for (let i = 0, len = this.middleTable.length; i < len; i++) {
          if (this.middleTable[i].name === param.name) {
            this.middleTable[i] = param
          }
        }
      },
      clickTr (item) {
        if (item.id === this.activeId) {
          this.activeId = ''
          this.selectData = defaultData;
        } else {
          this.activeId = item.id
          this.selectData = []
          this.selectData.push(item)
        }
      },
      writeBpmnNinth () {
        // 处理数据，将this.changeDate中空对象去掉
        var arr = {
          'tab': 'RoleSet',
          'param': []
        }
        this.middleTable.forEach(each => {
          if (each.view || each.remove || each.add) {
            let obj = {}
            obj.name = each.name
            obj.view = each.view
            obj.remove = each.remove
            obj.add = each.add
            obj.sourceRef = each.sourceRef
            arr.param.push(obj)
          }
        })
        this.$emit('writeBpmnNinth', arr)
      }
    }
  }
</script>
<style scoped>
  .w100 {
    width: 100%;
    height: 64vh;
    overflow-x: auto;
    padding: 0 2.5%;
  }

  .table-box {
    min-width: 810px;
    min-height: 80%;
  }

  table {
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
  }

  .btn-list {
    /*width: 60%;
    margin:0 auto;*/
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    padding-right: 2.5%;
  }

  .btn-list button {
    margin-right: 5px;
  }

  .btn-list button:last-child {
    margin-right: 0px;
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

  .bgfff {
    background: #fff;
    border: 1px #ddd solid;
    min-height: 100%;
  }

  .roleTable tbody tr {
    cursor: pointer;
  }

  .roleTable tbody tr.selected {
    background: #eeeeee;
  }
</style>
