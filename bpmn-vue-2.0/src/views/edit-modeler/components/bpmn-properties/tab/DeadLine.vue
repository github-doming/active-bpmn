<template>
	<div class="general-context">
		<a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<div :style="{ borderBottom: '1px solid #E9E9E9' }">
				{{local.deadLineSet}}
			</div>
			<a-form-model-item :label="local.afterActivity" class="deadLine_one">
				<a-input-number :min="0" v-model="deadLineNode.deadlineDay"/>
				天
				<a-input-number :min="0" :max="59" v-model="deadLineNode.deadlineHour"/>
				小时
				<a-input-number :min="0" :max="59" v-model="deadLineNode.deadlineMinute"/>
				分钟
			</a-form-model-item>
			<div :style="{ borderBottom: '1px solid #E9E9E9' }">
				{{local.overdueResult}}
			</div>

			<div :style="{ display: 'flex',height:' 10px' }">
        <a-checkbox-group v-model="overdueResultList" class="overdueResult" @change="handleRadioChange">
          <a-checkbox :value="overdueResult[2]" >{{local.reassign}}</a-checkbox>
          <a-checkbox :value="overdueResult[1]" >{{local.markComplete}}</a-checkbox>
        </a-checkbox-group>
				<a-form-item :label="local.vote" class="overdueVote">
					<a-select class="markCompleteVote" mode="multiple" v-model="markCompleteVotes" @change="handleChange"
										:disabled="isMarkComplete">
						<a-select-option v-for="item in votes" :key="item.id"> {{item.name}}</a-select-option>
					</a-select>
				</a-form-item>
			</div>

			<br/>
			<div class="overdueNotice" :style="{ borderBottom: '1px solid #E9E9E9' }">
				<a-checkbox @change="onNoticeChange" ref="isSendOverdueNotice" v-model="deadLineNode.isNotice">
					{{local.overdueNotice}}
				</a-checkbox>
			</div>
			<a-form-model-item :label="local.overdueBefore" class="deadLine_one">
				<a-input-number :min="0" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeDay"/>
				天
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeHour"/>
				小时
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeMinute"/>
				分钟
			</a-form-model-item>
			<a-form-model-item :label="local.overdueAfter" class="deadLine_one">
				<a-input-number :min="0" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterDay"/>
				天
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterHour"/>
				小时
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterMinute"/>
				分钟
			</a-form-model-item>
			<h4 class="noticeRole">{{local.selectNoticeRole}}</h4>
			<a-table
							bordered
							:row-selection="rowSelection"
							:custom-row="handleClickRow"
							:data-source="roleData"
							:columns="columns"
							:pagination="false"
							class="noticeRole"
							:scroll="{y:300}"
			/>
		</a-form-model>
	</div>
</template>

