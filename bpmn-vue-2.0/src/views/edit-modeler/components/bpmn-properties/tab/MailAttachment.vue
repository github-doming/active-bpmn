<template>
	<div class="general-context">
		<a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<div :style="{ borderBottom: '1px solid #E9E9E9' }">
				<a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
					{{local.wfProcessPbo}}
				</a-checkbox>
			</div>
			<br/>
			<a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange"/>
		</a-form-model>
		<p/>
		<h4>{{local.varSelect}}</h4>
		<a-table
						bordered
						:row-selection="rowSelection"
						:custom-row="handleClickRow"
						:columns="columns"
						:data-source="variableData"
						:pagination="false"
		/>
	</div>
</template>

<script>
    var columns = [];
    var selectedRowKeys = [];
    var variableData = [];
    var plainOptions = [];
    var defaultCheckedList = [];
    const pboItem = ['primaryContent', 'secondContent', 'attrInfo'];
    export default {
        name: "MailAttachment",
        props: {
            param: {
                type: Object,
                default: () => ({})
            },
            attachment: {
                type: Object,
                default: () => ({})
            },
            globalVariables: Array,
        },
        created() {
            let attachment = this.attachment;
            if (attachment['variables']) {
                attachment['variables'].forEach(item => {
                    item.hover = false
										this.selectedRowKeys.push(item.id);
								});
            } else {
                attachment['variables'] = [];
            }
        },
        watch: {
        },
        computed: {
            rowSelection() {
                const {selectedRowKeys} = this;
                return {
                    selectedRowKeys,
                    type: 'checkbox'
                }
            }
        },
        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            plainOptions = [{label: local.primaryContent, value: pboItem[0]}, {
                label: local.secondContent,
                value: pboItem[1]
            }, {label: local.attrInfo, value: pboItem[2]}];
            //plainOptions = [local.primaryContent,local.secondContent,local.attrInfo];
            columns = [{
                title: local.varName,
                dataIndex: 'varName'
            }];
            pboItem.forEach(item => {
                if (this.attachment[item] === true) {
                    defaultCheckedList.push(item);
                }
            });
            this.loadVariable();
            let form = {};
            return {
                local, form, checkedList: defaultCheckedList,
                indeterminate: false,
                checkAll: false,
                plainOptions,
                columns,
                variableData,
                selectedRowKeys: selectedRowKeys
            }
        },
        methods: {
            handleClickRow(record, index) {
                return {
                    on: {
                        click: () => {
                            const indexRow = this.selectedRowKeys.indexOf(record.key);
                            if (indexRow === -1) {
                                this.selectedRowKeys.push(record.key);
                                var selectData = [];
                                this.globalVariables.forEach(item => {
                                    if(this.selectedRowKeys.indexOf(item.id) !=-1){
                                        selectData.push(item);
                                    }
                                });
                                this.$emit('updateAttachmentVar', this.attachment, selectData);
                            } else {
                                this.selectedRowKeys.splice(indexRow, 1);
                                var existVar = this.attachment['variables'];
                                existVar.some((data, index) => {
                                    if (record.key === data.id) {
                                        existVar.splice(index, 1);
                                    }
                                });
                            }
                        }

                    }
                }
            },
            onChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
                //保存数据至bpmn
                this.updateAttachmentPBO(this.checkedList);
            },
            onCheckAllChange(e) {
                var checkArray = [];
                plainOptions.forEach(item => {
                    checkArray.push(item['value']);
                })
                Object.assign(this, {
                    checkedList: e.target.checked ? checkArray : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
                //保存数据至bpmn
                this.updateAttachmentPBO(this.checkedList);
            },
            loadVariable() {
                variableData=[];
                var existVar = this.attachment['variables'];
                this.globalVariables.forEach(item => {
                    var varName = item.name;
                    var varId = item.id;
                    var isAdd = true;
                    variableData.forEach(data => {
                        if (data['key'] === varId) {
                            isAdd = false;
                        }
                    });
                    if (isAdd) {
                        variableData.push({
                            key: item.id,
                            varName: item.name
                        });
                    }
                    if (existVar) {
                        for (var n = 0; n < existVar.length; n++) {
                            if (existVar[n]['id'] === varId) {
                                existVar[n]['name'] = varName;
                                selectedRowKeys.push(varName);
                            }
                        }
                    }
                });
            },
            updateAttachmentPBO(selectList){
                var checkObj = {};
                pboItem.forEach(item => {
                    if (selectList.indexOf(item) > -1) {
                        checkObj[item] = true;
                    } else {
                        checkObj[item] = false;
                    }
                });
                Object.assign(this.attachment, checkObj);
            }
        },
    }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}
</style>
