<template>
	<div class="general-context">
		<a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<div :style="{ borderBottom: '1px solid #E9E9E9' }">
				{{local.deadLineSet}}
			</div>
			<a-form-model-item :label="local.afterActivity" class="deadLine_one" >
				<a-input-number :min="0" v-model="deadLineNode.deadlineDay" :disabled="true"/>
				天
				<a-input-number :min="0" :max="59" v-model="deadLineNode.deadlineHour" :disabled="true"/>
				小时
				<a-input-number :min="0" :max="59" v-model="deadLineNode.deadlineMinute" :disabled="true"/>
				分钟
			</a-form-model-item>
			<div :style="{ borderBottom: '1px solid #E9E9E9' }">
				{{local.overdueResult}}
			</div>

			<div :style="{ display: 'flex',height:' 10px' }">
        <a-checkbox-group v-model="overdueResultList" class="overdueResult" >
          <a-checkbox :value="overdueResult[2]" >{{local.reassign}}</a-checkbox>
          <a-checkbox :value="overdueResult[1]" >{{local.markComplete}}</a-checkbox>
        </a-checkbox-group>

				<a-form-item :label="local.vote" class="overdueVote" >
					<a-select class="markCompleteVote" mode="multiple" v-model="markCompleteVotes"
										:disabled="isMarkComplete">
						<a-select-option v-for="item in votes" :key="item.id"> {{item.name}}</a-select-option>
					</a-select>
				</a-form-item>
			</div>

			<br/>
			<div class="overdueNotice" :style="{ borderBottom: '1px solid #E9E9E9' }">
				<a-checkbox ref="isSendOverdueNotice" v-model="deadLineNode.isNotice" :disabled="true">
					{{local.overdueNotice}}
				</a-checkbox>
			</div>
			<a-form-model-item :label="local.overdueBefore" class="deadLine_one">
				<a-input-number :min="0" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeDay" />
				天
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeHour" />
				小时
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueBeforeMinute" />
				分钟
			</a-form-model-item>
			<a-form-model-item :label="local.overdueAfter" class="deadLine_one">
				<a-input-number :min="0" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterDay" />
				天
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterHour" />
				小时
				<a-input-number :min="0" :max="59" :disabled="isOverdueNotice" v-model="deadLineNode.overdueAfterMinute" />
				分钟
			</a-form-model-item>
			<h4 class="noticeRole">{{local.selectNoticeRole}}</h4>
			<a-table
							bordered
							:row-selection="rowSelection"
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

            } else {
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
                            disabled: true,
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
            changeRoleData(disabled) {
                var filterData = [];
                this.roleData.forEach(item => {
                    item.disabled = disabled;
                    filterData.push(item);
                });
                this.roleData = filterData;
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
