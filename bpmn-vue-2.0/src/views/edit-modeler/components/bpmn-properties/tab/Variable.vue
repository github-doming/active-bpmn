<template>
	<div class="over-scroll">
		<div class="flex">
      <div >
        <a-button type="primary" @click='addData'>{{local.create}}</a-button>
        <a-button :disabled="activeId === ''" @click="updateData" class="flex-btn">{{local.updated}}</a-button>
        <a-button type="danger" :disabled="activeId === ''" @click="deleteData" class="flex-btn">{{local.delete}}</a-button>
      </div>
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
		</div>
		<a-modal v-model="variableVisible" :title="local.create" width="600px" :ok-text="local.ok"
						 :cancel-text="local.cancel"
						 :centered="true" :maskClosable="false" @ok="variableOk" @cancel="variableClose">
			<a-form-model ref="variableForm" :model="activeItem" :rules="variableRules" :label-col="{span: 4}"
										:wrapper-col="{span: 14}">
				<a-form-model-item :label="local.name" ref="name" prop="name">
					<a-col :span="11">
						<a-input v-model="activeItem.name" :placeholder="local.enterVariable"
										 @blur="() => {$refs.name.onFieldBlur();}"/>
					</a-col>
					<a-col :span="11" :offset="2">
						<a-button type="primary" @click="showNameVisible = true">
							{{local.defineDisplayName}}
						</a-button>
					</a-col>
				</a-form-model-item>
				<a-form-model-item :label="local.variableType" prop="type">
					<a-select v-model="activeItem.type" :placeholder="local.selectVariableName"
										:getPopupContainer="triggerNode => triggerNode.parentNode || document.body">
						<a-select-option v-for='item in type' :key='item'>{{item}}</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item :label="local.otherClassName" v-show="activeItem.type === 'Other...'">
					<a-input v-model="activeItem.otherName" @blur="validateClass"/>
				</a-form-model-item>
				<a-form-model-item :label="local.authority">
					<a-checkbox v-model="activeItem.isVisible">{{local.visible}}</a-checkbox>
					<a-checkbox v-model="activeItem.isNecessary" @change="isNecessaryChange">{{local.necessary}}</a-checkbox>
					<a-checkbox v-model="activeItem.isReadOnly">{{local.readOnly}}</a-checkbox>
					<a-checkbox v-model="activeItem.isReset">{{local.reset}}</a-checkbox>
				</a-form-model-item>
				<a-form-model-item :label="local.defaultValue" prop="defaultValue">
					<a-input v-model="activeItem.defaultValue"/>
				</a-form-model-item>
				<a-form-model-item :label="local.initializedFrom" v-show="globalVariables">
					<a-select :placeholder="local.initializedFromGlobalVariable" v-model="activeItem.initFormVarKey"
										@change="globChange"
										:getPopupContainer="triggerNode => triggerNode.parentNode || document.body">
						<a-select-option v-for="item in globalVariables" :key="item.name"> {{item.name}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
			</a-form-model>


		</a-modal>
		<a-modal v-model="showNameVisible" :title="local.defineDisplayName" width="300px" :ok-text="local.ok"
						 :cancel-text="local.cancel" :centered="true" :maskClosable="false" @ok="showNameClose"
						 @cancel="showNameClose">
			<a-form-model :model="activeItem" :label-col="{span: 8}" :wrapper-col="{span: 14}">
				<a-form-model-item :label="local.defaultDisplay">
					<a-input v-model="activeItem.defaultDisplay"/>
				</a-form-model-item>
				<a-form-model-item :label="local.zh_cn">
					<a-input v-model="activeItem.displayZhCn"/>
				</a-form-model-item>
				<a-form-model-item :label="local.en_us">
					<a-input v-model="activeItem.displayEnUs"/>
				</a-form-model-item>
			</a-form-model>
		</a-modal>

	</div>
</template>

<script>
  import {BpmnFunction} from "../../js/BpmnHelper";

  const type = ['int', 'char', 'float', 'boolean', 'String', 'Date', 'URL', 'Other...',];
  const ignoreAttr = ['$type', 'id'];

  export default {
    name: "Variable",
    props: {
      variables: {
        type: Array,
        default: () => ([])
      },
      globalVariables: Array,
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, activeId: '',
        activeItem: {
          isVisible: false,
          isNecessary: false,
          isReadOnly: false,
          isReset: false,
          defaultValue:''
        },
        variableVisible: false, showNameVisible: false, type: type,
        variableRules: {
          name: [{required: true, message: local.enterName, trigger: 'blur'}],
          type: [{required: true, message: local.enterVariable, trigger: 'change'}],
        },
      }
    },
    methods: {
      addData() {
        this.activeId = '';
        this.variableVisible = true;
      },
      updateData() {
        let variable = this.getVariable();
        this.activeItem = JSON.parse(JSON.stringify(variable));
        this.variableVisible = true;
      },
      deleteData() {
        this.$emit('updateVariable', 'remove', this.activeId);
        this.activeId = '';
      },
      variableSelect(itemId) {
        if (itemId === this.activeId) {
          this.activeId = '';
        } else {
          this.activeId = itemId;
        }
      },
      variableClose() {
        this.clearData();
      },
      variableOk() {
        this.$refs.variableForm.validate(valid => {
          if (valid && this.validateForm()) {
            if (this.activeId) {
              let variable = this.getVariable();
              Object.keys(this.activeItem).forEach(key => {
                if (this.activeItem[key] !== variable[key]) {
                  variable[key] = this.activeItem[key]
                }
              });
            } else {
              //新增
              let newVariable = Object.assign({id: 'BOM' + this.variables.length + 1,}, this.activeItem);
              this.$emit('updateVariable', 'add', newVariable);
            }
            this.clearData();
            return true;
          }
          return false
        });

      },
      showNameClose() {
        this.showNameVisible = false;
      },

      globChange(value) {
        let globalVariable = this.globalVariables.filter(item => item.name === value)[0];
        Object.keys(globalVariable).forEach(key => {
          if (!ignoreAttr.includes(key)) {
            this.activeItem[key] = globalVariable[key];
          }
        });
      },
      isNecessaryChange() {
        if (this.activeItem.isNecessary) {
          this.activeItem.isVisible = true;
        }
      },
      clearData() {
        this.activeId = '';
        this.activeItem = {};
        this.variableVisible = false
      },

      getVariable() {
        let that = this;
        return this.variables.filter(variable => variable.id === that.activeId)[0];
      },
      validateClass() {
        if (this.activeItem.type === 'Other...' && !this.activeItem.otherName) {
          BpmnFunction.errorMessage(this, this.local.enterClass);
          return false;
        }
        //TODO 添加远程校验

      },
      validateForm() {
        if (!this.validateVariableName()) {
          BpmnFunction.errorMessage(this, this.local.singleVariableName);
          return false;
        } else if (!this.validateTypeValue()) {
          BpmnFunction.errorMessage(this, this.local.mismatchType);
          return false;
        } else if (this.activeItem.type === 'Other...' && !this.activeItem.otherName) {
          BpmnFunction.errorMessage(this, this.local.enterClass);
          return false;
        }
        return true;
      },
      validateVariableName() {
        for (let variable of this.variables) {
          if (variable.id === this.activeId) {
            continue;
          }
          if (this.activeItem.name === variable.name) {
            return false;
          }
        }
        return true;
      },

      // const type = ['int', 'char', 'float', 'boolean', 'String', 'Date', 'URL', 'Other...',];
      validateTypeValue() {
        let value = this.activeItem.defaultValue;
        if (!value) {
          return true;
        }
        let type = this.activeItem.type;
        if ('int' === type) {
          return /^[0-9]*$/.test(value);
        } else if ('char' === type) {
          return value.length === 1;
        } else if ('float' === type) {
          return /^(-?\d+)(\.\d+)?$/.test(value);
        } else if ('boolean' === type) {
          value = value.toLowerCase();
          return value === 'true' || value === 'false';
        } else if ('Date' === type) {
          return isNaN(value) && !isNaN(Date.parse(value));
        } else if ('URL' === type) {
          return /[a-zA-z]+:\/\/[^\s]*/.test(value);
        }
        return true;
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
		//display: flex;
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
		//width: 65px;
    margin-left: 5px;
    margin-bottom: 5px;
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
