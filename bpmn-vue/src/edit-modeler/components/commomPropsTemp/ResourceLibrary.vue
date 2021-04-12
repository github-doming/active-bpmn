<template>
  <div>
    <div class="rl-context">
      <div class='rl-context-box'>
        <div class='rl-table-left'>
          <a-form class="rl-select-from">
            <a-form-item label="角色">
              <a-select :getPopupContainer="triggerNode => triggerNode.parentNode || document.body"
                        @change="roleChange" placeholder="请先选择角色">
                <a-select-option v-for="(item,index) in roleDefined" :key="index"> {{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="池">
              <a-button @click="rlPoolKey='group'" :disabled="selectRole">
                组
              </a-button>
              <a-button @click="rlPoolKey='context'" :disabled="selectRole">
                上下文团队
              </a-button>
              <a-button @click="rlPoolKey='system'" :disabled="selectRole">
                系统用户
              </a-button>
            </a-form-item>

          </a-form>
        </div>
        <div class="rl-table-middle">
          <div v-show="rlPoolKey=== 'group'" class="rl-table-middle">
            <div class="role-search-from">
              <div class="role-search-item">
                <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                  <a-form-item label="组名称">
                    <a-input v-model="teamFrom.name"/>
                  </a-form-item>
                </a-form>
              </div>
              <a-button type="primary" class='role-search-btn' @click="findGroup()" :disabled="selectRole">查找</a-button>
            </div>
            <div class="group-table rl-table">
              <table>
                <tr>
                  <th>组名称</th>
                </tr>
                <tr v-for='(item,index) in leftData' :key='index' @click='add2Cache("group",index,item)'
                    :class='item.hover?"hover":""'>
                  <td>{{item.name}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div v-show="rlPoolKey=== 'context'" class="context-table rl-table">
            <table>
              <tr>
                <th>上下文团队</th>
              </tr>
              <tr v-for='(item,index) in leftData' :key='index' :class='item.hover?"hover":""'
                  @click='add2Cache("context",index,item)'>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
          <div v-show="rlPoolKey=== 'system'" class="context-table rl-table">
            <table>
              <tr>
                <th>系统用户</th>
              </tr>
              <tr v-for='(item,index) in leftData' :key='index' :class='item.hover?"hover":""'
                  @click='add2Cache("system",index,item)'>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="rl-shuttle-btn">
          <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon type="double-right"/></span>
          <span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon type="double-left"/></span>
        </div>
        <div class="rl-table-right">
          <table>
            <tr>
              <th>资源池</th>
              <th>类型</th>
            </tr>
            <tr v-for='(item,index) in activeRole.repository' :key='item.id' @click='add2Cache("resource",index,item)'
                :class='item.hover?"hover":""'>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const contextTeam = [{name: 'Container Team', type: 'context', id: 'context_id'}]
  const systemTeam = [{name: 'System Team', type: 'system', id: 'system_id'}]
  let leftDataCache = [], rightDataCache = []
  export default {
    name: 'ResourceLibrary',
    props: {
      roleDefined: Array,
      groupList: Array,
    },
    data () {
      return {
        rlPoolKey: 'group',
        activeRole: {repository: []},
        teamFrom: {
          name: '', // 组名
          properties: 'name',
          beanName: 'piGroup',
          pageNo: 1,
          pageSize: 10000,
          total: 10000
        },
        leftIconStats: false,
        rightIconStats: false,
        contextData: contextTeam,
        systemData: systemTeam,
        groupData: this.groupList,
      }
    },
    created () {
      this.clearCache()
    },
    computed: {
      selectRole () {
        return Object.keys(this.activeRole).length === 1
      },
      leftData () {
        return this.rlPoolKey === 'group' ? this.groupData : this.rlPoolKey === 'context' ? this.contextData : this.systemData
      }
    },

    watch: {
      groupList (newValue) {
        let that = this
        this.clearCache()
        this.groupData = newValue.filter(item => {
          let flag = true
          for (let i = 0; i < that.activeRole.repository.length; i++) {
            if (that.activeRole.repository[i].id === item.id) {
              flag = false
              break
            }
          }
          return flag
        })
      },
      rlPoolKey () {
        this.clearCache()
      }
    },
    methods: {
      clearCache () {
        leftDataCache = []
        rightDataCache = []
        this.leftData.forEach(item => item.hover = false)
        this.activeRole.repository.forEach(item => item.hover = false)
      },
      roleChange (value) {
        this.clearCache()
        let that = this
        this.groupData = []
        this.activeRole = this.roleDefined[value]
        this.contextData = contextTeam.filter(item => {
          item.hover = false
          let flag = true
          for (let i = 0; i < that.activeRole.repository.length; i++) {
            if (that.activeRole.repository[i].id === item.id) {
              flag = false
              break
            }
          }
          return flag
        })
        this.systemData = systemTeam.filter(item => {
          item.hover = false
          let flag = true
          for (let i = 0; i < that.activeRole.repository.length; i++) {
            if (that.activeRole.repository[i].id === item.id) {
              flag = false
              break
            }
          }
          return flag
        })
      },
      findGroup () {
        this.$emit('findGroup', this.teamFrom)
      },
      add2Cache (type, index, item) {
        let key
        let cacheData = type === 'resource' ? rightDataCache : leftDataCache
        let operateData = type === 'resource' ? this.activeRole.repository : this.leftData
        //寻找是否已存在缓存中
        let result = cacheData.some((data, i) => {
          if (item.id === data.id) {
            key = i
            return true
          }
        })
        if (result) {
          Object.assign(item, {'hover': false})
          operateData[index] = item
          cacheData.splice(key, 1)
        } else {
          let itemCopy = {...item}
          Object.assign(item, {'hover': true})
          operateData[index] = item
          Object.assign(itemCopy, {'hover': false})
          cacheData.push(itemCopy)
        }
        if (type === 'resource') {
          this.leftIconStats = rightDataCache.length > 0
          this.$delete(this.activeRole, 'repository')
          this.$set(this.activeRole, 'repository', operateData)
        } else {
          this.rightIconStats = leftDataCache.length > 0
          if (this.rlPoolKey === 'group') {
            this.groupData = []
            this.groupData = operateData
          } else if (this.rlPoolKey === 'context') {
            this.contextData = []
            this.contextData = operateData
          } else {
            this.systemData = []
            this.systemData = operateData
          }
        }
      },
      add2Data (type) {
        let add2Data = type === 'right' ? this.activeRole.repository : this.leftData
        let remove4Data = type === 'right' ? this.leftData : this.activeRole.repository
        const stats = type === 'right' ? this.rightIconStats : this.leftIconStats
        if (!stats) {
          return
        }
        let that = this;
        let cacheData = type === 'right' ? leftDataCache : rightDataCache
        add2Data = add2Data.concat(cacheData)
        //找到没有在缓存中的数据
        remove4Data = remove4Data.filter(item => {
          let stats = true
          for (let i = 0; i < cacheData.length; i++) {
            if (cacheData[i].id === item.id) {
              stats = false
              break
            }
          }
          return stats
        })
        if (type === 'right') {
          if (this.rlPoolKey === 'group') {
            that.groupData = []
            that.groupData = remove4Data
          }else if (this.rlPoolKey === 'context') {
            that.contextData = []
            that.contextData = remove4Data
          } else {
            that.systemData = []
            that.systemData = remove4Data
          }
          this.activeRole.repository = add2Data
          leftDataCache = []
          this.rightIconStats = false
        } else {
          add2Data.forEach(item => {
            if (item.type === 'group') {
              that.groupData.push(item)
            } else if (item.type === 'context') {
              that.contextData.push(item)
            }else {
              that.systemData.push(item)
            }
          })
          this.activeRole.repository = remove4Data
          rightDataCache = []
          this.leftIconStats = false
        }
      },
      writeBpmn () {
        let resultObj = {
          'tab': 'RoleSet',
          'param': []
        }
        for (let i = 0; i < this.roleDefined.length; i++) {
          let repositoryStr = ''

          this.roleDefined[i].repository.forEach(item => {
            repositoryStr += item.name + ','
            repositoryStr += item.type + ','
            repositoryStr += item.id + ';'
          })
          let roleCopy = {...this.roleDefined[i]}
          Object.assign(roleCopy, {'repository': repositoryStr})
          resultObj.param[i] = roleCopy;
        }
        console.log(resultObj);
        this.$emit('writeBpmn', resultObj);
      },
    }
  }
</script>

<style scoped>
  .rl-context {
    /*width: 95%;*/
    width: 100%;
    /* height: 60vh;*/
    overflow: auto;
    padding: 0 2.5%;
  }

  .rl-context-box {
    width: 100%;
    min-width: 900px;
    display: flex;
  }

  .rl-table-left {
    width: 150px;
  }

  .rl-select-from {
    width: 140px;
  }

  .rl-table-middle {
    width: 250px;
  }

  .role-search-from {
    display: flex;
    width: 250px;
  }

  .role-search-btn {
    margin-top: 3px;
  }

  .rl-table {
    border: 1px #ddd solid;
    overflow: auto;
    background: #fff;
  }

  .context-table {
    height: 490px;
  }

  .group-table {
    height: 426px;
  }

  table {
    width: 100%;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table td {
    border: none;
    border-bottom: 1px #ddd solid;
  }

  table tr:hover {
    background: #f8f8f8;
  }

  table th {
    border-top: none;
    background: #e9e9e9;
  }

  table th:first-child {
    border-left: none;
  }

  table th:last-child {
    border-right: none;
  }

  table tr.hover {
    background: #eeeeee;
  }

  .rl-shuttle-btn {
    padding: 160px 10px 0 10px;
  }

  .rl-shuttle-btn span {
    display: block;
    width: 40px;
    height: 40px;
    background: #fff;
    border: 1px #ddd solid;
    border-radius: 5px;
    margin-bottom: 10px;
    line-height: 40px;
    text-align: center;
  }

  .rl-shuttle-btn span.hover {
    background: #1890ff;
    color: #fff;
  }

  .rl-table-right {
    flex: 1;
    overflow: auto;
    height: 490px;
    border: 1px #ddd solid;
    background: #fff;
    margin-right: 1px;
  }
</style>