<script>
    import {Http} from "../../js/BpmnHelper"

    var plainOptions = [];
    var selectedRowKeys = [];
    var markCompleteVotes = [];
    var roleData = [];
    var columns = [];
    var isOverdueNotice = true;
    var isMarkComplete = true;
    const overdueResult = ['skip', 'markComplete', 'reassign'];

    export default {
        name: "DeadLine",
        props: {
            deadLineNode: {
                type: Object,
                default: () => ({})
            },
            voteSelect: {
                type: Object,
                required: true,
            }
        },
        created() {
            this.votes = this.voteSelect.votes;
            let isNotice = this.deadLineNode.isNotice;
            if (isNotice) {
                this.isOverdueNotice = false;
            } else {
                this.isOverdueNotice = true;
                this.selectedRowKeys = [];
            }

            let deadLineNode = this.deadLineNode;
            if (deadLineNode['noticeRoles']) {
                deadLineNode['noticeRoles'].forEach(item => {
                    this.selectedRowKeys.push(item.id);
                });
            } else {
                deadLineNode['noticeRoles'] = [];
            }

            this.markCompleteVotes = [];
            if (deadLineNode['markCompleteVotes']) {
                deadLineNode['markCompleteVotes'].forEach(item => {
                    this.markCompleteVotes.push(item.id);
                });
            } else {
                deadLineNode['markCompleteVotes'] = [];
            }

            if (this.deadLineNode.overdueResult == 'markComplete') {
                this.isMarkComplete = false;
            } else {
                this.isMarkComplete = true;
            }

        },
        watch: {
            voteSelect(newValue) {
                this.votes = newValue.votes;
            }
        },
        computed: {
            rowSelection() {
                const {selectedRowKeys} = this;
                return {
                    selectedRowKeys,
                    type: 'checkbox',
                    getCheckboxProps: (record) => ({
                        props: {
                            disabled: !this.deadLineNode.isNotice,
                        },
                    }),
                }
            }
        },
        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            columns = [{
                title: local.roleName,
                dataIndex: 'roleName'
            }, {
                title: local.roleCode,
                dataIndex: 'roleCode'
            }];
            this.loadRoles();
            return {
                local: local,
                roleData,
                columns,
                selectedRowKeys: selectedRowKeys,
                isOverdueNotice: isOverdueNotice,
                isMarkComplete: isMarkComplete,
                overdueResult: overdueResult,
                overdueResultList:[this.deadLineNode.overdueResult],
                votes: [],
                markCompleteVotes: markCompleteVotes
            }
        },
        methods: {
            handleClickRow(record, index) {
                return {
                    on: {
                        click: () => {
                            const indexRow = this.selectedRowKeys.indexOf(record.key);
                            if (!this.isOverdueNotice) {
                                if (indexRow === -1) {
                                    this.selectedRowKeys.push(record.key);
                                    var selectData = [];
                                    this.roleData.forEach(item => {
                                        if (this.selectedRowKeys.indexOf(item.key) != -1) {
                                            selectData.push(item);
                                        }
                                    });
                                    this.$emit('updateDeadLine', this.deadLineNode, selectData);
                                } else {
                                    this.selectedRowKeys.splice(indexRow, 1);
                                    var existVar = this.deadLineNode['noticeRoles'];
                                    existVar.some((data, index) => {
                                        if (record.key === data.id) {
                                            existVar.splice(index, 1);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            },
            loadRoles() {
                roleData = [];
                let requestData = {roleName: '', properties: "roleName", beanName: "piRole"};
                Http.getParticipant('roles', requestData).then(result => {
                    result.forEach(item => {
                        var role = {key: item.id, roleCode: item.roleCode, roleName: item.name};
                        roleData.push(role)
                    });
                });
            },
            onNoticeChange(e) {
                var isChecked = e.target.checked;
                if (isChecked) {
                    this.isOverdueNotice = false;
                    this.changeRoleData(false);
                } else {
                    this.isOverdueNotice = true;
                    this.deadLineNode.overdueBeforeDay = '';
                    this.deadLineNode.overdueBeforeHour = '';
                    this.deadLineNode.overdueBeforeMinute = '';
                    this.deadLineNode.overdueAfterDay = '';
                    this.deadLineNode.overdueAfterHour = '';
                    this.deadLineNode.overdueAfterMinute = '';
                    this.changeRoleData(true);
                    this.selectedRowKeys = [];
                }
            },
            changeRoleData(disabled) {
                var filterData = [];
                this.roleData.forEach(item => {
                    item.disabled = disabled;
                    filterData.push(item);
                });
                this.roleData = filterData;
            },
            handleChange(value, option) {
                this.$emit('updateMarkCompleteVote', this.deadLineNode, value);
            },
            handleRadioChange(e) {
              if(e.length > 0){
                //选取了一个值
                if(e.length < 2){
                  var value = e[0];
                  this.isMCVDisplay(value);
                  this.overdueResultList = [value];
                  this.deadLineNode.overdueResult = value;
                }
                //选取的两个值
                else{
                  var oldValue = this.deadLineNode.overdueResult;
                  let index = e.indexOf(oldValue); // 找到要删除元素的索引
                  if (index !== -1) {
                    e.splice(index, 1); // 从索引处删除一个元素
                  }
                  this.isMCVDisplay(e[0]);
                  this.overdueResultList = e;
                  this.deadLineNode.overdueResult = e[0];
                }

              }else{
                this.markCompleteVotes = [];
                this.isMarkComplete = true;
                this.overdueResultList = [];
                this.deadLineNode.overdueResult = '';
              }
            },
            isMCVDisplay(value){
              if ('markComplete' == value) {
                this.isMarkComplete = false;
              } else {
                this.markCompleteVotes = [];
                this.isMarkComplete = true;
              }
            }
        }
    }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}

	.overdueNotice {
		padding-top: 14px;
	}

	.overdueResult {
		padding-left: 32px;
		padding-top: 9px;
	}

	.noticeRole {
		padding-left: 32px;
	}

	.deadLine_one {
		margin-bottom: auto;
		padding-top: 4px;
	}

	.noticeRole >>> .ant-table-tbody > tr > td {
		padding: 5px 10px !important;
	}

	.noticeRole >>> .ant-table-thead > tr > th {
		padding: 5px 10px !important;
	}

	.markCompleteVote {
		width: 200px;
	}

	.overdueVote >>> .ant-form-item-label > label {
		color: rgba(0, 0, 0, 0.65) !important;
	}

</style>
