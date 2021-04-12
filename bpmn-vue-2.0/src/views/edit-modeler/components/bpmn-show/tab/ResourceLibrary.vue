<template>
	<div class="rl-context">
		<a-row class='rl-box' type="flex" justify="space-between">
			<a-col :span="9" class='rl-panel'>
				<table>
					<thead>
					<tr>
						<th>{{local.role}}</th>
					</tr>
					</thead>
					<tbody>

					<tr v-for="item in roleSets" :key='item.id' :class="item.id === roleId ? 'selected':''"
							@click="clickRoleSet(item)">
						<td>{{item.name}}</td>
					</tr>
					</tbody>
				</table>
			</a-col>
			<a-col :span="13" class='rl-panel'>
				<table>
					<tr>
						<th>{{local.resourcePool}}</th>
						<th>{{local.type}}</th>
					</tr>
					<tr v-for='item in activeRole.repositories' :key='item.id'>
						<td>{{item.name}}</td>
						<td>{{item.type}}</td>
					</tr>
				</table>
			</a-col>
		</a-row>
	</div>
</template>

<script>
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
        this.roleId = undefined;
      },
      roleId(newValue) {
        if (newValue) {
          this.activeRole = this.roleSets.filter(item => item.id === newValue)[0];
        } else {
          this.activeRole = {repositories: []};
        }

      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        roleId: undefined,
        activeRole: {repositories: []},
      }
    },
    methods: {
      clickRoleSet(item) {
        if (this.roleId === item.id) {
          this.roleId = undefined;
        } else {
          this.roleId = item.id;
        }
      },
    },
  }
</script>

<style scoped>
	.rl-context {
		overflow: auto;
		height: 64vh
	}

	.rl-box {
		height: 100%;
		min-width: 400px;
	}

	.rl-panel {
		background: #fff;
		border: 1px #ddd solid;
		min-height: 100%;
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

	tbody tr.selected {
		background: #eeeeee;
	}

</style>
