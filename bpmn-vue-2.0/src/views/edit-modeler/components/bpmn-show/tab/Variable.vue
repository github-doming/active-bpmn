<template>
	<div class="over-scroll">
		<div class="flex">
			<div class="flex-table">
				<table>
					<thead>
					<tr>
						<th>{{local.variableName}}</th>
						<th>{{local.displayName}}</th>
						<th>{{local.variableType}}</th>
						<th>{{local.visible}}</th>
						<th>{{local.necessary}}</th>
						<th>{{local.readOnly}}</th>
						<th>{{local.reset}}</th>
						<th>{{local.defaultValue}}</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for='item in variables' :key='item.id' :class="item.id === activeId?'selected':''"
							@click="variableSelect(item.id)">
						<td>{{item.name}}</td>
						<td>{{item.defaultDisplay}}</td>
						<td>{{item.type}}</td>
						<td>{{item.isVisible}}</td>
						<td>{{item.isNecessary}}</td>
						<td>{{item.isReadOnly}}</td>
						<td>{{item.isReset}}</td>
						<td>{{item.defaultValue}}</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="flex-btn">
				<a-button :disabled="activeId === ''" @click="showData">{{local.view}}</a-button>
			</div>
		</div>
		<a-modal v-model="variableVisible" :title="local.create" width="600px" :centered="true" :maskClosable="false">
			<template slot="footer">
				<a-button type="primary" @click="variableOk"> {{local.ok}}</a-button>
			</template>
			<a-form-model ref="variableForm" :model="activeItem" :label-col="{span: 4}" :wrapper-col="{span: 14}">
				<a-form-model-item :label="local.name" ref="name" prop="name">
					<a-col :span="11">
						<a-input v-model="activeItem.name" read-only/>
					</a-col>
					<a-col :span="11" :offset="2">
						<a-button type="primary" @click="showNameVisible = true"> {{local.defineDisplayName}}</a-button>
					</a-col>
				</a-form-model-item>
				<a-form-model-item :label="local.variableType" prop="type">
					<a-select v-model="activeItem.type" :open="false">
						<a-select-option v-for='item in type' :key='item'>{{item}}</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item :label="local.otherClassName" v-show="activeItem.type === 'Other...'">
					<a-input v-model="activeItem.otherName" read-only/>
				</a-form-model-item>
				<a-form-model-item :label="local.authority">
					<a-checkbox :checked="activeItem.isVisible">{{local.visible}}</a-checkbox>
					<a-checkbox :checked="activeItem.isNecessary">{{local.necessary}}</a-checkbox>
					<a-checkbox :checked="activeItem.isReadOnly">{{local.readOnly}}</a-checkbox>
					<a-checkbox :checked="activeItem.isReset">{{local.reset}}</a-checkbox>
				</a-form-model-item>
				<a-form-model-item :label="local.defaultValue" prop="defaultValue">
					<a-input v-model="activeItem.defaultValue" read-only/>
				</a-form-model-item>
				<a-form-model-item :label="local.initializedFrom" v-show="globalVariables">
					<a-select v-model="activeItem.initFormVarKey" :open="false">
						<a-select-option v-for="item in globalVariables" :key="item.name"> {{item.name}}</a-select-option>
					</a-select>
				</a-form-model-item>
			</a-form-model>
      <acl :variable = "activeItem"/>
    </a-modal>
		<a-modal v-model="showNameVisible" :title="local.defineDisplayName" width="300px" :centered="true"
						 :maskClosable="false">
			<template slot="footer">
				<a-button type="primary" @click="showNameClose"> {{local.ok}}</a-button>
			</template>
			<a-form-model :model="activeItem" :label-col="{span: 8}" :wrapper-col="{span: 14}">
				<a-form-model-item :label="local.defaultDisplay">
					<a-input v-model="activeItem.defaultDisplay" read-only/>
				</a-form-model-item>
				<a-form-model-item :label="local.zh_cn">
					<a-input v-model="activeItem.displayZhCn" read-only/>
				</a-form-model-item>
				<a-form-model-item :label="local.en_us">
					<a-input v-model="activeItem.displayEnUs" read-only/>
				</a-form-model-item>
			</a-form-model>
		</a-modal>

	</div>
</template>

<script>
  import Acl from "@/views/edit-modeler/components/bpmn-properties/tab/Acl.vue";

  const type = ['int', 'char', 'float', 'boolean', 'String', 'Date', 'URL', 'Other...',];

  export default {
    name: "Variable",
    components: {Acl},
    props: {
      variables: {
        type: Array,
        default: () => ([])
      },
      globalVariables: Array,
    },
    watch: {
      variables(val) {
        console.log(val);
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, activeId: '', activeItem: {}, variableVisible: false, showNameVisible: false, type: type,
      }
    },
    methods: {
      showData() {
        let variable = this.getVariable();
        this.activeItem = JSON.parse(JSON.stringify(variable));
        this.variableVisible = true;
      },
      variableSelect(itemId) {
        if (itemId === this.activeId) {
          this.activeId = '';
        } else {
          this.activeId = itemId;
        }
      },

      variableOk() {
        this.activeId = '';
        this.activeItem = {};
        this.variableVisible = false;
        return true;
      },
      showNameClose() {
        this.showNameVisible = false;
      },
      getVariable() {
        let that = this;
        return this.variables.filter(variable => variable.id === that.activeId)[0];
      },
    },
  }
</script>

<style scoped>
	.over-scroll {
		height: 64vh;
		width: 100%;
		overflow: auto;
	}

	.flex {
		display: flex;
		min-width: 850px;
		min-height: 100%;
		padding-right: 10px;
	}

	.flex-table {
		flex: 1;
		min-width: 750px;
		height: 100%;
		margin: 0 10px 0 0;
		background: #fff;
		border: 1px #ddd solid;
	}

	.flex-btn {
		width: 65px;
	}

	.flex-btn button {
		margin-bottom: 5px;
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
