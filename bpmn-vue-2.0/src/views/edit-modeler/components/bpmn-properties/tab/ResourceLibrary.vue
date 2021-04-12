<template>
	<div style="overflow: auto;height: 64vh">
		<div class="rl-context">
			<div class='rl-table-left'>
				<a-form class="rl-select-from">
					<a-form-item :label="local.role">
						<a-select :placeholder="local.selectRole" :allowClear="true" v-model="roleKey">
							<a-select-option v-for="(item,index) in roleSets" :key="index"> {{item.name}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label="local.pool">
						<a-button @click="rlPoolKey='group'" :disabled="selectRole">
							{{local.group}}
						</a-button>
						<a-button @click="rlPoolKey='context'" :disabled="selectRole">
							{{local.context}}
						</a-button>
						<a-button @click="rlPoolKey='system'" :disabled="selectRole">
							{{local.system}}
						</a-button>
					</a-form-item>

				</a-form>
			</div>
			<div class="rl-table-middle">
				<div v-show="rlPoolKey=== 'group'" class="rl-table-middle context-table">
					<div class="role-search-from">
						<div class="role-search-item">
							<a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
								<a-form-item :label="local.groupName">
									<a-input v-model="groupFrom.name"/>
								</a-form-item>
							</a-form>
						</div>
						<a-button type="primary" class='role-search-btn' @click="findGroup()" :disabled="selectRole">
							{{local.find}}
						</a-button>
					</div>
					<div class="group-table rl-table">
						<table>
							<tr>
								<th>{{local.groupName}}</th>
							</tr>
							<tr v-for='(item,index) in leftData' :key='index' :class='item.hover?"hover":""'
									@click='add2Cache("group",index,item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div v-show="rlPoolKey=== 'context'" class="context-table rl-table">
					<table>
						<tr>
							<th>{{local.context}}</th>
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
							<th>{{local.system}}</th>
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
						<th>{{local.resourcePool}}</th>
						<th>{{local.type}}</th>
					</tr>
					<tr v-for='(item,index) in activeRole.repositories' :key='item.id' :class='item.hover?"hover":""'
							@click='add2Cache("resource",index,item)'>
						<td>{{item.name}}</td>
						<td>{{item.type}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
  import {Http} from "../../../js/new/BpmnHelper";

  const contextTeam = [{name: 'Container Team', type: 'context', id: 'context_id'}];
  const systemTeam = [{name: 'System Team', type: 'system', id: 'system_id'}];
  let leftDataCache = [], rightDataCache = [];
  export default {
    name: "ResourceLibrary",
    props: {
      roleSets: {
        type: Array,
        default: () => ([])
      },
    },
    watch: {
      roleSets() {
        this.roleKey = undefined;
        this.clearData();
      },
      roleKey(newValue) {
        if (newValue || newValue === 0) {
          this.activeRole = this.roleSets[newValue];
        } else {
          this.activeRole = {repositories: []};
        }
        this.contextData = this.initData4RoleChange(contextTeam);
        this.systemData = this.initData4RoleChange(systemTeam);
        this.clearData();

      }
    },
    computed: {
      selectRole() {
        return Object.keys(this.activeRole).length === 1
      },
      leftData() {
        return this.rlPoolKey === 'group' ? this.groupData : this.rlPoolKey === 'context' ? this.contextData : this.systemData
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        rlPoolKey: 'group', roleKey: undefined,
        activeRole: {repositories: []}, groupData: [],
        leftIconStats: false, rightIconStats: false,
        contextData: contextTeam, systemData: systemTeam,
        groupFrom: {name: '', properties: "name", beanName: "piGroup", pageNo: 1, pageSize: 1000,},
      }
    },

    methods: {
      findGroup() {
        const that = this;
        Http.getParticipant('groups', that.groupFrom).then(result => {
          that.groupData = result.filter(item => {
            let flag = true;
            that.activeRole.repositories.forEach(data => {
              if (data.id === item.id) {
                flag = false;
              }
            });
            return flag;
          });
        });
      },
      add2Cache(type, index, item) {
        let key;
        let cacheData = type === 'resource' ? rightDataCache : leftDataCache;
        let operateData = type === 'resource' ? this.activeRole.repositories : this.leftData;
        //寻找是否已存在缓存中
        let result = cacheData.some((data, i) => {
          if (item.id === data.id) {
            key = i;
            return true
          }
        });
        if (result) {
          this.$set(item, 'hover', false);
          operateData[index] = item;
          cacheData.splice(key, 1)
        } else {
          this.$set(item, 'hover', true);
          let itemCopy = {...item};
          itemCopy.hover = false;
          cacheData.push(itemCopy)
        }
        if (type === 'resource') {
          this.leftIconStats = rightDataCache.length > 0;
        } else {
          this.rightIconStats = leftDataCache.length > 0;
          if (this.rlPoolKey === 'group') {
            this.groupData = operateData
          } else if (this.rlPoolKey === 'context') {
            this.contextData = operateData
          } else {
            this.systemData = operateData
          }
        }
      },
      add2Data(type) {
        let add2Data = type === 'right' ? this.activeRole.repositories : this.leftData;
        let remove4Data = type === 'right' ? this.leftData : this.activeRole.repositories;
        const stats = type === 'right' ? this.rightIconStats : this.leftIconStats;
        if (!stats) {
          return
        }
        let that = this;
        let cacheData = type === 'right' ? leftDataCache : rightDataCache;
        add2Data = add2Data.concat(cacheData);
        //找到没有在缓存中的数据
        remove4Data = remove4Data.filter(item => {
          let stats = true;
          for (let i = 0; i < cacheData.length; i++) {
            if (cacheData[i].id === item.id) {
              stats = false;
              break
            }
          }
          return stats
        });
        if (type === 'right') {
          if (this.rlPoolKey === 'group') {
            that.groupData = [];
            that.groupData = remove4Data
          } else if (this.rlPoolKey === 'context') {
            that.contextData = [];
            that.contextData = remove4Data
          } else {
            that.systemData = [];
            that.systemData = remove4Data
          }
          this.optionRepository(cacheData, 'add');
          leftDataCache = [];
          this.rightIconStats = false
        } else {
          add2Data.forEach(item => {
            if (item.type === 'group') {
              that.groupData.push(item)
            } else if (item.type === 'context') {
              that.contextData.push(item)
            } else {
              that.systemData.push(item)
            }
          });
          this.optionRepository(cacheData, 'remove');
          rightDataCache = [];
          this.leftIconStats = false
        }
      },
      initData4RoleChange(dataList) {
        let that = this;
        return dataList.filter(item => {
          item.hover = false;
          let flag = true;
          for (let i = 0; i < that.activeRole.repositories.length; i++) {
            if (that.activeRole.repositories[i].id === item.id) {
              flag = false;
              break;
            }
          }
          return flag;
        });
      },
      optionRepository(repositoryData, type) {
        let optionData = this.activeRole.repositories;
        if ('remove' === type) {
          repositoryData.forEach(item => {
            optionData.some((data, index) => {
              if (item.id === data.id) {
                optionData.splice(index, 1);
              }
            });
          });
        } else {
          this.$emit('updateRepository', this.activeRole, repositoryData);
        }
      },
      clearData() {
        this.activeRole.repositories.forEach(item => item.hover = false);
        this.groupData = [];
        leftDataCache = [];
        rightDataCache = [];
      },

    },
  }
</script>

<style scoped>
	.rl-context {
		width: 100%;
		overflow: auto;
		padding: 0 2.5%;
		min-width: 700px;
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
		height: 100%;
	}

	.group-table {
		height: calc(100% - 64px);
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
		border: 1px #ddd solid;
		background: #fff;
		margin-right: 1px;
	}

</style>
