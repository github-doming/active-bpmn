<template>
	<div class="context">
		<a-row class='box' type="flex" justify="space-between">
			<a-col :span="3" class='panel'>
				<table class="selected-table">
					<thead>
					<tr>
						<th>{{local.taskListener}}</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for='item in transform' :key='item.code' :class="item.code === activeCode?'selected':''"
							@click="transformSelect(item.code)">
						<td>{{item.name}}</td>
					</tr>
					</tbody>
				</table>
			</a-col>
			<a-col :span="20" class="panel">
				<table class="selected-table">
					<tr>
						<th>{{local.type}}</th>
						<th>{{local.value}}</th>
					</tr>
					<tbody>
					<tr v-for='(item) in listeners'>
						<td>{{item.name}}</td>
						<td>{{item.value}}</td>
					</tr>
					</tbody>
				</table>
			</a-col>
		</a-row>
	</div>
</template>

<script>
  export default {
    name: "TaskListener",
    props: {
      transform: {
        type: Set,
        default: () => ([])
      },
      taskListeners: {
        type: Array,
        default: () => ([])
      },
    },
    data() {
      return {
        local:JSON.parse(localStorage.getItem('activeLocal')), activeCode: '',
      }
    },
    computed: {
      listeners() {
        let listeners = [];
        let that = this;
        this.taskListeners.forEach(element => {
          if (element.event === that.activeCode) {
            if (element.hasOwnProperty('class')) {
              listeners.push({name: this.local.clazz, code: 'class', value: element.class})
            } else if (element.hasOwnProperty('field')) {
              listeners.push({name: this.local.field, code: 'field', value: element.field})
            }
          }
        });
        return listeners;
      },
    },
    methods: {
      transformSelect(itemCode) {
        if (itemCode === this.activeCode) {
          this.activeCode = '';
        } else {
          this.activeCode = itemCode;
        }
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
		min-width: 675px;
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
