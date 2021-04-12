<template>
	<div class="role-context">
		<a-row class='role-box' type="flex" justify="space-between">
			<a-col :span="3" class='role-panel'>
				<table class="role-table">
					<thead>
					<tr>
						<th>{{local.workPrincipal}}</th>
					</tr>
					</thead>
					<tbody>
					<tr :class="param.id === activeId ? 'selected':''">
						<td>{{param.name}}</td>
					</tr>
					</tbody>

				</table>
			</a-col>
			<a-col :span="13" class='role-panel'>
				<table class="role-table">
					<tr>
						<th>{{local.roleDefined}}</th>
						<th>{{local.view}}</th>
						<th>{{local.add}}</th>
						<th>{{local.remove}}</th>
					</tr>
					<tbody>
					<tr v-for="item in roleSetInfos" :key='item.id' :class="item.id === activeId ? 'selected':''"
							@click="clickRoleSet(item)">
						<td>{{item.name}}</td>
						<td>
							<a-checkbox v-model="item.view">{{local.view}}</a-checkbox>
						</td>
						<td>
							<a-checkbox v-model="item.add">{{local.add}}</a-checkbox>
						</td>
						<td>
							<a-checkbox v-model="item.remove">{{local.remove}}</a-checkbox>
						</td>
					</tr>
					</tbody>
				</table>
			</a-col>
			<a-col :span="7" class='role-panel'>
				<table>
					<tr>
						<th>{{local.resourceLibrary}}</th>
						<th>{{local.type}}</th>
					</tr>
					<tr v-for="item in selectData.repositories" :key="item.id">
						<td>{{item.name}}</td>
						<td>{{item.type}}</td>
					</tr>
					<tbody>
					</tbody>
				</table>
			</a-col>
		</a-row>
	</div>

</template>

<script>
  const defaultData = {repository: []};
  export default {
    name: "RoleSet",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
      roleSetInfos: {
        type: Array,
        default: () => ([])
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        activeId: '', selectData: defaultData,
      }
    },
    methods: {
      clickRoleSet(item) {
        if (item.id === this.activeId) {
          this.activeId = '';
          this.selectData = defaultData;
        } else {
          this.activeId = item.id;
          this.selectData = item;
        }

      },
    }

  }
</script>

<style scoped>
	.role-context {
		width: 100%;
		height: 64vh;
		overflow-x: auto;
	}

	.role-box {
		height: 100%;
		min-width: 810px;
	}

	.role-panel {
		background: #fff;
		border: 1px #ddd solid;
		min-height: 100%;
	}

	.role-table tbody tr {
		cursor: pointer;
	}

	.role-table tbody tr.selected {
		background: #eeeeee;
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


</style>
